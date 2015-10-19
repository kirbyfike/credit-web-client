angular.module( 'credit.admin.questionnaire.categories', [
  'ui.router.state',
  'ngResource', 'xeditable'
])

.config(function config( $stateProvider ) {
  $stateProvider
  .state( 'adminQuestionnaire.categories', {
    url: '/categories',
    controller: 'AdminQuestionnaireCategoriesCtrl',
    templateUrl: 'app/admin/questionnaire/categories/categories.tpl.html',
    data:{ pageTitle: 'Model' }
  });
})

.factory('Category', function ($resource, URLHOST)  {
  var resourceURL = (URLHOST == "localhost:8888") ? "./app/admin/questionnaire/data/category.json" : "/category.json";
  STORAGE_ID = 'categories';
  DEMO_CATEGORIES = require('./category.json');


  var LocalCategory = {
    get: function(category) {
      var return_array = JSON.parse(localStorage.getItem(STORAGE_ID)) || DEMO_CATEGORIES;

      if ((typeof return_array != 'undefined') && category) {
        var id = category.category_id;


        for (var i = 0; i < return_array.length; i++) {
          if (return_array[i].category_id == id) return return_array[i];
        }
      }

      return return_array;
    },
    put: function(categories) {
      return localStorage.setItem(STORAGE_ID, JSON.stringify(categories));
    },
    update: function(categories) {
      // return localStorage.setItem(STORAGE_ID, JSON.stringify(categories));
    
        var category_id = category.category_id;
        
        var return_array = JSON.parse(localStorage.getItem(STORAGE_ID)) || DEMO_CATEGORIES;

        if ((typeof return_array != 'undefined') && category) {
          var id = category.category_id;

          for (var i = 0; i < return_array.length; i++) {
            if (return_array[i].category_id == id) {
              return_array[i] = category;

              localStorage.setItem(STORAGE_ID, JSON.stringify(return_array));

              return return_array[i];
            }
          }
        }
      },
      save: function(category) {

        var return_array = JSON.parse(localStorage.getItem(STORAGE_ID)) || DEMO_CATEGORIES;
        var ids = [];

        for (var i = 0; i < return_array.length; i++) {
          ids.push(return_array[i].category_id);
        }

        var largest = Math.max.apply(Math, ids);
        category.category_id = largest + 1;
        return_array.push(category);

        return localStorage.setItem(STORAGE_ID, JSON.stringify(return_array));
      }
  };

  var Category = $resource(URLHOST + "/category/:id.json", {id:'@id'}, {
    update: { 
        method: 'PUT', 
        params: { id: '@id' }
    },
    remove: {method:'DELETE'}
  });

  return (URLHOST == "localhost:8888") ? LocalCategory : Category;
})

.controller( 'AdminQuestionnaireCategoriesCtrl', function AdminQuestionnaireCategoriesCtrl($scope, $state, Category) {
  $scope.categories = Category.get();

  console.log($scope.categories);

  // remove category
  $scope.removeCategory = function(index) {
   $scope.categories.splice(index, 1);
  };

  // add category
  $scope.addCategory = function() {

    $scope.inserted = {
     category_id: $scope.categories.length+1,
     worksheet_name: '',
     category_name: null,
    };

    $scope.categories.push($scope.inserted);
  };

  $scope.saveChanges = function(data, id){
    for (var i = 0; i < $scope.categories.length; i++) {
      if ($scope.categories[i].category_id == id){
        
        updateCategory(data)

      } else { 
        // block of code to be executed if the condition is false
        saveCategory(data)};
    };
  };

  $scope.updateCategory = function(category){
    Category.update(category, function(response) {

    }, function(error) {
      $scope.error = error.data;
    });

    $state.go("adminQuestionnaire.categories", {}, {reload: true});
  };

  $scope.saveCategory = function(category){
    Category.save(category, function(response) {

    }, function(error) {
      $scope.error = error.data;
    });

    $state.go("adminQuestionnaire.categories", {}, {reload: true});
  };
})
;
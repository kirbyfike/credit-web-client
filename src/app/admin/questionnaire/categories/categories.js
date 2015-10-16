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
      return localStorage.setItem(STORAGE_ID, JSON.stringify(categories));
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
})
;
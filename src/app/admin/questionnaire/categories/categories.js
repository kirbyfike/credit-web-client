angular.module( 'credit.admin.questionnaire.categories', [
  'ui.router.state',
  'ngResource', 'xeditable'
])
.config(function config( $stateProvider ) {
  $stateProvider
  .state( 'adminQuestionnaire.categories', {
    url: '/categories',
    controller: 'AdminQuestionnaireCategoriesCtrl',
    templateUrl: 'app/admin/questionnaire/categories/questionnaire.categories.tpl.html',
    data:{ pageTitle: 'Model' }
  })
  .state( 'adminQuestionnaire.categoryEdit',{
    url: 'category/:id/edit',
    controller: 'AdminQuestionnaireCategoryEditCtrl',
    templateUrl:'app/admin/questionnaire/categories/questionnaire.category.edit.tpl.html',
    data:{ pageTitle: 'Model'}
  })
  .state( 'adminQuestionnaire.categoryNew', {
    url: '/category/new',
    controller: 'AdminQuestionnaireCategoryNewCtrl',
    templateUrl: 'app/admin/questionnaire/categories/questionnaire.category.new.tpl.html',
    data:{ pageTitle: 'Model' }
  });
})


// FACTORY

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



/**
 * And of course we define a controller for our route.
 */

 .controller( 'AdminQuestionnaireCategoriesCtrl', function AdminQuestionnaireCategoriesCtrl($scope, $state, Category) {
   $scope.categories = Category.get();


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
 .controller( 'AdminQuestionnaireCategoryEditCtrl', function AdminQuestionnaireCategoryEditCtrl($scope, $state, Category) {
   $scope.category = Category.get({category_id:$state.params.id});
   console.log($scope.category);

   $scope.update = function(category){
     Category.update(category, function(response) {

     }, function(error) {
       $scope.error = error.data;
     });

     $state.go("adminQuestionnaire.categories", {}, {reload: true});
   };
 })
;
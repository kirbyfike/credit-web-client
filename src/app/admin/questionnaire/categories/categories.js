angular.module( 'credit.admin.questionnaire.categories', [
  'ui.router.state',
  'ngResource'
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

.factory('Category', function ($resource, URLHOST, DEMO_CATEGORIES)  {
  var resourceURL = (URLHOST == "localhost:8888") ? "./app/admin/questionnaire/data/category.json" : "/category.json";
  CATEGORY_STORAGE_ID = 'categories';


  var LocalCategory = {
    get: function(category) {
      var return_array = JSON.parse(localStorage.getItem(CATEGORY_STORAGE_ID)) || DEMO_CATEGORIES;

      if ((typeof return_array != 'undefined') && category) {
        var id = category.category_id;


        for (var i = 0; i < return_array.length; i++) {
          if (return_array[i].category_id == id) return return_array[i];
        }
      }

      return return_array;
    },
    put: function(categories) {
      return localStorage.setItem(CATEGORY_STORAGE_ID, JSON.stringify(categories));
    },
    update: function(category) {
      // return localStorage.setItem(STORAGE_ID, JSON.stringify(categories));
    
        var category_id = category.category_id;
        
        var return_array = JSON.parse(localStorage.getItem(CATEGORY_STORAGE_ID)) || DEMO_CATEGORIES;

        if ((typeof return_array != 'undefined') && category) {
          var id = category.category_id;

          for (var i = 0; i < return_array.length; i++) {
            if (return_array[i].category_id == id) {
              return_array[i] = category;

              localStorage.setItem(CATEGORY_STORAGE_ID, JSON.stringify(return_array));

              return return_array[i];
            }
          }
        }
    },
    save: function(category) {

      var return_array = JSON.parse(localStorage.getItem(CATEGORY_STORAGE_ID)) || DEMO_CATEGORIES;
      var ids = [];

      for (var i = 0; i < return_array.length; i++) {
        ids.push(return_array[i].category_id);
      }

      var largest = Math.max.apply(Math, ids);
      category.category_id = largest + 1;
      return_array.push(category);

      return localStorage.setItem(CATEGORY_STORAGE_ID, JSON.stringify(return_array));
    },

    delete: function(category){

      var return_array = JSON.parse(localStorage.getItem(CATEGORY_STORAGE_ID)) || DEMO_CATEGORIES;

      newArray = return_array.filter(function(cat){return cat.category_id !==category.category_id;});

      return localStorage.setItem(CATEGORY_STORAGE_ID, JSON.stringify(newArray));
    }
  };

  // var Category = $resource(URLHOST + "/category/:id.json", {id:'@id'}, {
  //   update: { 
  //       method: 'PUT', 
  //       params: { id: '@id' }
  //   },
  //   remove: {method:'DELETE'}
  // });

  return LocalCategory;
  //return ((URLHOST == "localhost:8888") || (URLHOST == "localhost:3000")) ? LocalCategory : Category;
})

.controller( 'AdminQuestionnaireCategoriesCtrl', function AdminQuestionnaireCategoriesCtrl($scope, $state, Category) {
  $scope.categories = Category.get();

  // remove category
  $scope.removeCategory = function(category) {
    Category.delete(category);
    $state.go('adminQuestionnaire.categories', {}, { reload: true });
  };

  // add category
  $scope.addCategory = function() {

    var inserted = {

     category_name: null,
    };

    Category.save(inserted);
    $scope.categories = Category.get();

  };

  $scope.saveChanges = function(category){
    for (var i = 0; i < $scope.categories.length; i++) {
      if ($scope.categories[i].category_id == category.category_id) {
        
        Category.update(category);
      
      } else { 

      }
    };
    $scope.categories = Category.get();
    
  };

  $scope.saveCategory = function(category) {
    Category.save(category);
    $scope.categories = Category.get();
    // $scope.categories.reverse();
  };

  // PAGINATION
  $scope.viewby = 10;
  $scope.totalItems = $scope.categories.length;
  $scope.currentPage = 1;
  $scope.itemsPerPage = $scope.viewby;
  $scope.maxSize = 10; //Number of pager buttons to show

  $scope.setPage = function (pageNo) {
    $scope.currentPage = pageNo;
  };

  $scope.pageChanged = function() {
    console.log('Page changed to: ' + $scope.currentPage);
  };

$scope.setItemsPerPage = function(num) {
  $scope.itemsPerPage = num;
  $scope.currentPage = 1; //reset to first paghe
}

})
;
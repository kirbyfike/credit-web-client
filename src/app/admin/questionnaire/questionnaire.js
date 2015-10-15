
.config(function config( $stateProvider ) {
  $stateProvider
    .state( 'adminQuestionnaire', {
      url: '/admin/questionnaire',
      abstract: true,
      views: {
      	"header": {
          controller: 'HeaderCtrl',
          templateUrl: 'app/shared/header/header.tpl.html'
        },
      	"nav": {
          controller: 'AdminQuestionnaireNavCtrl',
          templateUrl: 'app/admin/questionnaire/questionnaire.nav.tpl.html'
        },
        "main": {
          controller: 'AdminQuestionnaireCtrl',
          templateUrl: 'app/admin/questionnaire/questionnaire.tpl.html'
        }
      },
      data:{ pageTitle: 'Login' }
    })
    .state( 'adminQuestionnaire.index', {
      url: '',
      controller: 'AdminQuestionnaireIndexCtrl',
      templateUrl: 'app/admin/questionnaire/questionnaire.index.tpl.html',
      data:{ pageTitle: 'Model' }
    })
    .state( 'adminQuestionnaire.edit', {
      url: '/:id/edit',
      controller: 'AdminQuestionnaireEditCtrl',
      templateUrl: 'app/admin/questionnaire/questionnaire.edit.tpl.html',
      data:{ pageTitle: 'Model' }
    })
    
    .state( 'adminQuestionnaire.categories', {
      url: '/categories',
      controller: 'AdminQuestionnaireCategoriesCtrl',
      templateUrl: 'app/admin/questionnaire/questionnaire.categories.tpl.html',
      data:{ pageTitle: 'Model' }
    })
    .state( 'adminQuestionnaire.categoryEdit',{
      url: 'category/:id/edit',
      controller: 'AdminQuestionnaireCategoryEditCtrl',
      templateUrl:'app/admin/questionnaire/questionnaire.category.edit.tpl.html',
      data:{ pageTitle: 'Model'}
    })
    .state( 'adminQuestionnaire.categoryNew', {
      url: '/category/new',
      controller: 'AdminQuestionnaireCategoryNewCtrl',
      templateUrl: 'app/admin/questionnaire/questionnaire.category.new.tpl.html',
      data:{ pageTitle: 'Model' }
    })
    .state( 'adminQuestionnaire.questions', {
      url: '/questions',
      controller: 'AdminQuestionnaireQuestionsCtrl',
      templateUrl: 'app/admin/questionnaire/questionnaire.questions.tpl.html',
      data:{ pageTitle: 'Model' }
    })
    ;
})

.factory('Question', function ($resource, URLHOST)  {
  var resourceURL = (URLHOST == "localhost:8888") ? "./app/admin/questionnaire/question.json" : "/question.json";
  STORAGE_ID = 'questions';
  DEMO_QUESTIONS = require('./question.json');


  var LocalQuestion = {
    get: function(question) {
      var return_array = JSON.parse(localStorage.getItem(STORAGE_ID)) || DEMO_QUESTIONS;

      if ((typeof return_array != 'undefined') && question) {
        var id = question.question_id;

        for (var i = 0; i < return_array.length; i++) {
          if (return_array[i].question_id == id) return return_array[i];
        }
      }

      return return_array;
    },
    put: function(questions) {
      return localStorage.setItem(STORAGE_ID, JSON.stringify(questions));
    },
    update: function(question) {

      var question_id = question.question_id;
      
      var return_array = JSON.parse(localStorage.getItem(STORAGE_ID)) || DEMO_QUESTIONS;

      if ((typeof return_array != 'undefined') && question) {
        var id = question.question_id;

        for (var i = 0; i < return_array.length; i++) {
          if (return_array[i].question_id == id) {
            return_array[i] = question;

            localStorage.setItem(STORAGE_ID, JSON.stringify(return_array));

            return return_array[i];
          }
        }
      }
    },
    save: function(question) {

      var return_array = JSON.parse(localStorage.getItem(STORAGE_ID)) || DEMO_QUESTIONS;
      var ids = [];

      for (var i = 0; i < return_array.length; i++) {
        ids.push(return_array[i].question_id);
      }

      var largest = Math.max.apply(Math, ids);
      question.question_id = largest + 1;
      return_array.push(question);

      return localStorage.setItem(STORAGE_ID, JSON.stringify(return_array));
    }
  };

  var Question = $resource(URLHOST + "/Question/:id.json", {id:'@id'}, {
    update: { 
        method: 'PUT', 
        params: { id: '@id' }
    },
    remove: {method:'DELETE'}
  });

  return (URLHOST == "localhost:8888") ? LocalQuestion : Question;
})

.factory('Category', function ($resource, URLHOST)  {
  var resourceURL = (URLHOST == "localhost:8888") ? "./app/admin/questionnaire/category.json" : "/category.json";
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

.factory('Questionnaire', function ($resource, URLHOST)  {
  var resourceURL = (URLHOST == "localhost:8888") ? "./app/admin/questionnaire/questionnaire.json" : "/questionnaire.json";
  STORAGE_ID = 'questionnaires';
  DEMO_QUESTIONNAIRES = require('./questionnaire.json');


  var LocalQuestionnaire = {
    get: function(questionnaire) {
      var return_array = JSON.parse(localStorage.getItem(STORAGE_ID)) || DEMO_QUESTIONNAIRES;

      if ((typeof return_array != 'undefined') && questionnaire) {
        var id = questionnaire.questionnaire_id;

        for (var i = 0; i < return_array.length; i++) {
          if (return_array[i].questionnaire_id == id) return return_array[i];
        }
      }

      return return_array;
    },
    put: function(questionnaires) {
      return localStorage.setItem(STORAGE_ID, JSON.stringify(questions));
    },
    update: function(questionnaire) {

      var questionnaire_id = questionnaire.questionnaire_id;
      
      var return_array = JSON.parse(localStorage.getItem(STORAGE_ID)) || DEMO_QUESTIONNAIRES;

      if ((typeof return_array != 'undefined') && questionnaire) {
        var id = questionnaire.questionnaire_id;

        for (var i = 0; i < return_array.length; i++) {
          if (return_array[i].questionnaire_id == id) {
            return_array[i] = questionnaire;

            localStorage.setItem(STORAGE_ID, JSON.stringify(return_array));

            return return_array[i];
          }
        }
      }
    },
    save: function(questionnaire) {

      var return_array = JSON.parse(localStorage.getItem(STORAGE_ID)) || DEMO_QUESTIONNAIRES;
      var ids = [];

      for (var i = 0; i < return_array.length; i++) {
        ids.push(return_array[i].questionnaire_id);
      }

      var largest = Math.max.apply(Math, ids);
      questionnaire.questionnaire_id = largest + 1;
      return_array.push(questionnaire);

      return localStorage.setItem(STORAGE_ID, JSON.stringify(return_array));
    }
  };

  var Questionnaire = $resource(URLHOST + "/Question/:id.json", {id:'@id'}, {
    update: { 
        method: 'PUT', 
        params: { id: '@id' }
    },
    remove: {method:'DELETE'}
  });

  return (URLHOST == "localhost:8888") ? LocalQuestionnaire : Questionnaire;
})

.controller( 'AdminQuestionnaireCtrl', function AdminQuestionnaireCtrl($scope, $state) {
})

.controller( 'AdminQuestionnaireIndexCtrl', function AdminQuestionnaireIndexCtrl($scope, $state, Questionnaire) {
  $scope.questionnaires = Questionnaire.get();
})

.controller( 'AdminQuestionnaireQuestionsNewCtrl', function AdminQuestionnaireQuestionsEditCtrl($scope, $state, Question) {
  $scope.question = {};

  $scope.create = function(question) {
    Question.save(question, function() {

    });

    $state.go("adminQuestionnaire.questions", {}, {reload: true});
  };
})

.controller( 'AdminQuestionnaireEditCtrl', function AdminQuestionnaireEditCtrl($scope, $state, Questionnaire) {
  // $scope.question = Question.get({question_id:$state.params.id});

  // $scope.update = function(question) {
  //   Question.update(question, function(response) {

  //   }, function(error) {
  //     $scope.error = error.data;
  //   });

  //   $state.go("adminQuestionnaire.questions", {}, {reload: true});
  // };
})

.controller( 'AdminQuestionnaireQuestionsEditCtrl', function AdminQuestionnaireQuestionsEditCtrl($scope, $state, Question) {
  $scope.question = Question.get({question_id:$state.params.id});

  $scope.update = function(question) {
    Question.update(question, function(response) {

    }, function(error) {
      $scope.error = error.data;
    });

    $state.go("adminQuestionnaire.questions", {}, {reload: true});
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


.controller( 'AdminQuestionnaireNavCtrl', function AdminQuestionnaireNavCtrl($scope, $state) {
})

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



.controller( 'AdminQuestionnaireQuestionsCtrl', function AdminQuestionnaireQuestionsCtrl($scope, $state, Question) {
  $scope.questions = Question.get();

  // remove question
  $scope.removeQuestion = function(index) {
    $scope.questions.splice(index, 1);
  };
    // add question
  $scope.addQuestion = function() {
    $scope.inserted = {
      question_id: $scope.questions.length+1,
      question_text: '',
      trigger_finding_on: null,
      risk_category: null,
      finding_category: null,
      finding_sub_category: null,
      finding_statement: null,
      finding_comment_template: null,
      risk_rating: null,
    };
    $scope.questions.push($scope.inserted);
  };


})
;
angular.module( 'credit.admin.questionnaire', [
  'ui.router.state',
  'ngResource'
])

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
    update: function(questions) {
      return localStorage.setItem(STORAGE_ID, JSON.stringify(questions));
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
    get: function() {
      return JSON.parse(localStorage.getItem(STORAGE_ID)) || DEMO_CATEGORIES;
    },
    put: function(categories) {
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
    get: function() {
      return JSON.parse(localStorage.getItem(STORAGE_ID)) || DEMO_QUESTIONNAIRES;
    },
    put: function(questionnaires) {
      return localStorage.setItem(STORAGE_ID, JSON.stringify(tasks));
    }
  };

  var Questionnaire = $resource(URLHOST + "/questionnaires/:id.json", {id:'@id'}, {
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

.controller( 'AdminQuestionnaireEditCtrl', function AdminQuestionnaireIndexCtrl($scope, $state, Question, $state) {
  $scope.question = Question.get({question_id:$state.params.id});

  $scope.update = function(question) {
    Question.update(question, function(response) {
      $state.go("adminQuestionnaire.questions", {}, {reload: true});
    }, function(error) {
      $scope.error = error.data;
    });
  };
})

.controller( 'AdminQuestionnaireNavCtrl', function AdminQuestionnaireNavCtrl($scope, $state) {
})

.controller( 'AdminQuestionnaireCategoriesCtrl', function AdminQuestionnaireCategoriesCtrl($scope, $state, Category) {
  $scope.categories = Category.get();
})

.controller( 'AdminQuestionnaireQuestionsCtrl', function AdminQuestionnaireQuestionsCtrl($scope, $state, Question) {
  $scope.questions = Question.get();
})
;
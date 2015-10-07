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

.factory('taskStorage', function() {
  var DEMO_TASKS, STORAGE_ID;
  STORAGE_ID = 'tasks';
  DEMO_TASKS = '[ {"title": "Finish homework", "completed": true}, {"title": "Make a call", "completed": true}, {"title": "Play games with friends", "completed": false}, {"title": "Shopping", "completed": false} ]';
  return {
    get: function() {
      return JSON.parse(localStorage.getItem(STORAGE_ID) || DEMO_TASKS);
    },
    put: function(tasks) {
      return localStorage.setItem(STORAGE_ID, JSON.stringify(tasks));
    }
  };
})

.factory('Questionnaire', function ($resource, URLHOST)  {
  var resourceURL = (URLHOST == "localhost:8888") ? "./app/admin/questionnaire/questionnaire.json" : "/questionnaire.json";
  STORAGE_ID = 'questionnaires';
  DEMO_QUESTIONNAIRES = require('./questionnaire.json');
  DEMO_TASKS = '[ {"title": "Finish homework", "completed": true}, {"title": "Make a call", "completed": true}, {"title": "Play games with friends", "completed": false}, {"title": "Shopping", "completed": false} ]';


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

.controller( 'AdminQuestionnaireIndexCtrl', function AdminQuestionnaireIndexCtrl($scope, $state, Questionnaire, taskStorage) {
  $scope.questionnaires = Questionnaire.get();
})

.controller( 'AdminQuestionnaireNavCtrl', function AdminQuestionnaireNavCtrl($scope, $state) {
  console.log("index");
})

.controller( 'AdminQuestionnaireCategoriesCtrl', function AdminQuestionnaireCategoriesCtrl($scope, $state) {
  console.log("index");
})

.controller( 'AdminQuestionnaireQuestionsCtrl', function AdminQuestionnaireQuestionsCtrl($scope, $state) {
  console.log("index");
})
;
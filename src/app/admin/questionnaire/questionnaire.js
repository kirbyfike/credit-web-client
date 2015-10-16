require('./categories/categories.js');
require('./questions/questions.js');
require('./questionnaires/questionnaires.js');
require('./nav/nav.js');
	

angular.module( 'credit.admin.questionnaire', [
	'credit.admin.questionnaire.questions',
	'credit.admin.questionnaire.categories',
  'credit.admin.questionnaire.questionnaires',
	'credit.admin.questionnaire.nav',
  'ui.router.state',
  'ngResource', 
  'xeditable'
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
        templateUrl: 'app/admin/questionnaire/nav/questionnaire.nav.tpl.html'
      },
      "main": {
        controller: 'AdminQuestionnaireCtrl',
        templateUrl: 'app/admin/questionnaire/questionnaire.tpl.html'
      }
    },
    data:{ pageTitle: 'Login' }
  })
})

.factory('QuestionnaireQuestion', function ($resource, URLHOST)  {
  var resourceURL = (URLHOST == "localhost:8888") ? "./app/admin/questionnaire/questionnaire_question.json" : "/questionnaire_question.json";
  STORAGE_ID = 'questionnaire_questions';
  DEMO_QUESTIONNAIRE_QUESTIONS = require('./questionnaire_question.json');


  var LocalQuestionnaireQuestion = {
    get: function(requestObject) {
      
      var return_array = JSON.parse(localStorage.getItem(STORAGE_ID)) || DEMO_QUESTIONNAIRE_QUESTIONS;

      var new_array = [];

      if (requestObject.question_id) {
        var question_id = requestObject.question_id;

        var questionnaire_id = requestObject.questionnaire_id;

        for (var i = 0; i < return_array.length; i++) {
          if (return_array[i].id == question_id && return_array[i].questionnaire_id == questionnaire_id) {
            new_array = return_array[i];
          }
        }

      } else if ((typeof return_array != 'undefined')) {
        var parent_id = requestObject.parent_id;

        var questionnaire_id = requestObject.questionnaire_id;

        for (var i = 0; i < return_array.length; i++) {
          if (return_array[i].parent_id == parent_id && return_array[i].questionnaire_id == questionnaire_id) {
            new_array.push(return_array[i]);
          }
        }
      }

      return new_array;
    },
    update: function(questionnaire_question) {
    },
    save: function(questionnaire) {
    }
  };

  var QuestionnaireQuestion = $resource(URLHOST + "/Question/:id.json", {id:'@id'}, {
    update: { 
        method: 'PUT', 
        params: { id: '@id' }
    },
    remove: {method:'DELETE'}
  });

  return (URLHOST == "localhost:8888") ? LocalQuestionnaireQuestion : QuestionnaireQuestion;
})

.controller('AdminQuestionnaireCtrl', function AdminQuestionnaireCtrl($scope, $state) {
})
;
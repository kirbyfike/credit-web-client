angular.module( 'credit.admin.questionnaire.questionnaires', [
  'ui.router.state',
  'ngResource', 'xeditable'
])
.config(function config( $stateProvider ) {
  $stateProvider
    .state( 'adminQuestionnaire.index', {
      url: '',
      controller: 'AdminQuestionnaireIndexCtrl',
      templateUrl: 'app/admin/questionnaire/questionnaires/questionnaires.index.tpl.html',
      data:{ pageTitle: 'Model' }
    })
    .state( 'adminQuestionnaire.show', {
      url: '/:questionnaire_id',
      controller: 'AdminQuestionnaireShowCtrl',
      templateUrl: 'app/admin/questionnaire/questionnaires/questionnaires.show.tpl.html',
      data:{ pageTitle: 'Model' }
    })
    .state( 'adminQuestionnaire.questionnaireEditQuestion', {
      url: '/:questionnaire_id/question/:question_id/edit',
      controller: 'AdminQuestionnaireEditQuestionCtrl',
      templateUrl: 'app/admin/questionnaire/questionnaires/questionnaires.edit.tpl.html',
      data:{ pageTitle: 'Model' }
    })
})

// FACTORY
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
          if (return_array[i].id == id) return return_array[i];
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
    },
    get_breadcrumb: function(requestObject) {

      var history = [];
      var parent_id = requestObject.parent_id;

      while (parent_id > 0) {
        var currrent_question = this.get({question_id: parent_id, questionnaire_id: requestObject.questionnaire_id});

        history.push(currrent_question);

        parent_id = currrent_question.parent_id;
      }

      return history.reverse();
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

.controller('AdminQuestionnaireIndexCtrl', function AdminQuestionnaireIndexCtrl($scope, $state, Questionnaire) {
  $scope.questionnaires = Questionnaire.get();

  console.log($scope.questionnaires);
})

.controller('AdminQuestionnaireShowCtrl', function AdminQuestionnaireShowCtrl($scope, $state, Questionnaire, QuestionnaireQuestion) {
  $scope.questionnaire = Questionnaire.get({questionnaire_id:$state.params.questionnaire_id});
  $scope.questionnaire_questions = QuestionnaireQuestion.get({parent_id: 0, questionnaire_id: $state.params.questionnaire_id});

  $scope.showAddForm = false;
  $scope.questions = $scope.questionnaire.questions;


  $scope.showAddQuestionForm = function() {
    $scope.newQuestion = {question_text: ""};
    $scope.showAddForm = true;
  }

  $scope.createQuestion = function(newQuestion) {
    $scope.questions.push(newQuestion);
  }
})

.controller( 'AdminQuestionnaireEditQuestionCtrl', function AdminQuestionnaireEditQuestionCtrl($scope, $state, Questionnaire, QuestionnaireQuestion) {
  $scope.questionnaire = Questionnaire.get({questionnaire_id:$state.params.questionnaire_id});
  
  $scope.main_question = QuestionnaireQuestion.get({question_id: $state.params.question_id, questionnaire_id: $state.params.questionnaire_id});

  $scope.history = QuestionnaireQuestion.get_breadcrumb($scope.main_question);

  $scope.questionnaire_questions = QuestionnaireQuestion.get({parent_id: $state.params.question_id, questionnaire_id: $state.params.questionnaire_id});

  $scope.addOtherQuestions = function(answer) {
    $scope.main_question.trigger_on = answer;
  };

})



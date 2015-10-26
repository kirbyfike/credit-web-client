angular.module( 'credit.admin.questionnaire.questions', [
  'ui.router.state',
  'ngResource', 'xeditable'
])
.config(function config( $stateProvider ) {
  $stateProvider
  .state( 'adminQuestionnaire.questions', {
    url: '/questions',
    controller: 'AdminQuestionnaireQuestionsCtrl',
    templateUrl: 'app/admin/questionnaire/questions/questionnaire.questions.tpl.html',
    data:{ pageTitle: 'Model' }
  });
})

// FACTORY

.factory('Question', function ($resource, URLHOST)  {
  var resourceURL = (URLHOST == "localhost:8888") ? "./app/admin/questionnaire/data/question.json" : "/question.json";
  QUESTION_STORAGE_ID = 'questions';
  DEMO_QUESTIONS = require('./question.json');


  var LocalQuestion = {
    get: function(question) {
      var return_array = JSON.parse(localStorage.getItem(QUESTION_STORAGE_ID)) || DEMO_QUESTIONS;

      if ((typeof return_array != 'undefined') && question) {
        var id = question.question_id;

        for (var i = 0; i < return_array.length; i++) {
          if (return_array[i].question_id == id) return return_array[i];
        }
      }

      return return_array;
    },
    put: function(questions) {
      return localStorage.setItem(QUESTION_STORAGE_ID, JSON.stringify(questions));
    },
    update: function(question) {

      var question_id = question.question_id;
      
      var return_array = JSON.parse(localStorage.getItem(QUESTION_STORAGE_ID)) || DEMO_QUESTIONS;

      if ((typeof return_array != 'undefined') && question) {
        var id = question.question_id;

        for (var i = 0; i < return_array.length; i++) {
          if (return_array[i].question_id == id) {
            return_array[i] = question;

            localStorage.setItem(QUESTION_STORAGE_ID, JSON.stringify(return_array));

            return return_array[i];
          }
        }
      }
    },
    save: function(question) {

      var return_array = JSON.parse(localStorage.getItem(QUESTION_STORAGE_ID)) || DEMO_QUESTIONS;
      var ids = [];

      for (var i = 0; i < return_array.length; i++) {
        ids.push(return_array[i].question_id);
      }

      var largest = Math.max.apply(Math, ids);
      question.question_id = largest + 1;
      return_array.push(question);

      return localStorage.setItem(QUESTION_STORAGE_ID, JSON.stringify(return_array));
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



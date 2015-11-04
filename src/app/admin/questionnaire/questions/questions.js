angular.module( 'credit.admin.questionnaire.questions', [
  'ui.router.state',
  'ngResource',
  'mgcrea.ngStrap.typeahead'
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
    },

    delete: function(question){

      var return_array = JSON.parse(localStorage.getItem(QUESTION_STORAGE_ID)) || DEMO_CATEGORIES;

      newArray = return_array.filter(function(q){return q.question_id !==question.question_id;});

      return localStorage.setItem(QUESTION_STORAGE_ID, JSON.stringify(newArray));
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

  // $scope.showForm = true;
  // $scope.toggle = function() {
  //     $scope.showForm = !$scope.showForm;
  // };
  // remove question
  $scope.removeQuestion = function(question) {
   Question.delete(question);
   $state.go('adminQuestionnaire.questions', {}, { reload: true });
   // $scope.questions.splice(index, 1);
  };
  

  // add question
  $scope.addQuestion = function() {
   var inserted = {
     question_text: '',
     trigger_finding_on: null,
     risk_category: null,
     finding_category: null,
     finding_sub_category: null,
     finding_statement: null,
     finding_comment_template: null,
     risk_rating: null,
   };

   Question.save(inserted);

   $scope.questions = Question.get();
  };

  $scope.saveQuestion = function(question){
    Question.save(question);
    $scope.questions = Question.get();
    $scope.questions.reverse

  };



  // PAGINATION

    $scope.viewby = 10;
    $scope.totalItems = $scope.questions.length;
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


.directive('editQuestion', function(){
  return{
    restrict: 'EA',
    link: function($scope, element, attrs){
      var $editButton = $(".edit-question-button");
      var $editCancelButton = $(".edit-cancel-button");
      var $editQuestionForm = $(".edit-question-form");

      $editButton.click(function(){
        $(this).hide();
        $(this).parents("tr.question-row").find("span.question-text-display").hide();
        $(this).parents("tr.question-row").find("div.edit-question-form").slideDown();
      });

      $editCancelButton.click(function(){
        $(this).parents("div.edit-question-form").slideUp();
        $(this).parents("tr.question-row").find("div.edit-question-button").show();
        $(this).parents("tr.question-row").find("span.question-text-display").show();
      });

    }//link
  } //return
}) //directive


.directive('addQuestion', function() { 
  return { 
    restrict: 'EA',
    link: function ($scope, element, attrs) {
      var $addQuestionForm = $(".add-question-form");
      var $addQuestionCancelButton = $(".add-question-cancel-button");
      var $addQuestionButton = $(".add-question-button");

      $addQuestionButton .click(function(data){
        $(addQuestionButton).hide();
        $addQuestionForm.slideDown();
      });
      $addQuestionCancelButton.click(function(){
        $addQuestionForm.slideUp();
        $addQuestionButton.show();

      }); //link
    } //return
  } //directive


}); //angular module
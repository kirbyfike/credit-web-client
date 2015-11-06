angular.module( 'credit.admin.questionnaire.questionnaires', [
  'ui.router.state',
  'ngResource',
  'mgcrea.ngStrap.typeahead'
])
.config(function config( $stateProvider,$typeaheadProvider ) {
  angular.extend($typeaheadProvider.defaults, {
    templateUrl: 'app/admin/questionnaire/questionnaires/template.tpl.html',
    animation: 'am-flip-x',
    minLength: 1  
  });

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
  QUESTIONNAIRE_STORAGE_ID = 'questionnaires';
  DEMO_QUESTIONNAIRES = require('./questionnaire.json');


  var LocalQuestionnaire = {
    get: function(questionnaire) {
      var return_array = JSON.parse(localStorage.getItem(QUESTIONNAIRE_STORAGE_ID)) || DEMO_QUESTIONNAIRES;

      if ((typeof return_array != 'undefined') && questionnaire) {
        var id = questionnaire.questionnaire_id;

        for (var i = 0; i < return_array.length; i++) {
          if (return_array[i].id == id) return return_array[i];
        }
      }

      return return_array;
    },
    put: function(questionnaires) {
      return localStorage.setItem(QUESTIONNAIRE_STORAGE_ID, JSON.stringify(questions));
    },
    update: function(questionnaire) {

      var questionnaire_id = questionnaire.questionnaire_id;
      
      var return_array = JSON.parse(localStorage.getItem(QUESTIONNAIRE_STORAGE_ID)) || DEMO_QUESTIONNAIRES;

      if ((typeof return_array != 'undefined') && questionnaire) {
        var id = questionnaire.questionnaire_id;

        for (var i = 0; i < return_array.length; i++) {
          if (return_array[i].questionnaire_id == id) {
            return_array[i] = questionnaire;

            localStorage.setItem(QUESTIONNAIRE_STORAGE_ID, JSON.stringify(return_array));

            return return_array[i];
          }
        }
      }
    },
    save: function(questionnaire) {

      var return_array = JSON.parse(localStorage.getItem(QUESTIONNAIRE_STORAGE_ID)) || DEMO_QUESTIONNAIRES;
      var ids = [];

      for (var i = 0; i < return_array.length; i++) {
        ids.push(return_array[i].questionnaire_id);
      }

      var largest = Math.max.apply(Math, ids);
      questionnaire.questionnaire_id = largest + 1;
      return_array.push(questionnaire);

      return localStorage.setItem(QUESTIONNAIRE_STORAGE_ID, JSON.stringify(return_array));
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
  QUESTIONNAIRE_QUESTION_STORAGE_ID = 'questionnaireQuestions';
  DEMO_QUESTIONNAIRE_QUESTIONS = require('./questionnaire_question.json');


  var LocalQuestionnaireQuestion = {
    get: function(requestObject) {
      
      var return_array = JSON.parse(localStorage.getItem(QUESTIONNAIRE_QUESTION_STORAGE_ID)) || DEMO_QUESTIONNAIRE_QUESTIONS;

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

      if (requestObject.trigger_on) {
        var trigger_array = [];

        for (var i = 0; i < new_array.length; i++) {
          if (new_array[i].trigger_on == requestObject.trigger_on) {
            trigger_array.push(new_array[i]);
          }
        }

        new_array = trigger_array;
      }


      return new_array;
    },
    update: function(questionnaire_question) {
      var return_array = JSON.parse(localStorage.getItem(QUESTIONNAIRE_QUESTION_STORAGE_ID)) || DEMO_QUESTIONNAIRE_QUESTIONS;

      if ((typeof return_array != 'undefined') && questionnaire_question) {
        var id = questionnaire_question.id;

        for (var i = 0; i < return_array.length; i++) {

          if (return_array[i].id == id) {
            return_array[i] = questionnaire_question;

            localStorage.setItem(QUESTIONNAIRE_QUESTION_STORAGE_ID, JSON.stringify(return_array));

            return return_array[i];
          }
        }
      }

      return questionnaire_question;
    },
    save: function(questionnaire_question) {
      
      var return_array = JSON.parse(localStorage.getItem(QUESTIONNAIRE_QUESTION_STORAGE_ID)) || DEMO_QUESTIONNAIRE_QUESTIONS;
      var ids = [];

      for (var i = 0; i < return_array.length; i++) {
        ids.push(return_array[i].id);
      }

      var largest = Math.max.apply(Math, ids);
      questionnaire_question.id = largest + 1;
      return_array.push(questionnaire_question);

      localStorage.setItem(QUESTIONNAIRE_QUESTION_STORAGE_ID, JSON.stringify(return_array));

      return true;
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


  $scope.selectedIcon = "";

  $scope.selectedAddress = "";

  // add questionnaire
  $scope.addQuestionnaire = function() {

    var inserted = {

     title: null,
     category_id: null,
    };

    Questionnaire.save(inserted);
    $scope.questionnaires = Questionnaire.get();

  };

  $scope.saveQuestionnaire = function(questionnaire){
      Questionnaire.save(questionnaire);
      $scope.questionnaires = Questionnaire.get();
      $scope.questionnaires.reverse();
      console.log($scope.questionnaires);
  };



  // PAGINATION

    $scope.viewby = 5;
    $scope.totalItems = $scope.questionnaires.length;
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

.controller('AdminQuestionnaireShowCtrl', function AdminQuestionnaireShowCtrl($scope, $state, Questionnaire, QuestionnaireQuestion, Category, Question) {

  $scope.questions = Question.get();

  $scope.categories = Category.get();

  $scope.newQuestionText = "";

  $scope.questionnaire = Questionnaire.get({questionnaire_id:$state.params.questionnaire_id});
  
  $scope.questionnaire_questions = QuestionnaireQuestion.get({parent_id: 0, questionnaire_id: $state.params.questionnaire_id});

  $scope.createQuestion = function() {

    var newQuestion = {questionnaire_id: $state.params.questionnaire_id, parent_id: 0, question_text: $scope.newQuestionText, trigger_on: "yes"};

    QuestionnaireQuestion.save(newQuestion);

    $scope.questionnaire_questions = QuestionnaireQuestion.get({parent_id: 0, questionnaire_id: $state.params.questionnaire_id});

    $scope.newQuestionText = "";
  }
})

.controller( 'AdminQuestionnaireEditQuestionCtrl', function AdminQuestionnaireEditQuestionCtrl($scope, $state, Questionnaire, QuestionnaireQuestion, Question) {
  $scope.questions = Question.get();

  $scope.questionnaire = Questionnaire.get({questionnaire_id:$state.params.questionnaire_id});
  $scope.newQuestionText = "";

  $scope.newQuestionYes = "";
  
  $scope.main_question = QuestionnaireQuestion.get({question_id: $state.params.question_id, questionnaire_id: $state.params.questionnaire_id});

  $scope.history = QuestionnaireQuestion.get_breadcrumb($scope.main_question);

  $scope.yes_questionnaire_questions = QuestionnaireQuestion.get({parent_id: $state.params.question_id, questionnaire_id: $state.params.questionnaire_id, trigger_on: "yes"});
  $scope.no_questionnaire_questions = QuestionnaireQuestion.get({parent_id: $state.params.question_id, questionnaire_id: $state.params.questionnaire_id, trigger_on: "no"});

  $scope.show_add_input = false;


  $scope.addOtherQuestions = function(main_question, answer) {
    main_question.trigger_on = answer;
    $scope.main_question = QuestionnaireQuestion.update(main_question);

    $scope.show_add_input = true;
  };

  $scope.createYesQuestion = function() {

    var newQuestion = {questionnaire_id: $state.params.questionnaire_id, parent_id: $scope.main_question.id, question_text: $scope.newQuestionYes, trigger_on: "yes"};

    QuestionnaireQuestion.save(newQuestion);

    $scope.yes_questionnaire_questions = QuestionnaireQuestion.get({parent_id: $scope.main_question.id, questionnaire_id: $state.params.questionnaire_id, trigger_on: "yes"});

    $scope.newQuestionYes = "";
  };

  $scope.createNoQuestion = function() {

    var newQuestion = {questionnaire_id: $state.params.questionnaire_id, parent_id: $scope.main_question.id, question_text: $scope.newQuestionNo, trigger_on: "no"};

    QuestionnaireQuestion.save(newQuestion);

    $scope.no_questionnaire_questions = QuestionnaireQuestion.get({parent_id: $scope.main_question.id, questionnaire_id: $state.params.questionnaire_id, trigger_on: "no"});

    $scope.newQuestionNo = "";
  };
})
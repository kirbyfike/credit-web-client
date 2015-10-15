angular.module( 'credit.admin.questionnaire.questionnaire', [
  'ui.router.state',
  'ngResource', 'xeditable'
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
        templateUrl: 'app/admin/questionnaire/questionnaire/questionnaire.tpl.html'
      }
    },
    data:{ pageTitle: 'Login' }
  })
  .state( 'adminQuestionnaire.index', {
    url: '',
    controller: 'AdminQuestionnaireIndexCtrl',
    templateUrl: 'app/admin/questionnaire/questionnaire/questionnaire.index.tpl.html',
    data:{ pageTitle: 'Model' }
  })
  .state( 'adminQuestionnaire.edit', {
    url: '/:id/edit',
    controller: 'AdminQuestionnaireEditCtrl',
    templateUrl: 'app/admin/questionnaire/questionnaire/questionnaire.edit.tpl.html',
    data:{ pageTitle: 'Model' }
  });
})


// FACTORY

.factory('Questionnaire', function ($resource, URLHOST)  {
  var resourceURL = (URLHOST == "localhost:8888") ? "./app/admin/questionnaire/data/questionnaire.json" : "/questionnaire.json";
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


// CONTROLLER

.controller( 'AdminQuestionnaireCtrl', function AdminQuestionnaireCtrl($scope, $state) {
})

.controller( 'AdminQuestionnaireIndexCtrl', function AdminQuestionnaireIndexCtrl($scope, $state, Questionnaire) {
  $scope.questionnaires = Questionnaire.get();
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

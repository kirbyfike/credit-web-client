angular.module( 'credit.admin.questionnaire', [
  'ui.router.state'
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
      url: '',
      controller: 'AdminQuestionnaireCategoriesCtrl',
      templateUrl: 'app/admin/questionnaire/questionnaire.categories.tpl.html',
      data:{ pageTitle: 'Model' }
    })
    .state( 'adminQuestionnaire.questions', {
      url: '',
      controller: 'AdminQuestionnaireQuestionsCtrl',
      templateUrl: 'app/admin/questionnaire/questionnaire.questions.tpl.html',
      data:{ pageTitle: 'Model' }
    })
    ;
})

// .factory('Questionnaire', function ($resource, $rootScope)  {
//   var Questionnaire = $resource("questionnaire.json", {id:'@id'}, {
//     update: { 
//         method: 'PUT', 
//         params: { id: '@id' }
//     },
//     remove: {method:'DELETE'}
//   });

//   return Questionnaire;
// })


.controller( 'AdminQuestionnaireCtrl', function AdminQuestionnaireCtrl($scope, $state) {
  
})

.controller( 'AdminQuestionnaireIndexCtrl', function AdminQuestionnaireIndexCtrl($scope, $state, Questionnaire) {
  
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
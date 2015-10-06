angular.module( 'credit.admin.questionnaire', [
  'ui.router.state'
])
.config(function config( $stateProvider ) {
  $stateProvider
    .state( 'adminQuestionnaire', {
      url: '/admin/questionnaire',
      views: {
      	"header": {
          controller: 'HeaderCtrl',
          templateUrl: 'app/shared/header/header.tpl.html'
        },
      	"nav": {
          controller: 'NavCtrl',
          templateUrl: 'app/shared/nav/nav.tpl.html'
        },
        "main": {
          controller: 'AdminQuestionnaireCtrl',
          templateUrl: 'app/admin/questionnaire/questionnaire.tpl.html'
        }
      },
      data:{ pageTitle: 'Login' }
    });
})

/**
 * And of course we define a controller for our route.
 */
.controller( 'AdminQuestionnaireCtrl', function AdminQuestionnaireCtrl($scope, $state) {
  console.log("hello");
})
;
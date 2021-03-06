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
  'ui.bootstrap',
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
    	"nav-header": {
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

.controller('AdminQuestionnaireCtrl', function AdminQuestionnaireCtrl($scope, $state) {
})
;
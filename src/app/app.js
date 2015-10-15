(function () {
	'use strict';

	require('angular');
	require('angular-ui-router');
	require('angular-resource');
	require('angular-xeditable');

	require('./login/login.js');
	require('./admin/questionnaire/categories/categories.js');
	require('./admin/questionnaire/questions/questions.js');
	require('./admin/questionnaire/questionnaire/questionnaire.js');
	require('./admin/questionnaire/nav/nav.js');
	require('./shared/nav/nav.js');
	require('./shared/header/header.js');

	
	angular.module( 'credit', [
	  'credit.login',
	  'credit.shared.nav',
	  'credit.shared.header',
	  'credit.admin.questionnaire.questionnaire',
	  'credit.admin.questionnaire.questions',
	  'credit.admin.questionnaire.categories',
	  'ui.router'
	])

	.constant('URLHOST', (function() {
	  return location.href.split( '/' )[2];
	})())

	.config( function myAppConfig ( $stateProvider, $urlRouterProvider ) {
	  //$urlRouterProvider.otherwise( '/flatify/charts/gauge' );
	})

	.run( function run () {
	})

	.controller( 'AppCtrl', function AppCtrl ( $scope, $location ) {
	  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
	    if ( angular.isDefined( toState.data.pageTitle ) ) {
	      $scope.pageTitle = toState.data.pageTitle + ' | ngBoilerplate' ;
	    }
	  });
	});

}());




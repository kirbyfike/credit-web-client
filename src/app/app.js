(function () {
	'use strict';

	require('angular');
	require('angular-ui-router');

	require('./login/login.js');
	require('./admin/questionnaire/questionnaire.js');
	require('./shared/nav/nav.js');
	require('./shared/header/header.js');

	
	angular.module( 'credit', [
	  'credit.login',
	  'credit.shared.nav',
	  'credit.shared.header',
	  'credit.admin.questionnaire',
	  'ui.router'
	])

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




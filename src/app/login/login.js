angular.module( 'credit.login', [
  'ui.router.state'
])
.config(function config( $stateProvider ) {
  $stateProvider
    .state( 'login', {
      url: '/login',
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
          controller: 'LoginCtrl',
          templateUrl: 'app/login/login.tpl.html'
        }
      },
      data:{ pageTitle: 'Login' }
    });
})
/**
 * And of course we define a controller for our route.
 */
.controller( 'LoginCtrl', function LoginCtrl($scope, $state) {
  console.log("hello");
})
;
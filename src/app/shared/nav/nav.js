angular.module( 'credit.shared.nav', [
  'ui.router.state'
])
.config(function config( $stateProvider ) {
  $stateProvider
    .state( 'nav', {
      views: {
        "nav": {
          controller: 'NavCtrl',
          templateUrl: 'app/shared/nav/nav.tpl.html'
        }
      },
      data:{ pageTitle: 'Login' }
    });
})

/**
 * And of course we define a controller for our route.
 */
.controller( 'NavCtrl', function NavCtrl($scope, $state) {
})
;
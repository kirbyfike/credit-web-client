angular.module( 'credit.shared.header', [
  'ui.router.state'
])
.config(function config( $stateProvider ) {
  $stateProvider
    .state( 'header', {
      views: {
        "header": {
          controller: 'HeaderCtrl',
          templateUrl: 'app/shared/header/header.tpl.html'
        }
      },
      data:{ pageTitle: 'Header' }
    });
})

/**
 * And of course we define a controller for our route.
 */
.controller( 'HeaderCtrl', function HeaderCtrl($scope, $state) {
})
;
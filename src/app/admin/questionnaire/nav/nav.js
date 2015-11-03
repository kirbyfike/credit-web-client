angular.module( 'credit.admin.questionnaire.nav', [
  'ui.router.state',
  'ngResource', 'xeditable'
])

/**
 * And of course we define a controller for our route.
 */
.controller( 'AdminQuestionnaireNavCtrl', function AdminQuestionnaireNavCtrl($scope, $state) {
})

.directive('toggleNav', function() { 
  return { 
    restrict: 'EA',
    link: function ($scope, element, attrs) {
    	var animateIn = true;

    	$('.toggle-nav-holder').click(function(){
    		$("#screen").show();

    		if (!animateIn){
    			$("#screen").hide();
				  //function
				  animateIn = true;
				  navWidth = "0%";
					screenWidth = "100%";

				} else {
					
					navWidth = "20%";
    			screenWidth = "80%";

					animateIn = false;
				}

				$("#questionnaire-nav").animate({
				    width: navWidth
				}, {
				    duration: 200,
				    specialEasing: {
				        width: 'linear'
				    }
				}, function() {
				 	}
				);

				$("#questionnaire-show, #screen").animate({
				    width: screenWidth
				}, {
				    duration: 200,
				    specialEasing: {
				        width: 'linear'
				   }
				}, function() {
				 	}
				);

				
				$("#screen").animate({
				    width: screenWidth
				}, {
				    duration: 200,
				    specialEasing: {
				        width: 'linear'
				   }
				}, function() {
				 	}
				);
    	})
    }
  }; 
})
;
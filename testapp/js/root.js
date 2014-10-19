window.angular.module('root',[])
.controller('RootController',[ '$scope', 'GrowlMessages',
function                     (  $scope,   GrowlMessages ){

    $scope.message = "";
    $scope.status = "";

    $scope.add = function() {
        GrowlMessages.add($scope.message, $scope.status);
    };

}]);

angular.module('webSocketStatusView').directive('webSocketStatusView', ['urlFactory', function (urlFactory) {
    return {
        restrict: 'E',
        templateUrl: urlFactory.createUrl('templates/components/webSocketStatusView.html')
    };
}]);
angular.module('messageView').directive('messageView', ['urlFactory', function (urlFactory) {
    return {
        restrict: 'E',
        templateUrl: urlFactory.createUrl('templates/components/messageView.html')
    };
}]);
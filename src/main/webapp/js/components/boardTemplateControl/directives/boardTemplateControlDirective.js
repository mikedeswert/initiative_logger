angular.module('boardControl').directive('boardTemplateControl', ['urlFactory', function (urlFactory) {
    return {
        restrict: 'E',
        templateUrl: urlFactory.createUrl('templates/components/boardTemplateControl.html')
    };
}]);
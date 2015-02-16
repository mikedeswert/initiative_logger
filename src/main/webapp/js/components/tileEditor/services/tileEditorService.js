angular.module('tileEditor')
    .factory('tileEditorService', ['restService', 'messageService', function(restService, messageService) {
        var selectedTile;

        return {
            getSelectedTile: function() {
                return selectedTile;
            },
            setSelectedTile: function(newSelectedTile) {
                selectedTile = newSelectedTile;
            },
            getTileTypes: function() {
                return restService.get('/rest/tile/types')
                    .then(
                        function(response) {
                            return response.data;
                        },
                        function() {
                            messageService.addErrorMessage('Something went wrong while retrieving the tile types. Please refresh the page to try again.');
                        }
                    );
            },
            getOrientations: function() {
                return restService.get('/rest/tile/orientations')
                    .then(
                    function(response) {
                        return response.data;
                    },
                    function() {
                        messageService.addErrorMessage('Something went wrong while retrieving the orientations. Please refresh the page to try again.');
                    }
                );
            },

        };
    }]);
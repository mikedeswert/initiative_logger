angular.module('tileEditor')
    .factory('tileEditorService', [function() {
        var selectedTile;

        return {
            getSelectedTile: function() {
                return selectedTile;
            },
            setSelectedTile: function(newSelectedTile) {
                selectedTile = newSelectedTile;
            }
        };
    }]);
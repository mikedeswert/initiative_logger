angular.module('boardTemplateControl')
    .service('boardTemplateFactory', [function() {
        var BoardTemplate = function() {
            this.name = 'New board';
            this.defaultTileType = 'GRASS';
            this.size = 10;
            this.tiles = [[]];

            this.resize = function(newSize) {
                var tilesCopy = copyTiles(this.tiles);

                this.resizeRows(tilesCopy, newSize);
                for(var i = 0; i < tilesCopy.length; i++) {
                    this.resizeColumns(tilesCopy[i], newSize);
                }

                this.tiles = tilesCopy;
                this.size = newSize;
            };

            function copyTiles(tiles) {
                var tilesCopy = [];

                tiles.forEach(function(row) {
                    tilesCopy.push(row.slice());
                });

                return tilesCopy;
            }

            this.resizeRows = function(tiles, newSize) {
                if(tiles.length > newSize) {
                    tiles.length = newSize;
                    return;
                }

                for(var i = tiles.length; i < newSize; i++) {
                    tiles.push(this.createRow(newSize));
                }
            };

            this.createRow = function(newSize) {
                var row = [];

                for(var i = 0; i < newSize; i++) {
                    row.push({
                        orientation: "NORTH",
                        tokens: [],
                        type: this.defaultTileType
                    })
                }

                return row;
            };

            this.resizeColumns = function(row, newSize) {
                if(row.length > newSize) {
                    row.length = newSize;
                    return;
                }

                for(var i = row.length; i < newSize; i++) {
                    row.push({
                        orientation: "NORTH",
                        tokens: [],
                        type: this.defaultTileType
                    })
                }
            };

            this.from = function(boardTemplate) {
                this.id = boardTemplate.id;
                this.name = boardTemplate.name;
                this.size = boardTemplate.size;
                this.tiles = boardTemplate.tiles;
                this.defaultTileType = boardTemplate.defaultTileType;

                return this;
            };
        };

        this.createBoardTemplate = function(boardTemplate) {
            if(boardTemplate == undefined) {
                return new BoardTemplate();
            }

            return new BoardTemplate().from(boardTemplate);
        };
    }]);
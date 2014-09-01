package be.mikeds.model;

import be.mikeds.enums.TileType;

import static be.mikeds.enums.TileType.GRASS;

/**
 * --------------------------------
 * Created by mikeds on 24/08/2014.
 * --------------------------------
 */
public class Board {
    private Tile[][] tiles;
    private int size;

    public Board(int size) {
        this.size = size;
    }

    public Tile[][] getTiles() {
        return tiles;
    }

    public void setTiles(Tile[][] tiles) {
        this.tiles = tiles;
    }

    public int getSize() {
        return size;
    }

    public void setSize(int size) {
        this.size = size;
    }

    public void initializeBoard(TileType tileType) {
        tiles = new Tile[size][size];

        for (int i = 0; i < size; i++) {
            for(int j = 0; j < size; j++) {
                tiles[i][j] = new Tile(tileType);
            }
        }
    }

    public void initialize() {
        initializeBoard(GRASS);
    }

    public void addToken(Token token, int positionX, int positionY) {
        tiles[positionX][positionY].addToken(token);
    }
}

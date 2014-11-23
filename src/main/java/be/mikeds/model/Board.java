package be.mikeds.model;

import be.mikeds.enums.TileType;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import static be.mikeds.enums.TileType.GRASS;

/**
 * --------------------------------
 * Created by mikeds on 24/08/2014.
 * --------------------------------
 */

@Document(collection = "boards")
public class Board {

    @Id
    private String id;

    private Tile[][] tiles;
    private int size;

    public Board() {}

    public Board(int size) {
        this.size = size;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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

package be.mikeds.model;

import be.mikeds.enums.TileType;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * --------------------------------
 * Created by mikeds on 24/08/2014.
 * --------------------------------
 */
@Document(collection = "boards")
public class Board implements Observer {

    @Id
    private String id;

    private String name;
    private Tile[][] tiles;
    private TileType defaultTileType = TileType.GRASS;
    private int size;

    @DBRef
    private BoardTemplate boardTemplate;

    public Board() {}

    public Board(int size) {
        //TODO remove this constructor
        this.size = size;
        initialize();
    }

    public Board(BoardTemplate boardTemplate) {
        this.name = boardTemplate.getName();
        this.size = boardTemplate.getSize();
        this.defaultTileType = boardTemplate.getDefaultTileType();
        this.boardTemplate = boardTemplate;
        initializeTiles(boardTemplate.getTiles());
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Tile[][] getTiles() {
        return tiles;
    }

    public void setTiles(Tile[][] tiles) {
        this.tiles = tiles;
    }

    public TileType getDefaultTileType() {
        return defaultTileType;
    }

    public void setDefaultTileType(TileType defaultTileType) {
        this.defaultTileType = defaultTileType;
    }

    public int getSize() {
        return size;
    }

    public void setSize(int size) {
        this.size = size;
    }

    public BoardTemplate getBoardTemplate() {
        return boardTemplate;
    }

    public void setBoardTemplate(BoardTemplate boardTemplate) {
        this.boardTemplate = boardTemplate;
    }

    @JsonIgnore
    private void initialize() {
        initializeTiles(new Tile[0][0]);
    }

    @JsonIgnore
    private void initializeTiles(Tile[][] tiles) {
        this.tiles = new Tile[size][size];

        for (int i = 0; i < size; i++) {
            for(int j = 0; j < size; j++) {
                initializeTile(tiles, i, j);
            }
        }
    }

    private void initializeTile(Tile[][] tiles, int row, int column) {
        if(row < tiles.length && column < tiles.length) {
            this.tiles[row][column] = new Tile(tiles[row][column]);
            return;
        }
        this.tiles[row][column] = new Tile(defaultTileType);
    }

    @Override
    @JsonIgnore
    public void update() {
        this.name = boardTemplate.getName();
        this.size = boardTemplate.getSize();
        this.defaultTileType = boardTemplate.getDefaultTileType();

        initializeTiles(boardTemplate.getTiles());
    }

}

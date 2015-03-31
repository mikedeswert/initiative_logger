package be.mikeds.model;

import be.mikeds.enums.TileType;
import be.mikeds.mongodb.annotations.CascadeSave;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;

/**
 * --------------------------------
 * Created by mikeds on 25/03/2015.
 * --------------------------------
 */
@Document(collection = "boardtemplates")
public class BoardTemplate implements Observable {
    @Id
    private String id;

    private String name;
    private Tile[][] tiles;
    private TileType defaultTileType = TileType.GRASS;
    private int size;

    @DBRef
    @CascadeSave
    private Set<Observer> observers = new HashSet<>();

    @Override
    @JsonIgnore
    public void notifyObservers() {
        observers.forEach(Observer::update);
    }

    @JsonIgnore
    public Board newBoardInstance() {
        Board board = new Board(this);
        observers.add(board);

        return board;
    }

    @JsonIgnore
    public void removeBoardInstance(Board board) {
        Iterator<Observer> iterator = observers.iterator();

        while(iterator.hasNext()) {
            Board next = (Board) iterator.next();
            if(StringUtils.equals(next.getId(), board.getId())) {
                observers.remove(next);
            }
        }
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
        notifyObservers();
    }

    public Tile[][] getTiles() {
        return tiles;
    }

    public void setTiles(Tile[][] tiles) {
        this.tiles = tiles;
        notifyObservers();
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
        notifyObservers();
    }

    @JsonIgnore
    public void update(BoardTemplate boardTemplate) {
        this.id = boardTemplate.getId();
        this.name = boardTemplate.getName();
        this.tiles = boardTemplate.getTiles();
        this.defaultTileType = boardTemplate.getDefaultTileType();
        this.size = boardTemplate.getSize();
        notifyObservers();
    }

    @JsonIgnore
    public void initializeTiles() {
        this.tiles = new Tile[size][size];

        for (int i = 0; i < size; i++) {
            for(int j = 0; j < size; j++) {
                this.tiles[i][j] = new Tile(defaultTileType);
            }
        }
    }
}

package be.mikeds.model;

import be.mikeds.enums.Orientation;
import be.mikeds.enums.TileType;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.data.annotation.Id;

import java.util.ArrayList;
import java.util.List;

import static be.mikeds.enums.Orientation.NORTH;
import static java.util.Collections.unmodifiableList;

/**
 * --------------------------------
 * Created by mikeds on 23/08/2014.
 * --------------------------------
 */
public class Tile {

    @Id
    private String id;

    private TileType type;
    private Orientation orientation = NORTH;
    private List<Token> tokens = new ArrayList<>();

    public Tile() {}

    public Tile(TileType type) {
        this.type = type;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public TileType getType() {
        return type;
    }

    public void setType(TileType type) {
        this.type = type;
    }

    public Orientation getOrientation() {
        return orientation;
    }

    public void setOrientation(Orientation orientation) {
        this.orientation = orientation;
    }

    public List<Token> getTokens() {
        return unmodifiableList(tokens);
    }

    public void setTokens(List<Token> tokens) {
        this.tokens = tokens;
    }

    @JsonIgnore
    public void addToken(Token token) {
        tokens.add(token);
    }
}

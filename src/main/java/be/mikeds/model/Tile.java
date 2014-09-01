package be.mikeds.model;

import be.mikeds.enums.Orientation;
import be.mikeds.enums.TileType;

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
    private TileType type;
    private Orientation orientation = NORTH;
    private List<Token> tokens = new ArrayList<>();

    public Tile(TileType type) {
        this.type = type;
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

    public void addToken(Token token) {
        tokens.add(token);
    }
}

package be.mikeds.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * --------------------------------
 * Created by mikeds on 17/08/2014.
 * --------------------------------
 */
@Document(collection = "creature")
public class Creature {

    @Id
    private String id;

    private String name;
    private int initiative;
    private int calculatedInitiative;
    private int turnCount;
    private String imageSource;

    public Creature() {
    }

    public Creature(String name) {
        this.name = name;
    }

    public Creature(String name, int initiative) {
        this.name = name;
        this.initiative = initiative;
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

    public int getInitiative() {
        return initiative;
    }

    public void setInitiative(int initiative) {
        this.initiative = initiative;
    }

    public int getCalculatedInitiative() {
        return calculatedInitiative;
    }

    public void setCalculatedInitiative(int calculatedInitiative) {
        this.calculatedInitiative = calculatedInitiative;
    }

    public int getTurnCount() {
        return turnCount;
    }

    public void setTurnCount(int turnCount) {
        this.turnCount = turnCount;
    }

    public void incrementTurnCounnt() {
        this.turnCount++;
    }

    public String getImageSource() {
        return imageSource;
    }

    public void setImageSource(String imageSource) {
        this.imageSource = imageSource;
    }
}

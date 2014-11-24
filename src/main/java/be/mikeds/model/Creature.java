package be.mikeds.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.bson.types.ObjectId;
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
    private String type;
    private String imageSource;
    private boolean invisible;
    private boolean bloodied;

    public Creature() {
        if(id == null) {
            this.id = ObjectId.get().toString();
        }
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

    public String getImageSource() {
        return imageSource;
    }

    public void setImageSource(String imageSource) {
        this.imageSource = imageSource;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public boolean isInvisible() {
        return invisible;
    }

    public void setInvisible(boolean invisible) {
        this.invisible = invisible;
    }

    public boolean isBloodied() {
        return bloodied;
    }

    public void setBloodied(boolean bloodied) {
        this.bloodied = bloodied;
    }

    @JsonIgnore
    public void incrementTurnCounnt() {
        this.turnCount++;
    }
}

package be.mikeds.model;

/**
 * --------------------------------
 * Created by mikeds on 17/08/2014.
 * --------------------------------
 */
public class Creature {
    private String name;
    private int initiative;
    private int calculatedInitiative;
    private String imageSource;

    public Creature(String name) {
        this.name = name;
    }

    public Creature(String name, int initiative) {
        this.name = name;
        this.initiative = initiative;
    }

    public int getCalculatedInitiative() {
        return calculatedInitiative;
    }

    public int getInitiative() {
        return initiative;
    }

    public String getName() {
        return name;
    }

    public String getImageSource() {
        return imageSource;
    }

    public void setImageSource(String imageSource) {
        this.imageSource = imageSource;
    }

    public void setCalculatedInitiative(int calculatedInitiative) {
        this.calculatedInitiative = calculatedInitiative;
    }

    public void setInitiative(int initiative) {
        this.initiative = initiative;
    }

    public void setName(String name) {
        this.name = name;
    }
}

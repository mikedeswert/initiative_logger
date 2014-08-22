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

    public void setCalculatedInitiative(int calculatedInitiative) {
        this.calculatedInitiative = calculatedInitiative;
    }
}

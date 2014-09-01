package be.mikeds.model;

/**
 * --------------------------------
 * Created by mikeds on 23/08/2014.
 * --------------------------------
 */
public class CreatureToken implements Token {
    private Creature creature;

    public Creature getCreature() {
        return creature;
    }

    public void setCreature(Creature creature) {
        this.creature = creature;
    }
}

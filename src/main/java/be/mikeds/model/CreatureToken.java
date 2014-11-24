package be.mikeds.model;

import org.springframework.data.mongodb.core.mapping.DBRef;

/**
 * --------------------------------
 * Created by mikeds on 23/08/2014.
 * --------------------------------
 */
public class CreatureToken extends Token {

    @DBRef
    private Creature creature;

    public Creature getCreature() {
        return creature;
    }

    public void setCreature(Creature creature) {
        this.creature = creature;
    }
}

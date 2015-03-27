package be.mikeds.factories;

import be.mikeds.enums.CreatureType;
import be.mikeds.model.Creature;
import org.springframework.stereotype.Component;

/**
 * --------------------------------
 * Created by mikeds on 27/03/2015.
 * --------------------------------
 */
@Component
public class CreatureFactory {
    public Creature create(CreatureType creatureType, String name, int initiative) {
        switch (creatureType) {
            case PLAYER:
                Creature player = new Creature(name);
                player.setCalculatedInitiative(initiative);
                return player;
            case MONSTER:
                return new Creature(name, initiative);
        }

        throw new IllegalArgumentException("Creature type " + creatureType + " does not match any of the known cases.");
    }
}

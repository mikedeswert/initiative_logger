package be.mikeds.services;

import be.mikeds.model.Creature;

import java.util.List;

/**
 * --------------------------------
 * Created by mikeds on 17/08/2014.
 * --------------------------------
 */
public interface CreatureService {
    void addCreature(Creature creature);
    void deleteCreature(String name);
    List<Creature> getCreatures();
    List<Creature> calculateInitiative();
    void resetCreatures();

    void shiftCreaturesLeft();

    Creature getCreature(String name);
}

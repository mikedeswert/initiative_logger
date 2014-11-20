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
    void deleteCreature(String id);
    List<Creature> getCreatures();
    void calculateInitiative();
    void resetCreatures();

    void incrementCreatureTurnCount(String id);

    Creature getCreature(String name);
}

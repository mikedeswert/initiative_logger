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
    List<Creature> getCreatures();
    Creature getCreature(String name);
    void updateCreature(Creature creature);
    void deleteCreature(String id);
    void deleteAllCreatures();
    void incrementCreatureTurnCount(String id);

}

package be.mikeds.services;

import be.mikeds.model.Creature;

import java.util.List;

/**
 * --------------------------------
 * Created by mikeds on 17/08/2014.
 * --------------------------------
 */
public interface CreatureService extends Service<Creature> {
    void incrementTurnCount(String id);
}

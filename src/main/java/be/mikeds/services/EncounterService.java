package be.mikeds.services;

import be.mikeds.model.Encounter;

import java.util.List;

/**
 * --------------------------------
 * Created by mikeds on 17/08/2014.
 * --------------------------------
 */
public interface EncounterService extends Service<Encounter> {
    void calculateCreatureInitiatives(Encounter encounter);
    void resetCreatures(Encounter encounter);
}

package be.mikeds.services;

import be.mikeds.model.Creature;
import be.mikeds.model.Encounter;

import java.util.List;

/**
 * --------------------------------
 * Created by mikeds on 17/08/2014.
 * --------------------------------
 */
public interface EncounterService {
    void addEncounter(Encounter encounter);
    List<Encounter> getEncounters();
    Encounter getEncounter(String id);
    void updateEncounter(Encounter encounter);
    void deleteEncounter(String id);
    void calculateCreatureInitiatives(Encounter encounter);
    void resetCreatures(Encounter encounter);
}

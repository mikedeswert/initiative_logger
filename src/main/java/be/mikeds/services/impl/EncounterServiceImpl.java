package be.mikeds.services.impl;

import be.mikeds.model.Creature;
import be.mikeds.model.Encounter;
import be.mikeds.repositories.EncounterRepository;
import be.mikeds.services.CreatureService;
import be.mikeds.services.DiceRollerService;
import be.mikeds.services.EncounterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import static java.util.Collections.unmodifiableList;

/**
 * --------------------------------
 * Created by mikeds on 17/08/2014.
 * --------------------------------
 */
@Service
public class EncounterServiceImpl implements EncounterService {
    private static final int TWENTY_SIDED = 20;

    @Autowired
    private EncounterRepository encounterRepository;

    @Autowired
    private DiceRollerService diceRollerService;

    @Override
    public void addEncounter(Encounter encounter) {
        encounterRepository.save(encounter);
    }

    @Override
    public List<Encounter> getEncounters() {
        return unmodifiableList(encounterRepository.findAll());
    }

    @Override
    public Encounter getEncounter(String id) {
        return encounterRepository.findOne(id);
    }

    @Override
    public void updateEncounter(Encounter encounter) {
        encounterRepository.save(encounter);
    }


    @Override
    public void deleteEncounter(String id) {
        encounterRepository.delete(id);
    }

    @Override
    public void calculateCreatureInitiatives(Encounter encounter) {
        for (Creature creature : encounter.getCreatures()) {
            if (creature.getCalculatedInitiative() == 0) {
                creature.setCalculatedInitiative(diceRollerService.roll(1, TWENTY_SIDED) + creature.getInitiative());
            }
        }

        encounterRepository.save(encounter);
    }

    @Override
    public void resetCreatures(Encounter encounter) {
        for (Creature creature : encounter.getCreatures()) {
            creature.setCalculatedInitiative(0);
        }

        encounterRepository.save(encounter);
    }
}

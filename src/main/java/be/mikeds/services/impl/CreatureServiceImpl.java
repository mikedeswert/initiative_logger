package be.mikeds.services.impl;

import be.mikeds.model.Creature;
import be.mikeds.repositories.CreatureRepository;
import be.mikeds.services.CreatureService;
import be.mikeds.services.DiceRollerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.Serializable;
import java.util.*;

import static java.util.Collections.sort;
import static java.util.Collections.unmodifiableList;

/**
 * --------------------------------
 * Created by mikeds on 17/08/2014.
 * --------------------------------
 */
@Service
public class CreatureServiceImpl implements CreatureService {
    private static final int TWENTY_SIDED = 20;

    @Autowired
    private CreatureRepository creatureRepository;

    @Autowired
    private DiceRollerService diceRollerService;

    @Override
    public void addCreature(Creature creature) {
        creatureRepository.save(creature);
    }

    @Override
    public void deleteCreature(String id) {
        creatureRepository.delete(id);
    }

    @Override
    public List<Creature> getCreatures() {
        List<Creature> creatures = creatureRepository.findAll();
        //sort(creatures, (c1, c2) -> (c1.getTurnCount() - c2.getTurnCount() != 0) ? c1.getTurnCount() - c2.getTurnCount() : c2.getCalculatedInitiative() - c1.getCalculatedInitiative());
        return unmodifiableList(creatures);
    }

    @Override
    public void calculateInitiative() {
        List<Creature> creatures = creatureRepository.findAll();

        for (Creature creature : creatures) {
            if (creature.getCalculatedInitiative() == 0) {
                creature.setCalculatedInitiative(diceRollerService.roll(1, TWENTY_SIDED) + creature.getInitiative());
            }
        }

        creatureRepository.save(creatures);
    }

    @Override
    public void resetCreatures() {
        creatureRepository.deleteAll();
    }

    @Override
    public void incrementCreatureTurnCount(String id) {
        Creature creature = creatureRepository.findOne(id);
        creature.incrementTurnCounnt();
        creatureRepository.save(creature);
    }

    @Override
    public Creature getCreature(String id) {
        return creatureRepository.findOne(id);
    }
}

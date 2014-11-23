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

    @Autowired
    private CreatureRepository creatureRepository;

    @Override
    public void addCreature(Creature creature) {
        creatureRepository.save(creature);
    }

    @Override
    public List<Creature> getCreatures() {
        return unmodifiableList(creatureRepository.findAll());
    }

    @Override
    public Creature getCreature(String id) {
        return creatureRepository.findOne(id);
    }

    @Override
    public void updateCreature(Creature creature) {
        creatureRepository.save(creature);
    }

    @Override
    public void deleteCreature(String id) {
        creatureRepository.delete(id);
    }

    @Override
    public void deleteAllCreatures() {
        creatureRepository.deleteAll();
    }

    @Override
    public void incrementCreatureTurnCount(String id) {
        Creature creature = creatureRepository.findOne(id);
        creature.incrementTurnCounnt();
        creatureRepository.save(creature);
    }

}

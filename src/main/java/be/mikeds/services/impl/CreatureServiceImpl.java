package be.mikeds.services.impl;

import be.mikeds.model.Creature;
import be.mikeds.repositories.CreatureRepository;
import be.mikeds.services.CreatureService;
import be.mikeds.services.DiceRollerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.repository.MongoRepository;
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
public class CreatureServiceImpl extends ServiceImpl<Creature> implements CreatureService {

    @Autowired
    private CreatureRepository creatureRepository;

    @Override
    public void incrementTurnCount(String id) {
        Creature creature = getRepository().findOne(id);
        creature.incrementTurnCounnt();
        getRepository().save(creature);
    }

    @Override
    MongoRepository<Creature, String> getRepository() {
        return creatureRepository;
    }
}

package be.mikeds.services.impl;

import be.mikeds.model.Creature;
import be.mikeds.model.Encounter;
import be.mikeds.repositories.EncounterRepository;
import be.mikeds.services.CreatureService;
import be.mikeds.services.DiceRollerService;
import be.mikeds.services.EncounterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;

import static java.util.Collections.unmodifiableList;

/**
 * --------------------------------
 * Created by mikeds on 17/08/2014.
 * --------------------------------
 */
@Service
public class EncounterServiceImpl extends ServiceImpl<Encounter> implements EncounterService {
    private static final int TWENTY_SIDED = 20;

    @Autowired
    private EncounterRepository encounterRepository;

    @Autowired
    private DiceRollerService diceRollerService;

    @Override
    public void calculateCreatureInitiatives(Encounter encounter) {
        getCreaturesWithZeroCalculatedInitiative(encounter).forEach(
                creature -> creature.setCalculatedInitiative(getCalculatedInitiative(creature))
        );

        getRepository().save(encounter);
    }

    @Override
    public void resetCreatures(Encounter encounter) {
        encounter.getCreatures().stream().forEach(
                creature -> creature.setCalculatedInitiative(0)
        );

        getRepository().save(encounter);
    }


    @Override
    MongoRepository<Encounter, String> getRepository() {
        return encounterRepository;
    }

    private Stream<Creature> getCreaturesWithZeroCalculatedInitiative(Encounter encounter) {
        return encounter.getCreatures().stream().filter(creature -> creature.getCalculatedInitiative() == 0);
    }

    private int getCalculatedInitiative(Creature creature) {
        return diceRollerService.roll(1, TWENTY_SIDED) + creature.getInitiative();
    }
}

package be.mikeds.services;

import be.mikeds.model.Creature;
import com.google.inject.Inject;
import com.google.inject.Singleton;
import com.sun.javafx.UnmodifiableArrayList;

import java.util.*;

import static java.util.Collections.sort;
import static java.util.Collections.unmodifiableList;

/**
 * --------------------------------
 * Created by mikeds on 17/08/2014.
 * --------------------------------
 */
@Singleton
public class CreatureServiceImpl implements CreatureService {
    private static final int TWENTY_SIDED = 20;

    private List<Creature> creatures = new ArrayList<>();

    @Inject
    private DiceRollerService diceRollerService;

    @Override
    public void addCreature(Creature creature) {
        creatures.add(creature);
    }

    @Override
    public void deleteCreature(String name) {
        Iterator<Creature> i = creatures.iterator();
        while (i.hasNext()) {
            Creature creature = i.next();
            if (creature.getName().equals(name)) {
                i.remove();
            }
        }
    }

    @Override
    public List<Creature> getCreatures() {
        return unmodifiableList(creatures);
    }

    @Override
    public List<Creature> calculateInitiative() {
        for (Creature creature : creatures) {
            if(creature.getCalculatedInitiative() == 0) {
                creature.setCalculatedInitiative(diceRollerService.roll(1, TWENTY_SIDED) + creature.getInitiative());
            }
        }

        sort(creatures, new Comparator<Creature>() {
            @Override
            public int compare(Creature c1, Creature c2) {
                return c2.getCalculatedInitiative() - c1.getCalculatedInitiative();
            }
        });

        return creatures;
    }

    @Override
    public void resetCreatures() {
        creatures = new ArrayList<>();
    }


}
package be.mikeds.services.impl;

import be.mikeds.enums.Command;
import be.mikeds.model.Creature;
import be.mikeds.model.Encounter;
import be.mikeds.services.CommandParserService;
import be.mikeds.services.CreatureService;
import be.mikeds.services.EncounterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.Serializable;
import java.util.List;

import static java.lang.Integer.parseInt;

/**
 * --------------------------------
 * Created by mikeds on 23/08/2014.
 * --------------------------------
 */
@Service
public class CommandParserServiceImpl implements CommandParserService {

    @Autowired
    private CreatureService creatureService;

    @Autowired
    private EncounterService encounterService;

    @Override
    public String parseCommand(String input) {
        StringBuilder feedback = new StringBuilder();

        try {
            String[] inputParts = input.split(" ");
            String command = inputParts[0];

            switch (Command.valueOf(command.toUpperCase())) {
                case ADD:
                    addCreature(inputParts);
                    feedback.append("Monster ").append(inputParts[1]).append(" has been added successfully.");
                    break;
                case ADD_PLAYER:
                    addPlayer(inputParts);
                    feedback.append("Player ").append(inputParts[1]).append(" has been added successfully.");
                    break;
                case ADD_ENCOUNTER:
                    addEncounter(inputParts);
                    feedback.append("Encounter ").append(inputParts[1]).append(" has been added successfully.");
                    break;
                case DELETE:
                    creatureService.delete(inputParts[1]);
                    feedback.append("Creature ").append(inputParts[1]).append(" has been deleted successfully.");
                    break;
                case CLEAR:
                    resetCreatures(inputParts);
                    feedback.append("Creatures have been reset.");
                    break;
                case CALCULATE:
                    calculateCreatureInitiatives(inputParts);
                    Encounter encounter = encounterService.get(inputParts[1]);
                    feedback.append("Encounter: ").append(encounter.getName()).append("\n").append(printCreatures(encounter.getCreatures()));
                    break;
                case GET_CREATURES:
                    feedback.append(printCreatures(creatureService.getAll()));
                    break;
                case HELP:
                    feedback.append(Command.getCommands());
                    break;
            }
        } catch (IllegalArgumentException iae) {
            feedback.append(iae.getMessage());
        } catch (Exception e) {
            feedback.append("Invalid command (type 'help' to see a list of commands)");
        } finally {
            feedback.append("\n");
        }

        return feedback.toString();
    }

    private void addEncounter(String[] inputParts) {
        Encounter encounter = new Encounter();
        encounter.setName(inputParts[1]);
        encounterService.save(encounter);
    }

    private void resetCreatures(String[] inputParts) {
        encounterService.resetCreatures(encounterService.get(inputParts[1]));
    }

    private void calculateCreatureInitiatives(String[] inputParts) {
        encounterService.calculateCreatureInitiatives(encounterService.get(inputParts[1]));
    }

    private void addCreature(String[] inputParts) {
        updateEncounter(inputParts, new Creature(inputParts[2], parseInt(inputParts[3])));
    }

    private void addPlayer(String[] inputParts) {
        Creature player = new Creature(inputParts[2], 0);
        player.setCalculatedInitiative(parseInt(inputParts[3]));
        updateEncounter(inputParts, player);
    }

    private void updateEncounter(String[] inputParts, Creature creature) {
        Encounter encounter = encounterService.get(inputParts[1]);

        if(encounter == null) {
            throw new IllegalArgumentException("No encounter exists with id: " + inputParts[0]);
        }

        encounter.addCreature(creature);

        encounterService.save(encounter);
    }

    private String printCreatures(List<Creature> creatures) {
        StringBuilder builder = new StringBuilder();
        for (Creature creature : creatures) {
            builder.append(creatures.indexOf(creature)).append(") ").append(creature.getName()).append(" ").append(creature.getCalculatedInitiative()).append("\n");
        }

        return builder.toString();
    }
}

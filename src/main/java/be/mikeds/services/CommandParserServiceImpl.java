package be.mikeds.services;

import be.mikeds.enums.Command;
import be.mikeds.model.Creature;
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
public class CommandParserServiceImpl implements CommandParserService, Serializable {
    private static final long serialVersionUID = -368473287531627378L;

    @Autowired
    private CreatureService creatureService;

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
                case DELETE:
                    creatureService.deleteCreature(inputParts[1]);
                    feedback.append("Creature ").append(inputParts[1]).append(" has been deleted successfully.");
                    break;
                case CLEAR:
                    creatureService.resetCreatures();
                    feedback.append("Creatures have been reset.");
                    break;
                case CALCULATE:
                    feedback.append(printCreatures(creatureService.calculateInitiative()));
                    break;
                case GET_CREATURES:
                    feedback.append(printCreatures(creatureService.getCreatures()));
                    break;
                case HELP:
                    feedback.append(Command.getCommands());
                    break;
            }
        } catch (Exception e) {
            feedback.append("Invalid command (type 'help' to see a list of commands)");
        } finally {
            feedback.append("\n");
        }

        return feedback.toString();
    }

    private void addCreature(String[] inputParts) {
        Creature monster = new Creature(inputParts[1], parseInt(inputParts[2]));
        creatureService.addCreature(monster);
    }

    private void addPlayer(String[] inputParts) {
        Creature player = new Creature(inputParts[1], 0);
        player.setCalculatedInitiative(parseInt(inputParts[2]));
        creatureService.addCreature(player);
    }

    private String printCreatures(List<Creature> creatures) {
        StringBuilder builder = new StringBuilder();
        for (Creature creature : creatures) {
            builder.append(creatures.indexOf(creature)).append(") ").append(creature.getName()).append(" ").append(creature.getCalculatedInitiative()).append("\n");
        }

        return builder.toString();
    }
}

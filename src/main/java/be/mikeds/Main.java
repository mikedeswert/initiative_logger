package be.mikeds;

import be.mikeds.model.Creature;
import be.mikeds.services.DiceRollerService;
import be.mikeds.services.DiceRollerServiceImpl;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.*;


public class Main {
    private static List<Creature> creatures = new ArrayList<Creature>();
    private static List<String> commandBuffer = new ArrayList<String>();

    private static DiceRollerService diceRollerService = new DiceRollerServiceImpl();

    public static void main(String[] args) {
        boolean isApplicationRunning = true;


        do {
            System.out.println("Enter a command:");
            BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

            try {
                String line = br.readLine();
                commandBuffer.add(line);
                String[] input = line.split(" ");
                String command = input[0];

                switch (Command.valueOf(command.toUpperCase())) {
                    case ADD: addCreature(input); break;
                    case ADD_PLAYER: addPlayer(input); break;
                    case DELETE: deleteCreature(input); break;
                    case CLEAR: resetCreatureList(); break;
                    case CALCULATE: calculateInitiative(); break;
                    case EXIT: isApplicationRunning = false; break;
                }

            } catch (Exception e) {
                System.out.println("Invalid command");
            }

        } while(isApplicationRunning);
    }

    private static void deleteCreature(String[] input) {
        String name = input[1];

        Iterator<Creature> i = creatures.iterator();
        while (i.hasNext()) {
            Creature creature = i.next();
            if (creature.getName().equals(name)) {
                i.remove();
            }
        }
    }

    private static void calculateInitiative() {
        for (Creature creature : creatures) {
            if(creature.getCalculatedInitiative() == 0) {
                creature.setCalculatedInitiative(diceRollerService.roll(1, 20) + creature.getInitiative());
            }
        }

        Collections.sort(creatures, new Comparator<Creature>() {
            @Override
            public int compare(Creature o1, Creature o2) {
                return o1.getCalculatedInitiative() - o2.getCalculatedInitiative();
            }
        });

        printCalculatedInitiatives();
    }

    private static void printCalculatedInitiatives() {
        for (Creature creature : creatures) {
            System.out.println((creatures.indexOf(creature) + 1) + ") " + creature.getName() + ": " + creature.getCalculatedInitiative());
        }
    }

    private static void resetCreatureList() {
        creatures = new ArrayList<Creature>();
    }

    private static void addCreature(String[] input) {
        try {
            String name = input[1];
            int initiative = Integer.parseInt(input[2]);
            creatures.add(new Creature(name, initiative));
        } catch (Exception e) {
            System.out.println("Error parsing input, please use following formatting <command> <name> <initiative>");
        }
    }

    private static void addPlayer(String[] input) {
        try {
            String name = input[1];
            Creature player = new Creature(name, 0);
            player.setCalculatedInitiative(Integer.parseInt(input[2]));
            creatures.add(player);
        } catch (NumberFormatException e) {
            System.out.println("Error parsing input, please use following formatting <command> <name> <calculatedInitiative>");
        }
    }


}

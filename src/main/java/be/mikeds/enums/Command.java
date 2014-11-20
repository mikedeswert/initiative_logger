package be.mikeds.enums;

import static com.sun.org.apache.xalan.internal.lib.ExsltStrings.padding;

/**
 * --------------------------------
 * Created by mikeds on 17/08/2014.
 * --------------------------------
 */
public enum Command {
    ADD("<encounter> <name> <initiative>", "Add a monster with given <name> and <initiative> to the creature list of given <encounter>."),
    ADD_PLAYER("<encounter> <name> <calculated initiative>", "Add a player with given <name> and <calculated initiative> from the creature list of given <encounter>."),
    ADD_ENCOUNTER("<name>", "Add an encounter with given <name>"),
    DELETE("<name>", "Delete all creatures with given <name> from the creature list."),
    CLEAR("", "Clear all creatures from the list."),
    CALCULATE("", "Calculates the initiatives for all creatures and returns a sorted list."),
    HELP("", "Returns a list of available commands."),
    GET_CREATURES("", "Returns a list of all creatures."),
    EXIT("", "Exits the program. Does nothing for the web application.");

    private String arguments;
    private String helpText;

    Command(String arguments, String helpText) {
        this.arguments = arguments;
        this.helpText = helpText;
    }

    public static String getCommands() {
        StringBuilder builder = new StringBuilder();

        for (Command command : Command.values()) {
            builder.append(String.format("%-15s", command))
                   .append(String.format("%-31s\n", command.getArguments()))
                   .append(padding(15))
                   .append(command.getHelpText())
                   .append("\n");
        }

        return builder.toString();
    }

    public String getArguments() {
        return arguments;
    }

    public String getHelpText() {
        return helpText;
    }
}

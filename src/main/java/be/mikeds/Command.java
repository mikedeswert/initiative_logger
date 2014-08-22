package be.mikeds;

/**
 * --------------------------------
 * Created by mikeds on 17/08/2014.
 * --------------------------------
 */
public enum Command {
    ADD("add"),
    ADD_PLAYER("add player"),
    DELETE("delete"),
    CLEAR("clear"),
    CALCULATE("calc"),
    EXIT("exit");

    private String command;

    Command(String command) {
        this.command = command;
    }

    public String getCommand() {
        return command;
    }
}

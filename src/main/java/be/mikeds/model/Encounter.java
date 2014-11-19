package be.mikeds.model;

import java.util.Collections;
import java.util.List;

/**
 * --------------------------------
 * Created by mikeds on 18/11/2014.
 * --------------------------------
 */
public class Encounter {
    private Board board;
    private List<Creature> creatures;

    public Board getBoard() {
        return board;
    }

    public void setBoard(Board board) {
        this.board = board;
    }

    public List<Creature> getCreatures() {
        return Collections.unmodifiableList(creatures);
    }

    public void setCreatures(List<Creature> creatures) {
        this.creatures = creatures;
    }

    public void addCreature(Creature creature) {
        creatures.add(creature);
    }
}

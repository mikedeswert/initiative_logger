package be.mikeds.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Collections;
import java.util.List;

/**
 * --------------------------------
 * Created by mikeds on 18/11/2014.
 * --------------------------------
 */
@Document(collection = "encounters")
public class Encounter {
    @Id
    private String id;

    private Board board;
    private List<Creature> creatures;
    private String name;

    public Encounter() {}

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Board getBoard() {
        return board;
    }

    public void setBoard(Board board) {
        this.board = board;
    }

    public List<Creature> getCreatures() {
        return creatures;
    }

    public void setCreatures(List<Creature> creatures) {
        this.creatures = creatures;
    }

    public void addCreature(Creature creature) {
        creatures.add(creature);
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}

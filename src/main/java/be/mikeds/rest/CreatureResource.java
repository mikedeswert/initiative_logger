package be.mikeds.rest;

import be.mikeds.model.Creature;
import be.mikeds.services.CreatureService;
import com.google.inject.Inject;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;

import static javax.ws.rs.core.MediaType.APPLICATION_JSON;

/**
 * --------------------------------
 * Created by mikeds on 17/08/2014.
 * --------------------------------
 */
@Path("/creature")
public class CreatureResource {

    private CreatureService creatureService;

    @Inject
    public CreatureResource(final CreatureService creatureService)
    {
        this.creatureService = creatureService;
    }

    @GET
    @Path("/")
    @Produces(APPLICATION_JSON)
    public List<Creature> getCreatures() {
        return creatureService.getCreatures();
    }

    @POST
    @Path("/addMonster")
    public void addMonster(@QueryParam("name") String name, @QueryParam("initiative") int initiative) {
        creatureService.addCreature(new Creature(name, initiative));
    }

    @POST
    @Path("/addPlayer")
    public void addPlayer(@QueryParam("name") String name, @QueryParam("calculatedInitiative") int calculatedInitiative) {
        Creature player = new Creature(name);
        player.setCalculatedInitiative(calculatedInitiative);
        creatureService.addCreature(player);
    }

    @POST
    @Path("/delete/{name}")
    public void delete(@PathParam("name") String name) {
        creatureService.deleteCreature(name);
    }

    @POST
    @Path("/reset")
    public void resetCreatures() {
        creatureService.resetCreatures();
    }

    @GET
    @Path("/calculate")
    @Produces(APPLICATION_JSON)
    public List<Creature> calculateInitiative() {
        return creatureService.calculateInitiative();
    }

    @POST
    @Path("/next")
    public void nextTurn() {
        creatureService.shiftCreaturesLeft();
    }
}


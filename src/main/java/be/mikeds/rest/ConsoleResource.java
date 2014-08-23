package be.mikeds.rest;

import be.mikeds.model.Creature;
import be.mikeds.services.CommandParserService;
import be.mikeds.services.CreatureService;
import com.google.inject.Inject;

import javax.ws.rs.*;
import java.util.List;

import static javax.ws.rs.core.MediaType.APPLICATION_JSON;

/**
 * --------------------------------
 * Created by mikeds on 17/08/2014.
 * --------------------------------
 */
@Path("/console")
public class ConsoleResource {

    private CommandParserService commandParserService;

    @Inject
    public ConsoleResource(final CommandParserService commandParserService)
    {
        this.commandParserService = commandParserService;
    }

    @POST
    @Path("/send")
    @Produces(APPLICATION_JSON)
    public String enterCommand(@QueryParam("input") String input) {
        return commandParserService.parseCommand(input);
    }
}


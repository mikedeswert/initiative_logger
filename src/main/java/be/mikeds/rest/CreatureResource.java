package be.mikeds.rest;

import be.mikeds.enums.CreatureType;
import be.mikeds.factories.CreatureFactory;
import be.mikeds.websockets.annotations.NotifyClients;
import be.mikeds.model.Creature;
import be.mikeds.services.CreatureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * --------------------------------
 * Created by mikeds on 17/08/2014.
 * --------------------------------
 */
@Controller
@RequestMapping("/rest/creature")
public class CreatureResource {

    @Autowired
    private CreatureService creatureService;

    @Autowired
    private CreatureFactory creatureFactory;

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public @ResponseBody List<Creature> getCreatures() {
        return creatureService.getAll();
    }

    @RequestMapping(value = "/add/{type}/name/{name}/initiative/{initiative}", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @NotifyClients
    public void addMonster(@PathVariable("type") String type, @PathVariable("name") String name, @PathVariable("initiative") int initiative) {
        creatureService.save(creatureFactory.create(CreatureType.fromString(type), name, initiative));
    }

    @RequestMapping(value = "/update", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @NotifyClients
    public void updateCreature(@RequestBody Creature creature) {
        creatureService.save(creature);
    }

    @RequestMapping(value = "/delete/{id}", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @NotifyClients
    public void deleteCreature(@PathVariable("id") String id) {
        creatureService.delete(id);
    }

    @RequestMapping(value = "/delete/all", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @NotifyClients
    public void deleteAllCreatures() {
        creatureService.deleteAll();
    }

    @RequestMapping(value = "/{id}/incrementTurnCount", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @NotifyClients
    public void incrementCreatureTurnCount(@PathVariable String id) {
        creatureService.incrementTurnCount(id);
    }
}


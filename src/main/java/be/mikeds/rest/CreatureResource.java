package be.mikeds.rest;

import be.mikeds.aspects.NotifyClients;
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


    @RequestMapping(value = "/", method = RequestMethod.GET)
    public @ResponseBody List<Creature> getCreatures() {
        return creatureService.getCreatures();
    }

    @RequestMapping(value = "/addMonster", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @NotifyClients
    public void addMonster(@RequestParam("name") String name, @RequestParam("initiative") int initiative) {
        creatureService.addCreature(new Creature(name, initiative));
    }

    @RequestMapping(value = "/addPlayer", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @NotifyClients
    public void addPlayer(@RequestParam("name") String name, @RequestParam("calculatedInitiative") int calculatedInitiative) {
        Creature player = new Creature(name);
        player.setImageSource("img/" + name.toLowerCase() + ".jpg");
        player.setCalculatedInitiative(calculatedInitiative);
        creatureService.addCreature(player);
    }

    @RequestMapping(value = "/update", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @NotifyClients
    public void updateCreature(@RequestBody Creature creature) {
        creatureService.updateCreature(creature);
    }

    @RequestMapping(value = "/delete/{id}", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @NotifyClients
    public void deleteCreature(@PathVariable("id") String id) {
        creatureService.deleteCreature(id);
    }

    @RequestMapping(value = "/{id}/incrementTurnCount", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @NotifyClients
    public void incrementCreatureTurnCount(@PathVariable String id) {
        creatureService.incrementCreatureTurnCount(id);
    }
}


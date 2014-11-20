package be.mikeds.rest;

import be.mikeds.aspects.NotifyClients;
import be.mikeds.model.Encounter;
import be.mikeds.services.EncounterService;
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
@RequestMapping("/rest/encounter")
public class EncounterResource {

    @Autowired
    private EncounterService encounterService;


    @RequestMapping(value = "/", method = RequestMethod.GET)
    public @ResponseBody List<Encounter> getEncounters() {
        return encounterService.getEncounters();
    }

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @NotifyClients
    public void addEncounter(@RequestBody Encounter encounter) {
        encounterService.addEncounter(encounter);
    }

    @RequestMapping(value = "/update", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @NotifyClients
    public void updateEncounter(@RequestBody Encounter encounter) {
        encounterService.updateEncounter(encounter);
    }

    @RequestMapping(value = "/delete/{id}", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @NotifyClients
    public void deleteEncounter(@PathVariable("id") String id) {
        encounterService.deleteEncounter(id);
    }

    @RequestMapping(value = "/reset", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @NotifyClients
    public void resetCreatures(@RequestBody Encounter encounter) {
        encounterService.resetCreatures(encounter);
    }

    @RequestMapping(value = "/calculate", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @NotifyClients
    public void calculateCreatureInitiatives(@RequestBody Encounter encounter) {
        encounterService.calculateCreatureInitiatives(encounter);
    }
}


package be.mikeds.rest;

import be.mikeds.aspects.NotifyClients;
import be.mikeds.model.Encounter;
import be.mikeds.services.EncounterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

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

    @NotifyClients
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @RequestMapping(value = "/add", method = RequestMethod.POST, consumes = APPLICATION_JSON_VALUE)
    public void addEncounter(@RequestBody Encounter encounter) {
        encounterService.addEncounter(encounter);
    }

    @NotifyClients
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @RequestMapping(value = "/update", method = RequestMethod.POST, consumes = APPLICATION_JSON_VALUE)
    public void updateEncounter(@RequestBody Encounter encounter) {
        encounterService.updateEncounter(encounter);
    }

    @NotifyClients
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @RequestMapping(value = "/delete/{id}", method = RequestMethod.POST)
    public void deleteEncounter(@PathVariable("id") String id) {
        encounterService.deleteEncounter(id);
    }

    @NotifyClients
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @RequestMapping(value = "/reset", method = RequestMethod.POST, consumes = APPLICATION_JSON_VALUE)
    public void resetCreatures(@RequestBody Encounter encounter) {
        encounterService.resetCreatures(encounter);
    }

    @NotifyClients
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @RequestMapping(value = "/calculate", method = RequestMethod.POST, consumes = APPLICATION_JSON_VALUE)
    public void calculateCreatureInitiatives(@RequestBody Encounter encounter) {
        encounterService.calculateCreatureInitiatives(encounter);
    }
}


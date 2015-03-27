package be.mikeds.rest;

import be.mikeds.model.Board;
import be.mikeds.model.BoardTemplate;
import be.mikeds.services.BoardService;
import be.mikeds.services.BoardTemplateService;
import be.mikeds.websockets.annotations.NotifyClients;
import be.mikeds.model.Encounter;
import be.mikeds.services.EncounterService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

    @Autowired
    private BoardTemplateService boardTemplateService;

    @Autowired
    private BoardService boardService;

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public @ResponseBody List<Encounter> getEncounters() {
        return encounterService.getAll();
    }

    @NotifyClients
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @RequestMapping(value = "/add/template/{templateId}", method = RequestMethod.POST, consumes = APPLICATION_JSON_VALUE)
    public void addEncounter(@RequestBody Encounter encounter, @PathVariable("templateId") String templateId) {
        assignNewBoard(encounter, templateId);
        encounterService.save(encounter);
    }

    @NotifyClients
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @RequestMapping(value = "/update/template/{templateId}", method = RequestMethod.POST, consumes = APPLICATION_JSON_VALUE)
    public void updateEncounter(@RequestBody Encounter encounter, @PathVariable("templateId") String templateId) {
        if(needsNewBoard(encounter, templateId)) {
            cleanUpOldBoard(encounter);
            assignNewBoard(encounter, templateId);
        }

        encounterService.save(encounter);
    }

    @NotifyClients
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @RequestMapping(value = "/delete/{id}", method = RequestMethod.POST)
    public void deleteEncounter(@PathVariable("id") String id) {
        encounterService.delete(id);
    }

    @NotifyClients
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @RequestMapping(value = "/delete/all", method = RequestMethod.POST)
    public void deleteAllEncounters() {
        encounterService.deleteAll();
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

    private boolean needsNewBoard(Encounter encounter, String templateId) {
        return !StringUtils.equals(encounter.getBoard().getBoardTemplate().getId(), templateId);
    }

    private void assignNewBoard(Encounter encounter, String templateId) {
        BoardTemplate newBoardTemplate = boardTemplateService.get(templateId);
        encounter.setBoard(newBoardTemplate.newBoardInstance());
        boardTemplateService.save(newBoardTemplate);
    }

    private void cleanUpOldBoard(Encounter encounter) {
        BoardTemplate oldBoardTemplate = boardTemplateService.get(encounter.getBoard().getBoardTemplate().getId());

        if(oldBoardTemplate != null) {
            oldBoardTemplate.removeBoardInstance(encounter.getBoard());
            boardTemplateService.save(oldBoardTemplate);
        }

        boardService.delete(encounter.getBoard().getId());
    }
}


package be.mikeds.rest;

import be.mikeds.model.BoardTemplate;
import be.mikeds.services.BoardTemplateService;
import be.mikeds.websockets.annotations.NotifyClients;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

/**
 * --------------------------------
 * Created by mikeds on 27/03/2015.
 * --------------------------------
 */
@Controller
@RequestMapping("/rest/boardtemplate")
public class BoardTemplateResource {
    @Autowired
    private BoardTemplateService boardTemplateService;

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public @ResponseBody
    List<BoardTemplate> getBoardTemplates() {
        return boardTemplateService.getAll();
    }

    @NotifyClients
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @RequestMapping(value = "/add", method = RequestMethod.POST, consumes = APPLICATION_JSON_VALUE)
    public void addBoardTemplate(@RequestBody BoardTemplate boardTemplate) {
        boardTemplateService.save(boardTemplate);
    }

    @NotifyClients
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @RequestMapping(value = "/update", method = RequestMethod.POST, consumes = APPLICATION_JSON_VALUE)
    public void updateEncounter(@RequestBody BoardTemplate updatedBoardTemplate) {
        BoardTemplate boardTemplate = boardTemplateService.get(updatedBoardTemplate.getId());
        boardTemplate.update(updatedBoardTemplate);

        boardTemplateService.save(boardTemplate);
    }

    @NotifyClients
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @RequestMapping(value = "/delete/{id}", method = RequestMethod.POST)
    public void deleteEncounter(@PathVariable("id") String id) {
        boardTemplateService.delete(id);
    }
}

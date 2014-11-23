package be.mikeds.rest;

import be.mikeds.websockets.annotations.NotifyClients;
import be.mikeds.services.CommandParserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * --------------------------------
 * Created by mikeds on 17/08/2014.
 * --------------------------------
 */
@Controller
@RequestMapping("/rest/console")
public class ConsoleResource {

    @Autowired
    private CommandParserService commandParserService;

    @RequestMapping(value = "/send", method = RequestMethod.POST)
    @NotifyClients
    public @ResponseBody String enterCommand(@RequestParam("input") String input) {
        return commandParserService.parseCommand(input);
    }
}


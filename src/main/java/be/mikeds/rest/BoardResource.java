package be.mikeds.rest;

import be.mikeds.websockets.annotations.NotifyClients;
import be.mikeds.model.Board;
import be.mikeds.model.Token;
import be.mikeds.services.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

/**
 * --------------------------------
 * Created by mikeds on 24/08/2014.
 * --------------------------------
 */
@Controller
@RequestMapping("/rest/board")
public class BoardResource {

    @Autowired
    private BoardService boardService;

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public @ResponseBody Board getBoard() {
        return boardService.getBoard();
    }

    @RequestMapping(value = "/addToken", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @NotifyClients
    public void addToken(Token token, @RequestParam("positionX") int positionX, @RequestParam("positionY") int positionY) {
        boardService.addToken(token, positionX, positionY);
    }

}

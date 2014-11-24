package be.mikeds.rest;

import be.mikeds.websockets.annotations.NotifyClients;
import be.mikeds.model.Board;
import be.mikeds.model.Token;
import be.mikeds.services.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public @ResponseBody List<Board> getBoards() {
        return boardService.getBoards();
    }

    @RequestMapping(value = "/update", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @NotifyClients
    public void updateBoard(@RequestBody Board board) {
        boardService.updateBoard(board);
    }

    @RequestMapping(value = "/delete/all", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @NotifyClients
    public void deleteBoards() {
        boardService.deleteBoards();
    }

}

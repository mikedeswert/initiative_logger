package be.mikeds.rest;

import be.mikeds.model.Board;
import be.mikeds.model.Token;
import be.mikeds.services.BoardService;
import com.google.inject.Inject;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

import static javax.ws.rs.core.MediaType.APPLICATION_JSON;

/**
 * --------------------------------
 * Created by mikeds on 24/08/2014.
 * --------------------------------
 */
@Path("/board")
public class BoardResource {

    private BoardService boardService;

    @Inject
    public BoardResource(BoardService boardService) {
        this.boardService = boardService;
    }

    @GET
    @Path("/")
    @Produces(APPLICATION_JSON)
    public Board getBoard() {
        return boardService.getBoard();
    }

    @POST
    @Path("/addToken")
    @Consumes(APPLICATION_JSON)
    public void addToken(Token token, @QueryParam("positionX") int positionX, @QueryParam("positionY") int positionY) {
        boardService.addToken(token, positionX, positionY);
    }

}

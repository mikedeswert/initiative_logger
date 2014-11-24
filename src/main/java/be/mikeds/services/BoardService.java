package be.mikeds.services;

import be.mikeds.model.Board;
import be.mikeds.model.Token;

/**
 * --------------------------------
 * Created by mikeds on 24/08/2014.
 * --------------------------------
 */
public interface BoardService {
    void updateBoard(Board board);

    Board getBoard();
}

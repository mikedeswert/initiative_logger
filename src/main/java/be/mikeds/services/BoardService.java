package be.mikeds.services;

import be.mikeds.model.Board;
import be.mikeds.model.Token;

import java.util.List;

/**
 * --------------------------------
 * Created by mikeds on 24/08/2014.
 * --------------------------------
 */
public interface BoardService {
    Board getBoard();
    List<Board> getBoards();
    void updateBoard(Board board);
    void deleteBoards();
}

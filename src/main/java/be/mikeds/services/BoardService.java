package be.mikeds.services;

import be.mikeds.model.Board;
import be.mikeds.model.Token;

/**
 * --------------------------------
 * Created by mikeds on 24/08/2014.
 * --------------------------------
 */
public interface BoardService {
    void addToken(Token token, int positionX, int positionY);

    Board getBoard();
}

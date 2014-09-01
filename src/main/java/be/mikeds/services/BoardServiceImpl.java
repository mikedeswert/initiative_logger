package be.mikeds.services;

import be.mikeds.model.Board;
import be.mikeds.model.Token;

/**
 * --------------------------------
 * Created by mikeds on 24/08/2014.
 * --------------------------------
 */
public class BoardServiceImpl implements BoardService {
    public static final int DEFAULT_SIZE = 20;

    private Board board = new Board(DEFAULT_SIZE);

    public BoardServiceImpl() {
        board.initialize();
    }

    @Override
    public void addToken(Token token, int positionX, int positionY) {
        board.addToken(token, positionX, positionY);
    }

    @Override
    public Board getBoard() {
        return board;
    }
}

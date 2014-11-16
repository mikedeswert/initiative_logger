package be.mikeds.services;

import be.mikeds.model.Board;
import be.mikeds.model.Token;
import org.springframework.stereotype.Service;

import java.io.Serializable;

/**
 * --------------------------------
 * Created by mikeds on 24/08/2014.
 * --------------------------------
 */
@Service
public class BoardServiceImpl implements BoardService, Serializable {
    private static final long serialVersionUID = 8749172023007897575L;
    protected static final int DEFAULT_SIZE = 20;

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

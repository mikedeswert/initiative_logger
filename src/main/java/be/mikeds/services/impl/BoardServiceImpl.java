package be.mikeds.services.impl;

import be.mikeds.model.Board;
import be.mikeds.repositories.BoardRepository;
import be.mikeds.services.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * --------------------------------
 * Created by mikeds on 24/08/2014.
 * --------------------------------
 */
@Service
public class BoardServiceImpl implements BoardService {
    protected static final int DEFAULT_SIZE = 20;

    @Autowired
    private BoardRepository boardRepository;

    public BoardServiceImpl() {

    }

    @Override
    public Board getBoard() {
        if (boardRepository.findAll().size() == 0) {
            Board board = new Board(DEFAULT_SIZE);
            board.initialize();
            board.setName("Default board");
            boardRepository.save(board);
        }

        return boardRepository.findAll().get(0);
    }

    @Override
    public List<Board> getBoards() {
        if (boardRepository.findAll().size() == 0) {
            Board board = new Board(DEFAULT_SIZE);
            board.initialize();
            board.setName("Default board");
            boardRepository.save(board);
        }

        return boardRepository.findAll();
    }

    @Override
    public void updateBoard(Board board) {
        boardRepository.save(board);
    }

    @Override
    public void deleteBoards() {
        boardRepository.deleteAll();
    }
}


package be.mikeds.services.impl;

import be.mikeds.model.Board;
import be.mikeds.repositories.BoardRepository;
import be.mikeds.services.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * --------------------------------
 * Created by mikeds on 24/08/2014.
 * --------------------------------
 */
@Service
public class BoardServiceImpl extends ServiceImpl<Board> implements BoardService {
    protected static final int DEFAULT_SIZE = 20;

    @Autowired
    private BoardRepository boardRepository;

    @Override
    public Board get(String id) {
        if (getRepository().findAll().size() == 0) {
            Board board = new Board(DEFAULT_SIZE);
            board.setName("Default board");
            getRepository().save(board);
        }

        return getRepository().findAll().get(0);
    }

    @Override
    public List<Board> getAll() {
        if (getRepository().findAll().size() == 0) {
            Board board = new Board(DEFAULT_SIZE);
            board.setName("Default board");
            getRepository().save(board);
        }

        return getRepository().findAll();
    }

    @Override
    MongoRepository<Board, String> getRepository() {
        return boardRepository;
    }
}


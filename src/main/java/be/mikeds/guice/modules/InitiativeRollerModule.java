package be.mikeds.guice.modules;

import be.mikeds.rest.BoardResource;
import be.mikeds.rest.ConsoleResource;
import be.mikeds.rest.CreatureResource;
import be.mikeds.services.*;
import be.mikeds.socket.NotifySocket;
import com.google.inject.AbstractModule;
import com.google.inject.Binder;
import com.google.inject.Module;

/**
 * --------------------------------
 * Created by mikeds on 18/08/2014.
 * --------------------------------
 */
public class InitiativeRollerModule implements Module {
    @Override
    public void configure(final Binder binder) {
        binder.bind(CreatureService.class).to(CreatureServiceImpl.class);
        binder.bind(DiceRollerService.class).to(DiceRollerServiceImpl.class);
        binder.bind(CommandParserService.class).to(CommandParserServiceImpl.class);
        binder.bind(BoardService.class).to(BoardServiceImpl.class);
        binder.bind(CreatureResource.class);
        binder.bind(ConsoleResource.class);
        binder.bind(BoardResource.class);
        binder.bind(NotifySocket.class);
    }
}

package be.mikeds.guice.modules;

import be.mikeds.rest.CreatureResource;
import be.mikeds.services.CreatureService;
import be.mikeds.services.CreatureServiceImpl;
import be.mikeds.services.DiceRollerService;
import be.mikeds.services.DiceRollerServiceImpl;
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
        binder.bind(CreatureResource.class);
    }
}

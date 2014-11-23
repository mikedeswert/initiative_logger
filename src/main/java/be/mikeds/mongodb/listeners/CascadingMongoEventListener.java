package be.mikeds.mongodb.listeners;

import be.mikeds.mongodb.annotations.CascadeSave;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.annotation.Id;
import org.springframework.data.mapping.model.MappingException;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.event.AbstractMongoEventListener;
import org.springframework.util.ReflectionUtils;

import java.lang.reflect.Field;

/**
 * --------------------------------
 * Created by mikeds on 22/11/2014.
 * --------------------------------
 */
public class CascadingMongoEventListener extends AbstractMongoEventListener {
    @Autowired
    private MongoOperations mongoOperations;

    @Override
    public void onBeforeConvert(final Object source) {
        ReflectionUtils.doWithFields(source.getClass(), field -> {
            ReflectionUtils.makeAccessible(field);

            if (field.isAnnotationPresent(DBRef.class) && field.isAnnotationPresent(CascadeSave.class)){
                final Object fieldValue = field.get(source);

                DbRefFieldCallback callback = new DbRefFieldCallback();

                if(!(fieldValue instanceof Iterable)) {
                    ReflectionUtils.doWithFields(fieldValue.getClass(), callback);

                    if (!callback.isIdFound()) {
                        throw new MappingException("Cannot perform cascade save on child object without id set");
                    }
                }

                DbRefField dbRefField = DbRefFieldFactory.createDbRefField(mongoOperations, fieldValue);
                dbRefField.save();
            }
        });
    }

    private static class DbRefFieldCallback implements ReflectionUtils.FieldCallback {
        private boolean idFound;

        public void doWith(Field field) throws IllegalArgumentException, IllegalAccessException {
            ReflectionUtils.makeAccessible(field);

            if (field.isAnnotationPresent(Id.class)) {
                idFound = true;
            }
        }

        public boolean isIdFound() {
            return idFound;
        }
    }

    private static class DbRefFieldFactory {
        public static DbRefField createDbRefField(MongoOperations mongoOperations, Object fieldValue) {
            if(fieldValue instanceof Iterable) {
                return new IterableDbRefField(mongoOperations, (Iterable<Object>) fieldValue);
            }

            return new NonIterableDbRefField(mongoOperations, fieldValue);
        }
    }

    private interface DbRefField {
        void save();
    }

    private static class IterableDbRefField implements DbRefField {

        private MongoOperations mongoOperations;

        private Iterable<Object> fieldValue;

        public IterableDbRefField(MongoOperations mongoOperations, Iterable<Object> fieldValue) {
            this.mongoOperations = mongoOperations;
            this.fieldValue = fieldValue;
        }

        @Override
        public void save() {
            for (Object object : fieldValue) {
                mongoOperations.save(object);
            }
        }
    }

    private static class NonIterableDbRefField implements DbRefField {

        private MongoOperations mongoOperations;

        private Object fieldValue;

        public NonIterableDbRefField(MongoOperations mongoOperations, Object fieldValue) {
            this.mongoOperations = mongoOperations;
            this.fieldValue = fieldValue;
        }

        @Override
        public void save() {
            mongoOperations.save(fieldValue);
        }
    }
}

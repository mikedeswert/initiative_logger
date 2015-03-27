package be.mikeds.enums;

import org.apache.commons.lang3.StringUtils;

/**
 * --------------------------------
 * Created by mikeds on 27/03/2015.
 * --------------------------------
 */
public enum CreatureType {
    PLAYER("player"),
    MONSTER("monster");

    private final String value;

    CreatureType(String value) {
        this.value = value;
    }

    public static CreatureType fromString(String creatureTypeString) {
        for (CreatureType creatureType : CreatureType.values()) {
            if(StringUtils.equals(creatureType.toString(), creatureTypeString)) {
                return creatureType;
            }
        }

        throw new IllegalArgumentException("Argument " + creatureTypeString + " passed to method does not match any of the creature types.");
    }

    @Override
    public String toString() {
        return value;
    }
}

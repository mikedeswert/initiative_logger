package be.mikeds.rest;

import be.mikeds.enums.Orientation;
import be.mikeds.enums.TileType;
import be.mikeds.model.Board;
import be.mikeds.model.Tile;
import be.mikeds.services.BoardService;
import be.mikeds.websockets.annotations.NotifyClients;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

/**
 * --------------------------------
 * Created by mikeds on 16/02/2015.
 * --------------------------------
 */
@Controller
@RequestMapping("/rest/tile")
public class TileResource {

    @RequestMapping(value = "/types", method = RequestMethod.GET)
    public @ResponseBody List<String> getTileTypes() {
        List<String> tileTypes = new ArrayList<>();

        for (TileType tileType : TileType.values()) {
            tileTypes.add(tileType.toString());
        }
        return tileTypes;
    }

    @RequestMapping(value = "/orientations", method = RequestMethod.GET)
    public @ResponseBody List<String> getOrientations() {
        List<String> orientations = new ArrayList<>();

        for (Orientation orientation : Orientation.values()) {
            orientations.add(orientation.toString());
        }
        return orientations;
    }


}

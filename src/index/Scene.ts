import { property, subclass } from "esri/core/accessorSupport/decorators";
import SceneView from "esri/views/SceneView";
import Map = require("esri/Map");
import { countries, hillshade, pois, tracks2D, tracks3D, water } from "./layers";
import { Section } from "./constants";
import Accessor = require("esri/core/Accessor");
import Color = require("esri/Color");

const map = new Map({
  ground: "world-elevation",
  layers: [countries, hillshade, water, pois, tracks2D, tracks3D]
});

map.ground.surfaceColor = new Color("#5D5D5D");

const view = new SceneView({
  container: "viewDiv",
  // viewingMode: "local",
  // clippingArea,
  map,
  camera: Section.ALL.camera,

  // qualityProfile: "high",

  environment: {
    background: {
      type: "color",
      color: [20, 20, 20]
    },
    atmosphereEnabled: false,
    starsEnabled: false
  },
  highlightOptions: {
    // color: fadedColor,
    fillOpacity: 1,
    haloOpacity: 0
  }
  // padding: {
  // top: 80,
  // left: 100,
  // }
});

view.ui.remove(["navigation-toggle", "compass", "zoom"]);

class Scene extends Accessor {
  @property()
  view = view;

  clearHighlight = () => {};

  async highlightTracks3D(color: Color) {
    this.clearHighlight();
    view.highlightOptions.color = color;
    const lv = await view.whenLayerView(tracks3D);
    this.clearHighlight = lv.highlight(tracks3D.graphics.toArray()).remove;
  }
}

export const scene = new Scene();

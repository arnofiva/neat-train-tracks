import "./style.scss";

import Camera = require("esri/Camera");
import VectorTileLayer = require("esri/layers/VectorTileLayer");
import TileLayer = require("esri/layers/TileLayer");
import Color = require("esri/Color");
import Polyline = require("esri/geometry/Polyline");
import TextSymbol3DLayer = require("esri/symbols/TextSymbol3DLayer");
import LabelSymbol3D = require("esri/symbols/LabelSymbol3D");
import LabelClass = require("esri/layers/support/LabelClass");
import LineSymbol3DLayer = require("esri/symbols/LineSymbol3DLayer");
import FillSymbol3DLayer = require("esri/symbols/FillSymbol3DLayer");
import PolygonSymbol3D = require("esri/symbols/PolygonSymbol3D");
import LineSymbol3D = require("esri/symbols/LineSymbol3D");
import SimpleRenderer = require("esri/renderers/SimpleRenderer");
import Map = require("esri/Map");
import FeatureLayer = require("esri/layers/FeatureLayer");
import SceneView = require("esri/views/SceneView");
import GraphicsLayer = require("esri/layers/GraphicsLayer");
import Graphic = require("esri/Graphic");

import simplify = require("simplify");
import ElevationProfile = require("esri/widgets/ElevationProfile");
import ElevationProfileLineInput = require("esri/widgets/ElevationProfile/ElevationProfileLineInput");
import ElevationProfileViewModel = require("esri/widgets/ElevationProfile/ElevationProfileViewModel");
import promiseUtils = require("esri/core/promiseUtils");
import watchUtils = require("esri/core/watchUtils");


// Blue - Green

// const slowColor = new Color("#00c8ff");
// const slowColorFaded = new Color("#1385a4");
// const fadedColor = "gray"; // new Color("#3f4547");
// const fastColorFaded = new Color("#7ea018");
// const fastColor = new Color("#b4f000");

// Blue - Green


// const slowColor = new Color("#0080ff");
// const slowColorFaded = new Color("#005bb2");

// const fadedColor = new Color("#808080");

// const fastColorFaded = new Color("#007f00");
// const fastColor = new Color("#00ff00");

// Orange - Green

const slowColor = new Color("#ff7d00");
const slowColorFaded = new Color("#9b5c20");

const fadedColor = new Color("#808080");
const fastColorFaded = new Color("#007f00");
const fastColor = new Color("#00ff00");

// Blue - Orange

// const slowColor = new Color("#6ca0ff");
// const slowColorFaded = new Color("#4c689b");
// const fadedColor = new Color("#343a45");
// const fastColorFaded = new Color("#a4861c");
// const fastColor = new Color("#ffc700");

// Blue - Red

// const slowColor = new Color("#66a0ff");
// const slowColorFaded = new Color("#4c6da5");
// const fadedColor = new Color("#3b312c");
// const fastColorFaded = new Color("#9c461e");
// const fastColor = new Color("#ff6219");

// Blue - Red

// const slowColor = new Color("#6690ff");
// const slowColorFaded = new Color("#526aad");
// const fadedColor = new Color("#808080");
// const fastColorFaded = new Color("#a22343");
// const fastColor = new Color("#ff0040");

// fadedColor.a = 0.8;

const camera = new Camera({
  position: {
    longitude: 7.0337771,
    latitude: 45.12086495,
    z: 159916.61637
  },
  heading: 48.74,
  tilt: 51.89
});

const hillshade = new TileLayer({
  portalItem: { id: "428539ef9cab4017b69d15a40a9ee98b" } // Dark
  // portalItem: { id: "1b243539f4514b6ba35e7d995890db1d" } // Light
});

const water = new VectorTileLayer({
  portalItem: { id: "cd266578c33f4724acb93b9fff57cbb6" }
});

const pois = new FeatureLayer({
  visible: false,
  portalItem: {
    id: "7ad19e912ce84d138ca6544610fa9643"
  },
  labelingInfo: [
    new LabelClass({
      labelExpressionInfo: {
        expression: "$feature.Label"
      },
      symbol: new LabelSymbol3D({
        symbolLayers: [
          new TextSymbol3DLayer({
            material: { color: [255, 255, 255] },
            size: 12,
            halo: {
              color: [30, 30, 30, 0.8], // autocasts as Color
              size: 1.5
            }
          })
        ],
        callout: {
          type: "line", // autocasts as new LineCallout3D()
          size: 1.5,
          color: [150, 150, 150],
          border: {
            color: [50, 50, 50]
          }
        },
        verticalOffset: {
          screenLength: 40,
          maxWorldLength: 100,
          minWorldLength: 20
        }
      })
    })
  ]
});

const countries = new FeatureLayer({
  portalItem: {
    // id: "ac80670eb213440ea5899bbf92a04998" // Detailed
    id: "2b93b06dc0dc4e809d3c8db5cb96ba69" // Generalized
  },
  popupEnabled: false,
  definitionExpression: "Country in ('Switzerland')",
  renderer: new SimpleRenderer({
    symbol: new PolygonSymbol3D({
      symbolLayers: [
        new FillSymbol3DLayer({
          outline: {
            color: [180, 180, 180],
            size: 2.5
          }
        })
      ]
    })
  })
});

const offset = 0;

const tracksLayer = new FeatureLayer({
  portalItem: {
    id: "cec8a4790ccc4727bf54fa6e86a4d26c",
  },
});

const tracks3D = new GraphicsLayer({
  title: "3D Tracks",
  elevationInfo: {
    mode: "absolute-height"
  }
});

const tracks2D = new GraphicsLayer({
  title: "2D Tracks",
  elevationInfo: {
    mode: "on-the-ground"
  },
  opacity: 0.5
  // visible: false
});

const map = new Map({
  basemap: "topo-vector",
  ground: "world-elevation",
  layers: [countries, hillshade, water, tracks2D, tracks3D]
});

// map.ground.surfaceColor = new Color("black");
// map.ground.opacity = 0.8;



const view = new SceneView({
  container: "viewDiv",
  // viewingMode: "local",
  // clippingArea,
  map,
  camera,

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
    color: fadedColor,
    fillOpacity: 1,
    haloOpacity: 0
  }
  // padding: {
  // top: 80,
  // left: 100,
  // }
});

view.ui.remove(["navigation-toggle", "compass", "zoom"]);
view.ui.add("trackSwitch", "top-right");
view.ui.add("segments", "bottom-left");

// Simplify
view.when().then(async () => {

  view.popup.defaultPopupTemplateEnabled = true;
  view.popup.autoOpenEnabled = true;
  view.popup.dockEnabled = true;
  view.popup.dockOptions = {
    position: "bottom-left"
  };

  await tracksLayer.load();

  const tracksQuery = tracksLayer.createQuery();
  tracksQuery.returnGeometry = true;
  tracksQuery.returnZ = true;
  tracksQuery.orderByFields = ["PathIndex"];
  const result = await tracksLayer.queryFeatures(tracksQuery);

  let currentTrack = new Graphic();

  const tracks: Graphic[] = [];

  function mergeTracks(trackA: Graphic, trackB: Graphic, createNew = false) {
    const pathA = (trackA.geometry as Polyline).paths[0];
    const path = pathA.concat((trackB.geometry as Polyline).paths[0]);

    const out = createNew ? trackA.clone() : trackA;
    out.geometry = new Polyline({
      spatialReference: trackA.geometry.spatialReference,
      paths: [path]
    });
    return out;
  }

  result.features.forEach(f => {
    const member = f.getAttribute("Membership");
    if (currentTrack.getAttribute("Membership") !== member) {
      currentTrack = new Graphic({
        attributes: {
          ...f.attributes
        },
        geometry: f.geometry,
        symbol: new LineSymbol3D({
          symbolLayers: [
            new LineSymbol3DLayer({
              material: {
                color: member === "NEAT" ? fastColorFaded : slowColorFaded
              },
              size: 1
            })
          ]
        })
      });
      tracks.push(currentTrack);
    } else {
      mergeTracks(currentTrack, f);
    }
  });

  tracks.forEach(f => {
    const line = f.geometry as Polyline;
    const points = line.paths[0].map(v => { return { x: v[0], y: v[1], z: v[2] } });

    const simplePoints = simplify(points, 10, false);

    console.log(`From ${points.length} to ${simplePoints.length}`);

    f.geometry = new Polyline({
      spatialReference: result.spatialReference,
      paths: [simplePoints.map((p: any) => [p.x, p.y, p.z])]
    });
  });

  const slowTracks = tracks
  .filter(t => t.getAttribute("Membership") !== "NEAT");

  const oldTracks = tracks
    .filter(t => t.getAttribute("Membership") === "Old");

  const slowRoute = slowTracks
    .reduce((acc, t) => acc ? mergeTracks(acc, t, true) : t);

  const fastTracks = tracks
    .filter(t => t.getAttribute("Membership") !== "Old");

  const neatTracks = tracks
    .filter(t => t.getAttribute("Membership") === "NEAT");

  const fastRoute = fastTracks
    .reduce((acc, t) => acc ? mergeTracks(acc, t, true) : t);

  const visibleElements = {
    legend: false,
    chart: true,
    clearButton: false,
    settingsButton: false,
    sketchButton: false,
    selectButton: false,
    uniformChartScalingToggle: false
  };

  const slowEP = new ElevationProfile({
    view,
    container: "leftProfile",
    profiles: [
      {
        type: "input",
        viewVisualizationEnabled: true,
        color: slowColor
      },
      {
        type: "ground",
        viewVisualizationEnabled: true,
        color: slowColorFaded
      },
    ],
    visibleElements,
    input: slowRoute
  });
  slowEP.viewModel.highlightEnabled = false;

  const fastEP = new ElevationProfile({
    container: "rightProfile",
    view,
    profiles: [
      {
        type: "input",
        viewVisualizationEnabled: false,
        color: fastColor
      },
      {
        type: "ground",
        viewVisualizationEnabled: false,
        color: fastColorFaded
      },
    ],
    visibleElements,
    input: fastRoute
  });
  fastEP.viewModel.highlightEnabled = false;

  slowEP.viewModel.watch("hoveredChartPosition", () => {
    fastEP.viewModel.hoveredChartPosition = slowEP.viewModel.hoveredChartPosition;
  });

  fastEP.viewModel.watch("hoveredChartPosition", () => {
    slowEP.viewModel.hoveredChartPosition = fastEP.viewModel.hoveredChartPosition;
  });

  // view.ui.add(ep, "bottom-right");

  let clearHighlight = () => { };

  const fastEPInput = (section: number) => {
    switch (section) {
      case 1:
        return tracks[4]
      case 2:
        return tracks[7]
      case 3:
        return tracks[1]
      default:
        return fastRoute;
    }
  }

  const slowEPInput = (section: number) => {
    switch (section) {
      case 1:
        return tracks[5]
      case 2:
        return tracks[8]
      case 3:
        return tracks[2]
      default:
        return slowRoute;
    }
  }

  const fadedTracks = (showNew: boolean, section: number) => {
    if (section === 0) {
      return showNew ? oldTracks : neatTracks;
    } else {
      return [showNew ? slowEPInput(section) : fastEPInput(section)];
    }
  }

  let section = 0;
  let showNew = true;

  const updateProfiles = promiseUtils.debounce(async () => {

    clearHighlight();

    tracks2D.removeAll();
    tracks3D.removeAll();

    const graphics = fadedTracks(showNew, section);

    tracks2D.addMany(graphics.map(g => g.clone()));
    tracks3D.addMany(graphics);

    slowEP.profiles.forEach(p => p.viewVisualizationEnabled = !showNew);
    slowEP.input = slowEPInput(section);

    fastEP.input = fastEPInput(section);
    fastEP.profiles.forEach(p => p.viewVisualizationEnabled = showNew);

    view.highlightOptions.color = showNew ? slowColorFaded : fastColorFaded;
    const lv = await view.whenLayerView(tracks3D);
    clearHighlight = lv.highlight(graphics).remove;

    await watchUtils.whenEqualOnce(slowEP.viewModel, "progress", 1);
    await watchUtils.whenEqualOnce(fastEP.viewModel, "progress", 1);
  });

  const toggle = document.getElementById("trackSwitchInput") as HTMLInputElement;

  toggle.onchange = () => {
    showNew = toggle.checked;
    updateProfiles();
  };
  updateProfiles();

  const cameraZimmerberg = new Camera({
  position: {
    longitude: 8.4723133,
    latitude: 47.30302987,
    z: 11415.02525
  },
  heading: 55.49,
  tilt: 27.64
});

const cameraGotthard = new Camera({
  position: {
    longitude: 8.27547022,
    latitude: 46.01335477,
    z: 35950.15826
  },
  heading: 37.04,
  tilt: 65.7
});

const cameraCeneri = new Camera({
  position: {
    longitude: 8.90117572,
    latitude: 46.24280383,
    z: 5614.57732
  },
  heading: 156.83,
  tilt: 68.33
});


  const allButton = document.getElementById("allButton") as HTMLElement;
  allButton.onclick = async () => {
    section = 0;
    await updateProfiles();
    view.goTo(camera);
  };

  const gotthardButton = document.getElementById("gotthardButton") as HTMLElement;
  gotthardButton.onclick = async () => {
    section = 1;
    await updateProfiles();
    view.goTo(cameraGotthard);
  };

  const ceneriButton = document.getElementById("ceneriButton") as HTMLElement;
  ceneriButton.onclick = async () => {
    section = 2;
    await updateProfiles();
    view.goTo(cameraCeneri);
  };

  const zimmerbergButton = document.getElementById("zimmerbergButton") as HTMLElement;
  zimmerbergButton.onclick = async () => {
    section = 3;
    await updateProfiles();
    view.goTo(cameraZimmerberg);
  };



});


// view.when().then(async () => {
//   // var maxAllowableOffset = 200_000;
//   // var maxAllowableOffset = 20_000;

//   const trackFeature = async (layer: FeatureLayer) => {
//     const tracksQuery = layer.createQuery();
//     tracksQuery.returnGeometry = true;
//     tracksQuery.returnZ = true;
//     const result = await layer.queryFeatures(tracksQuery);

//     const count = result.features
//       .map((f) => f.geometry as Polyline)
//       .reduce((acc, l) => acc + l.paths[0].length, 0);

//     console.log({ count });

//     return result.features[0];
//   };

//   const oldFeature = await trackFeature(oldLayer);

//   const newFeature = await trackFeature(newLayer);

//   const oldLV = await view.whenLayerView(oldLayer);
//   const newLV = await view.whenLayerView(newLayer);

//   const cameraZimmerberg = new Camera({
//     position: {
//       longitude: 8.4723133,
//       latitude: 47.30302987,
//       z: 11415.02525
//     },
//     heading: 55.49,
//     tilt: 27.64
//   });

//   const newGotthard = [8, 9];
//   const oldGotthard = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];
//   const cameraGotthard = new Camera({
//     position: {
//       longitude: 8.27547022,
//       latitude: 46.01335477,
//       z: 35950.15826
//     },
//     heading: 37.04,
//     tilt: 65.7
//   });

//   const newCeneri = [24, 25, 26];
//   const oldCeneri = [27];
//   const cameraCeneri = new Camera({
//     position: {
//       longitude: 8.90117572,
//       latitude: 46.24280383,
//       z: 5614.57732
//     },
//     heading: 156.83,
//     tilt: 68.33
//   });

//   const cameras = [camera, cameraZimmerberg, cameraGotthard, cameraCeneri];

//   const visibleElements = {
//     sketchButton: false,
//     selectButton: false,
//     statistics: false,
//     legend: false
//   };
//   const epLeft = new ElevationProfile({
//     view,
//     container: "leftProfile",
//     profiles: [
//       {
//         type: "ground",
//         viewVisualizationEnabled: true,
//         color: slowColorFaded
//       },
//       {
//         type: "input",
//         viewVisualizationEnabled: true,
//         color: slowColor
//       }
//     ],
//     visibleElements
//   });
//   view["ep"] = epLeft;
//   const epRight = new ElevationProfile({
//     view,
//     container: "rightProfile",
//     profiles: [
//       {
//         type: "ground",
//         viewVisualizationEnabled: true,
//         color: fastColorFaded
//       },
//       {
//         type: "input",
//         viewVisualizationEnabled: true,
//         color: fastColor
//       }
//     ],
//     visibleElements
//   });

//   // view.ui.add(epLeft, "bottom-left");
//   // view.ui.add(epRight, "bottom-right");

//   let highlightNEAT = false;
//   let selectedTrack = -1;

//   let highlight: any = null;

//   const updateProfiles = promiseUtils.debounce(async (newHighlightNEAT: any, changeSelection = 0) => {
//     const selection = Math.max(0, Math.min(3, selectedTrack + changeSelection));

//     view.graphics.removeAll();

//     if (highlightNEAT === newHighlightNEAT) {
//       return;
//     }
//     highlightNEAT = newHighlightNEAT;

//     epLeft.viewModel.highlightEnabled = !highlightNEAT;
//     epRight.viewModel.highlightEnabled = highlightNEAT;

//     view.highlightOptions.color = highlightNEAT ? fastColor : slowColor;

//     const visible = true;

//     epLeft.input = oldFeature;
//     epRight.input = newFeature;
//   });


//   previousSection.onclick = () => updateProfiles(highlightNEAT, -1);
//   nextSection.onclick = () => updateProfiles(highlightNEAT, 1);


// });

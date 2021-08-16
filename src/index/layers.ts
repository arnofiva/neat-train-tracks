import FeatureLayer from "esri/layers/FeatureLayer";
import GraphicsLayer from "esri/layers/GraphicsLayer";
import LabelClass from "esri/layers/support/LabelClass";
import TileLayer from "esri/layers/TileLayer";
import VectorTileLayer from "esri/layers/VectorTileLayer";
import { SimpleRenderer } from "esri/renderers";
import { LabelSymbol3D, TextSymbol3DLayer, PolygonSymbol3D, FillSymbol3DLayer, PointSymbol3D } from "esri/symbols";
import IconSymbol3DLayer from "esri/symbols/IconSymbol3DLayer";

export const hillshade = new TileLayer({
  portalItem: { id: "428539ef9cab4017b69d15a40a9ee98b" } // Dark
  // portalItem: { id: "1b243539f4514b6ba35e7d995890db1d" } // Light
});

export const water = new VectorTileLayer({
  portalItem: { id: "cd266578c33f4724acb93b9fff57cbb6" }
});

export const pois = new FeatureLayer({
  visible: true,
  portalItem: {
    id: "7ad19e912ce84d138ca6544610fa9643"
  },
  renderer: new SimpleRenderer({
    symbol: new PointSymbol3D({
      symbolLayers: [
        new IconSymbol3DLayer({
          material: { color: [255, 255, 255] },
          size: 1.5,
          resource: {
            primitive: "circle"
          }
        })
      ],
      callout: {
        type: "line", // autocasts as new LineCallout3D()
        size: 1.5,
        color: [255, 255, 255]
        // border: {
        //   color: [50, 50, 50]
        // }
      },
      verticalOffset: {
        screenLength: 80,
        maxWorldLength: 2000,
        minWorldLength: 300
      }
    })
  }),
  labelingInfo: [
    new LabelClass({
      labelExpressionInfo: {
        expression: "$feature.Label"
      },
      symbol: new LabelSymbol3D({
        symbolLayers: [
          new TextSymbol3DLayer({
            material: { color: [255, 255, 255] },
            size: 12
            // halo: {
            // color: [30, 30, 30, 0.8], // autocasts as Color
            // size: 0
            // }
          })
        ]
      })
    })
  ]
});

export const countries = new FeatureLayer({
  portalItem: {
    id: "ac80670eb213440ea5899bbf92a04998" // Detailed
    // id: "2b93b06dc0dc4e809d3c8db5cb96ba69" // Generalized
  },
  popupEnabled: false,
  definitionExpression: "Country in ('Switzerland')",
  renderer: new SimpleRenderer({
    symbol: new PolygonSymbol3D({
      symbolLayers: [
        new FillSymbol3DLayer({
          outline: {
            color: [180, 180, 180],
            size: 1.5
          }
        })
      ]
    })
  })
});

export const tracksLayer = new FeatureLayer({
  portalItem: {
    id: "cec8a4790ccc4727bf54fa6e86a4d26c"
  }
});

export const tracks3D = new GraphicsLayer({
  title: "3D Tracks",
  elevationInfo: {
    mode: "absolute-height"
  }
});

export const tracks2D = new GraphicsLayer({
  title: "2D Tracks",
  elevationInfo: {
    mode: "on-the-ground"
  },
  opacity: 0.5,
  visible: false
});

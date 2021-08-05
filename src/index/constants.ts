import Camera from "esri/Camera";
import Color from "esri/Color";

export const slowColor = new Color("#ff7d00");
export const slowColorFaded = new Color("#9b5c20");

export const fadedColor = new Color("#808080");
export const fastColorFaded = new Color("#007f00");
export const fastColor = new Color("#00ff00");

export const sections = [
  // Overall
  {
    slowTime: 4 * 60 + 22, // 4h 22min
    fastTime: 3 * 60 + 17, // 3h 17min
    camera: new Camera({
      position: {
        longitude: 7.0337771,
        latitude: 45.12086495,
        z: 159916.61637
      },
      heading: 48.74,
      tilt: 51.89
    })
  },
  // Zimmerberg
  {
    slowTime: 4 * 60 + 22, // 4h 22min
    fastTime: 3 * 60 + 17, // 3h 17min
    camera: new Camera({
      position: {
        longitude: 8.4723133,
        latitude: 47.30302987,
        z: 11415.02525
      },
      heading: 55.49,
      tilt: 27.64
    })
  },
  // Gotthard
  {
    slowTime: 4 * 60 + 22, // 4h 22min
    fastTime: 3 * 60 + 17, // 3h 17min
    camera: new Camera({
      position: {
        longitude: 8.27547022,
        latitude: 46.01335477,
        z: 35950.15826
      },
      heading: 37.04,
      tilt: 65.7
    })
  },
  // Ceneri
  {
    slowTime: 4 * 60 + 22, // 4h 22min
    fastTime: 3 * 60 + 17, // 3h 17min
    camera: new Camera({
      position: {
        longitude: 8.90117572,
        latitude: 46.24280383,
        z: 5614.57732
      },
      heading: 156.83,
      tilt: 68.33
    })
  }
];

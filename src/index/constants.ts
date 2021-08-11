import Camera from "esri/Camera";
import Color from "esri/Color";

export const slowColor = new Color("#ff7d00");
export const slowColorFaded = new Color("#9b5c20");

export const fadedColor = new Color("#808080");
export const fastColorFaded = new Color("#007f00");
export const fastColor = new Color("#00ff00");

// Source: https://www.uvek.admin.ch/uvek/de/home/verkehr/gotthard-basistunnel.html

export class Section {
  static readonly TOTAL = new Section(
    4 * 60 + 22, // 4h 03min
    3 * 60 + 17, // 2h 58min
    new Camera({
      position: {
        longitude: 7.0337771,
        latitude: 45.12086495,
        z: 159916.61637
      },
      heading: 48.74,
      tilt: 51.89
    })
  );

  static readonly ZIMMERBERG = new Section(
    10, // 10min
    5, // 3h 17min
    new Camera({
      position: {
        longitude: 8.4723133,
        latitude: 47.30302987,
        z: 11415.02525
      },
      heading: 55.49,
      tilt: 27.64
    })
  )

  static readonly GOTTHARD = new Section(
    50, // 50min
    20, // 20min
    new Camera({
      position: {
        longitude: 8.27547022,
        latitude: 46.01335477,
        z: 35950.15826
      },
      heading: 37.04,
      tilt: 65.7
    }),
    // new Camera({
    //   position: {
    //     longitude: 8.44483296,
    //     latitude: 46.96159700,
    //     z: 8820.48138
    //   },
    //   heading: 143.97,
    //   tilt: 71.19
    // }),
    // new Camera({
    //   position: {
    //     longitude: 8.76589998,
    //     latitude: 46.44697671,
    //     z: 8820.48138
    //   },
    //   heading: 144.20,
    //   tilt: 71.19
    // })
    new Camera({
      position: {
        longitude: 8.51109290,
        latitude: 46.45750037,
        z: 15605.80733
      },
      heading: 26.58,
      tilt: 66.73
    }),
    new Camera({
      position: {
        longitude: 9.21189998,
        latitude: 46.22905008,
        z: 10283.89300
      },
      heading: 307.62,
      tilt: 70.09
    })
  );

  static readonly CENERI = new Section(
    20, // 4h 22min
    10, // 3h 17min
    new Camera({
      position: {
        longitude: 8.90117572,
        latitude: 46.24280383,
        z: 5614.57732
      },
      heading: 156.83,
      tilt: 68.33
    })
  );

  static fromIndex(sectionIndex: number) {
    switch (sectionIndex) {
      case 1:
        return this.ZIMMERBERG;
      case 2:
        return this.GOTTHARD;
      case 3:
        return this.CENERI;
      default:
        return this.TOTAL;
    }
  }

  private constructor(public slowTime: number, public fastTime: number, public camera: Camera, public startCam?: Camera, public endCam?: Camera) { }

}



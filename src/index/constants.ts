import Camera from "esri/Camera";
import Color from "esri/Color";

export const elevationColor = new Color("#FFFFFF");
elevationColor.a = 0.5;

export const slowColor = new Color("#ff7d00");
export const slowColorFaded = new Color("#9b5c20");
// export const fadedColor = new Color("#808080");
export const fastColorFaded = new Color("#007f00");
export const fastColor = new Color("#11dd00");
//export const fastColor = new Color("white");

// Source: https://www.uvek.admin.ch/uvek/de/home/verkehr/gotthard-basistunnel.html

export class Section {
  static readonly ALL = new Section(
    "All",
    2020,
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
    }),
    new Camera({
      position: {
        longitude: 7.18997109,
        latitude: 45.92987682,
        z: 201836.98005
      },
      heading: 30.13,
      tilt: 37.54
    }),
    new Camera({
      position: {
        longitude: 7.20718085,
        latitude: 46.02959863,
        z: 209488.10173
      },
      heading: 89.05,
      tilt: 34.49
    })
  );

  static readonly ZIMMERBERG = new Section(
    "Zimmerberg",
    2002,
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
    }),
    new Camera({
      position: {
        longitude: 8.40855124,
        latitude: 47.43665308,
        z: 5978.65164
      },
      heading: 123.8,
      tilt: 66.61
    }),
    new Camera({
      position: {
        longitude: 8.45039066,
        latitude: 47.3131689,
        z: 3667.26979
      },
      heading: 99.26,
      tilt: 69.22
    })
  );

  static readonly GOTTHARD = new Section(
    "Gotthard",
    2016,
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
    new Camera({
      position: {
        longitude: 8.09621571,
        latitude: 46.95660722,
        z: 45765.19612
      },
      heading: 106.83,
      tilt: 38.07
    }),
    new Camera({
      position: {
        longitude: 8.43732082,
        latitude: 46.48417582,
        z: 38082.73353
      },
      heading: 104.93,
      tilt: 42.46
    })
    // new Camera({
    //   position: {
    //     longitude: 8.51109290,
    //     latitude: 46.45750037,
    //     z: 15605.80733
    //   },
    //   heading: 26.58,
    //   tilt: 66.73
    // }),
    // new Camera({
    //   position: {
    //     longitude: 9.21189998,
    //     latitude: 46.22905008,
    //     z: 10283.89300
    //   },
    //   heading: 307.62,
    //   tilt: 70.09
    // })
  );

  static readonly CENERI = new Section(
    "Ceneri",
    2020,
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
    }),
    new Camera({
      position: {
        longitude: 9.02926596,
        latitude: 46.29802574,
        z: 5882.2629
      },
      heading: 189.93,
      tilt: 66.43
    }),
    new Camera({
      position: {
        longitude: 8.85111269,
        latitude: 46.13497995,
        z: 6882.37275
      },
      heading: 146.89,
      tilt: 60.19
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
        return this.ALL;
    }
  }

  private constructor(
    public label: string,
    public year: number,
    public slowTime: number,
    public fastTime: number,
    public camera: Camera,
    public startCam?: Camera,
    public endCam?: Camera
  ) {}
}



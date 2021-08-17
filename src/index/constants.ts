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
        longitude: 8.24264653,
        latitude: 47.53887505,
        z: 18472.11098
      },
      heading: 140.05,
      tilt: 63.2
    }),
    new Camera({
      position: {
        longitude: 8.46550426,
        latitude: 47.46465694,
        z: 3860.20457
      },
      heading: 157.15,
      tilt: 75.24
    }),
    new Camera({
      position: {
        longitude: 8.38952282,
        latitude: 47.14397143,
        z: 4818.37549
      },
      heading: 67.77,
      tilt: 68.89
    })
  );

  static readonly GOTTHARD = new Section(
    "Gotthard",
    2016,
    50, // 50min
    20, // 20min
    new Camera({
      position: {
        longitude: 7.61486774,
        latitude: 47.73892,
        z: 50343.47143
      },
      heading: 142.87,
      tilt: 68.45
    }),
    new Camera({
      position: {
        longitude: 8.15157539,
        latitude: 47.33561923,
        z: 9190.3283
      },
      heading: 138.24,
      tilt: 76.05
    }),
    new Camera({
      position: {
        longitude: 8.85945086,
        latitude: 46.45718618,
        z: 9750.45963
      },
      heading: 165.51,
      tilt: 74.57
    })
  );

  static readonly CENERI = new Section(
    "Ceneri",
    2020,
    20, // 4h 22min
    10, // 3h 17min
    new Camera({
      position: {
        longitude: 8.96950104,
        latitude: 46.44303121,
        z: 19888.17991
      },
      heading: 178.81,
      tilt: 61.68
    }),
    new Camera({
      position: {
        longitude: 9.04456304,
        latitude: 46.33253886,
        z: 8613.94608
      },
      heading: 190.9,
      tilt: 65.89
    }),
    new Camera({
      position: {
        longitude: 8.88002108,
        latitude: 46.11574327,
        z: 3929.85347
      },
      heading: 160.46,
      tilt: 73.37
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



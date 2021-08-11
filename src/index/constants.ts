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
    }),
    new Camera({
      position: {
        longitude: 8.5155129,
        latitude: 47.40915386,
        z: 2291.69999
      },
      heading: 181.61,
      tilt: 63.98
    }),
    new Camera({
      position: {
        longitude: 8.50612225,
        latitude: 47.29491531,
        z: 2139.48809
      },
      heading: 83.64,
      tilt: 66.9
    })
  );

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
    new Camera({
      position: {
        longitude: 8.62930101,
        latitude: 47.00796764,
        z: 10259.1925
      },
      heading: 188.82,
      tilt: 68.46
    }),
    new Camera({
      position: {
        longitude: 8.75380363,
        latitude: 46.4046695,
        z: 8386.95846
      },
      heading: 141.72,
      tilt: 69.49
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
        longitude: 8.93383496,
        latitude: 46.26408764,
        z: 5468.9504
      },
      heading: 156.85,
      tilt: 68.33
    }),
    new Camera({
      position: {
        longitude: 8.84061376,
        latitude: 46.10261438,
        z: 7029.88396
      },
      heading: 139.31,
      tilt: 57.49
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

  private constructor(
    public slowTime: number,
    public fastTime: number,
    public camera: Camera,
    public startCam?: Camera,
    public endCam?: Camera
  ) {}
}



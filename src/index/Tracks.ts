import Accessor from "esri/core/Accessor";
import { property, subclass } from "esri/core/accessorSupport/decorators";
import { Polyline } from "esri/geometry";
import Graphic from "esri/Graphic";
import { LineSymbol3D, LineSymbol3DLayer } from "esri/symbols";
import { fastColorFaded, Section, slowColorFaded } from "./constants";
import { tracksLayer } from "./layers";

import simplify = require("simplify");

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

async function loadTracks() {
  await tracksLayer.load();

  const tracksQuery = tracksLayer.createQuery();
  tracksQuery.returnGeometry = true;
  tracksQuery.returnZ = true;
  tracksQuery.orderByFields = ["PathIndex"];
  const result = await tracksLayer.queryFeatures(tracksQuery);

  let currentTrack = new Graphic();

  const tracks: Graphic[] = [];

  result.features.forEach((f) => {
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

  tracks.forEach((f) => {
    const line = f.geometry as Polyline;
    const points = line.paths[0].map((v) => {
      return { x: v[0], y: v[1], z: v[2] };
    });

    const simplePoints = simplify(points, 10, false);

    f.geometry = new Polyline({
      spatialReference: result.spatialReference,
      paths: [simplePoints.map((p: any) => [p.x, p.y, p.z])]
    });
  });

  return tracks;
}

@subclass("tracks")
export default class Tracks extends Accessor {
  @property()
  tracks: Graphic[];

  @property()
  slowTracks: Graphic[];

  @property()
  oldTracks: Graphic[];

  @property()
  slowRoute: Graphic;

  @property()
  fastTracks: Graphic[];

  @property()
  neatTracks: Graphic[];

  @property()
  fastRoute: Graphic;

  private constructor(props: any) {
    super(props);
  }

  public static async load() {
    const tracks = await loadTracks();

    const slowTracks = tracks.filter((t) => t.getAttribute("Membership") !== "NEAT");
    const oldTracks = tracks.filter((t) => t.getAttribute("Membership") === "Old");
    const slowRoute = slowTracks.reduce((acc, t) => (acc ? mergeTracks(acc, t, true) : t));
    const fastTracks = tracks.filter((t) => t.getAttribute("Membership") !== "Old");
    const neatTracks = tracks.filter((t) => t.getAttribute("Membership") === "NEAT");
    const fastRoute = fastTracks.reduce((acc, t) => (acc ? mergeTracks(acc, t, true) : t));

    return new Tracks({
      tracks,
      slowTracks,
      oldTracks,
      slowRoute,
      fastTracks,
      neatTracks,
      fastRoute
    });
  }

  fastEPInput(section: Section) {
    switch (section) {
      case Section.ZIMMERBERG:
        return this.tracks[1];
      case Section.GOTTHARD:
        return this.tracks[4];
      case Section.CENERI:
        return this.tracks[7];
      default:
        return this.fastRoute;
    }
  }

  slowEPInput(section: Section) {
    switch (section) {
      case Section.ZIMMERBERG:
        return this.tracks[2];
      case Section.GOTTHARD:
        return this.tracks[5];
      case Section.CENERI:
        return this.tracks[8];
      default:
        return this.slowRoute;
    }
  }

  fadedTracks(showNew: boolean, section: Section) {
    if (section === Section.TOTAL) {
      return showNew ? this.oldTracks : this.neatTracks;
    } else {
      return [showNew ? this.slowEPInput(section) : this.fastEPInput(section)];
    }
  }
}

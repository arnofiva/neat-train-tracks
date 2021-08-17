import Accessor from "esri/core/Accessor";
import { property, subclass } from "esri/core/accessorSupport/decorators";
import { Polyline } from "esri/geometry";
import Graphic from "esri/Graphic";
import { Section } from "./constants";
import { tracksLayer } from "./layers";

async function loadTracks() {
  await tracksLayer.load();

  const tracksQuery = tracksLayer.createQuery();
  tracksQuery.returnGeometry = true;
  tracksQuery.returnZ = true;
  tracksQuery.orderByFields = ["PathIndex"];

  const result = await tracksLayer.queryFeatures(tracksQuery);

  return result.features;
}

function mergeTracks(trackA: Graphic, trackB: Graphic) {
  const pathA = (trackA.geometry as Polyline).paths[0];
  const path = pathA.concat((trackB.geometry as Polyline).paths[0]);

  const out = trackA.clone();
  out.geometry = new Polyline({
    spatialReference: trackA.geometry.spatialReference,
    paths: [path]
  });
  return out;
}

function mergeManyTracks(tracks: Graphic[]) {
  return tracks.reduce((acc, t) => (acc ? mergeTracks(acc, t) : t));
}

function filterByMembership(tracks: Graphic[], membership: "Common" | "Old" | "NEAT", inclusive = true) {
  if (inclusive) {
    return tracks.filter((t) => t.getAttribute("Membership") === membership);
  } else {
    return tracks.filter((t) => t.getAttribute("Membership") !== membership);
  }
}

function filterBySection(tracks: Graphic[], section: Section) {
  if (section === Section.ALL) {
    return tracks;
  } else {
    return tracks.filter((t) => t.getAttribute("TrackSection") === section.label);
  }
}

@subclass("tracks")
export default class Tracks extends Accessor {
  @property()
  private fastTracks: Graphic[];

  @property()
  private slowTracks: Graphic[];

  @property()
  private oldTracks: Graphic[];

  @property()
  private neatTracks: Graphic[];

  private constructor(props: any) {
    super(props);
  }

  public static async load() {
    const tracks = await loadTracks();

    const slowTracks = filterByMembership(tracks, "NEAT", false);
    const fastTracks = filterByMembership(tracks, "Old", false);

    const oldTracks = filterByMembership(tracks, "Old");
    const neatTracks = filterByMembership(tracks, "NEAT");

    return new Tracks({
      slowTracks,
      fastTracks,
      oldTracks,
      neatTracks
    });
  }

  activeSection(section: Section, fast: boolean) {
    return filterBySection(fast ? this.fastTracks : this.slowTracks, section);
  }

  activeRoute(section: Section, fast: boolean) {
    return mergeManyTracks(this.activeSection(section, fast));
  }

  inactiveSection(section: Section, fast: boolean) {
    return filterBySection(fast ? this.neatTracks : this.oldTracks, section);
  }

  inactiveRoute(section: Section, fast: boolean) {
    return mergeManyTracks(this.inactiveSection(section, fast));
  }
}

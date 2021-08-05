import Color from "esri/Color";
import { property, subclass } from "esri/core/accessorSupport/decorators";
import { createPlane } from "esri/geometry/Mesh";
import ElevationProfile from "esri/widgets/ElevationProfile";
import Widget from "esri/widgets/Widget";
import { slowColor, slowColorFaded, fastColor, fastColorFaded } from "./constants";
import { scene } from "./Scene";

import { tsx } from "esri/widgets/support/widget";
import Tracks from "./Tracks";
import * as watchUtils from "esri/core/watchUtils";

const view = scene.view;

const visibleElements = {
  legend: false,
  chart: true,
  clearButton: false,
  settingsButton: false,
  sketchButton: false,
  selectButton: false,
  uniformChartScalingToggle: false
};

function createProfile(color: Color, colorFaded: Color) {
  const ep = new ElevationProfile({
    view,
    profiles: [
      {
        type: "input",
        viewVisualizationEnabled: true,
        color
      },
      {
        type: "ground",
        viewVisualizationEnabled: true,
        color: colorFaded
      }
    ],
    visibleElements
  });
  ep.viewModel.highlightEnabled = false;
  return ep;
}

export interface TrackProfilesProps extends __esri.WidgetProperties {
  tracks: Tracks;
}

@subclass("app.trackprofiles")
export default class TrackProfiles extends Widget {
  @property()
  tracks: Tracks;

  @property()
  slowEP = createProfile(slowColor, slowColorFaded);

  @property()
  fastEP = createProfile(fastColor, fastColorFaded);

  @property()
  showNew = true;

  @property()
  section = 0;

  constructor(props: TrackProfilesProps) {
    super(props);
  }

  render() {
    this.slowEP.profiles.forEach((p) => (p.viewVisualizationEnabled = !this.showNew));
    this.slowEP.input = this.tracks.slowEPInput(this.section);

    this.fastEP.input = this.tracks.fastEPInput(this.section);
    this.fastEP.profiles.forEach((p) => (p.viewVisualizationEnabled = this.showNew));

    const ep = this.showNew ? this.fastEP.render() : this.slowEP.render();

    return <div>{ep}</div>;
  }
}

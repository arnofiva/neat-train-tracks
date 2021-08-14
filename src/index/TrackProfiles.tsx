import Color from "esri/Color";
import { property, subclass } from "esri/core/accessorSupport/decorators";
import ElevationProfile from "esri/widgets/ElevationProfile";
import Widget from "esri/widgets/Widget";
import { slowColor, slowColorFaded, fastColor, fastColorFaded, Section } from "./constants";
import { scene } from "./Scene";

import { tsx } from "esri/widgets/support/widget";
import Tracks from "./Tracks";
import TrackSelector from "./TrackSelector";
import SectionSelector from "./SectionSelector";

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
  window["ep"] = ep;
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
  trackSelector = new TrackSelector();

  @property({
    aliasOf: "trackSelector.showNew"
  })
  showNew: boolean;

  @property()
  sectionSelector = new SectionSelector();

  @property({
    aliasOf: "sectionSelector.section"
  })
  section: Section;

  @property()
  slowEP = createProfile(slowColor, slowColorFaded);

  @property()
  fastEP = createProfile(fastColor, fastColorFaded);

  @property()
  get activeEP() {
    return this.showNew ? this.fastEP : this.slowEP;
  }

  @property()
  get inactiveEP() {
    return this.showNew ? this.slowEP : this.fastEP;
  }

  @property()
  get time() {
    return this.showNew ? this.section.fastTime : this.section.slowTime;
  }

  @property()
  get distance() {
    const input = this.activeEP.viewModel.profiles.find((p) => p.type === "input");
    return input.statistics ? input.statistics.maxDistance : 0;
  }

  constructor(props: TrackProfilesProps) {
    super(props);
  }

  postInitialize() {
    [this.fastEP, this.slowEP].forEach((ep) => {
      ep.watch("_chart", (chart) => {
        if (chart) {
          chart.amChart.cursor.behavior = "none";
        }
      });
    });
  }

  render() {
    const showNew = this.showNew;
    this.slowEP.profiles.forEach((p) => (p.viewVisualizationEnabled = !showNew));
    this.slowEP.input = this.tracks.slowEPInput(this.section);

    this.fastEP.input = this.tracks.fastEPInput(this.section);
    this.fastEP.profiles.forEach((p) => (p.viewVisualizationEnabled = showNew));

    return <div>{this.activeEP.render()}</div>;
  }
}

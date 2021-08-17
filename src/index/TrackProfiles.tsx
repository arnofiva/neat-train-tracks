import Color from "esri/Color";
import { property, subclass } from "esri/core/accessorSupport/decorators";
import ElevationProfile from "esri/widgets/ElevationProfile";
import Widget from "esri/widgets/Widget";
import { slowColor, slowColorFaded, fastColor, fastColorFaded, Section, elevationColor } from "./constants";
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

function createProfile(color: Color) {
  const ep = new ElevationProfile({
    view,
    profiles: [
      {
        type: "ground",
        viewVisualizationEnabled: false,
        color: elevationColor
      },
      {
        type: "input",
        viewVisualizationEnabled: true,
        color
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
  slowEP = createProfile(slowColor);

  @property()
  fastEP = createProfile(fastColor);

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

    this.watch(["section", "showNew"], () => this.updateProfiles());
    this.updateProfiles();
  }

  render() {
    return <div class="profile interactive">{this.activeEP.render()}</div>;
  }

  private updateProfiles() {
    const showNew = this.showNew;

    this.slowEP.input = this.tracks.activeRoute(this.section, false);
    this.fastEP.input = this.tracks.activeRoute(this.section, true);

    this.slowEP.profiles.forEach((p) => {
      p.viewVisualizationEnabled = !showNew;
    });
    this.fastEP.profiles.forEach((p) => {
      p.viewVisualizationEnabled = showNew;
    });
  }
}

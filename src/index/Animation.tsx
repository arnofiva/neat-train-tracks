import { property, subclass } from "esri/core/accessorSupport/decorators";
import { tsx } from "esri/widgets/support/widget";
import Widget from "esri/widgets/Widget";
import TrackProfiles from "./TrackProfiles";
import { scene } from "./Scene";
import lerp from "./lerp";

export interface AnimationProps extends __esri.WidgetProperties {
  profiles: TrackProfiles;
}

@subclass("app.animation")
export default class Animation extends Widget {
  @property()
  profiles: TrackProfiles;

  constructor(props: AnimationProps) {
    super(props);
  }

  postInitialize() {
    [this.profiles.fastEP, this.profiles.slowEP].forEach((ep) => {
      const viewModel = ep.viewModel;
      viewModel.watch("hoveredChartPosition", () => this.updateTimeDistance());
    });
  }

  render() {
    return (
      <div class="animation">
        <span class="icon-ui-play"></span>
        <span class="icon-ui-pause"></span>
      </div>
    );
  }

  private updateTimeDistance() {
    const activeEP = this.profiles.activeEP;
    const inactiveEP = this.profiles.inactiveEP;
    const section = this.profiles.section;
    const activePos = activeEP.viewModel.hoveredChartPosition;

    if (activePos) {
      const startCam = section.startCam;
      const endCam = section.endCam;

      if (startCam && endCam) {
        const newCam = lerp(startCam, endCam, activePos);
        scene.view.goTo(newCam, {
          speedFactor: 2,
          easing: "linear"
        });
      }

      activeEP.viewModel.profiles.getItemAt(0).hoveredPoint;
      const ratio = section.fastTime / section.slowTime;
      const pos = Math.min(1, Math.max(0, this.profiles.showNew ? activePos * ratio : activePos / ratio));
      inactiveEP.viewModel.hoveredChartPosition = pos;
    } else {
      inactiveEP.viewModel.hoveredChartPosition = activePos;
    }
  }
}

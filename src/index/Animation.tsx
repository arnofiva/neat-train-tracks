import { property, subclass } from "esri/core/accessorSupport/decorators";
import { tsx } from "esri/widgets/support/widget";
import Widget from "esri/widgets/Widget";
import TrackProfiles from "./TrackProfiles";
import { scene } from "./Scene";
import lerp from "./lerp";

import anime from "animejs";

export interface AnimationProps extends __esri.WidgetProperties {
  profiles: TrackProfiles;
}

@subclass("app.animation")
export default class Animation extends Widget {
  @property()
  profiles: TrackProfiles;

  @property()
  private cameraTracking = true;

  @property()
  private currentAnimationStart = 0;

  constructor(props: AnimationProps) {
    super(props);
  }

  postInitialize() {
    [this.profiles.fastEP, this.profiles.slowEP].forEach((ep) => {
      const viewModel = ep.viewModel;
      viewModel.watch("hoveredChartPosition", () => this.updateTimeDistance());
    });

    scene.view.watch("interacting", () => {
      if (scene.view.interacting) {
        this.currentAnimationStart = 0;
        this.cameraTracking = false;
      }
    });

    this.profiles.watch("section", () => {
      this.cameraTracking = true;
    });
  }

  stop() {
    this.currentAnimationStart = 0;
  }

  play() {
    // Stop any current animation

    const duration = 5000;
    let start: number;

    const step = (timestamp: number) => {
      if (start === undefined) {
        start = timestamp;
        this.currentAnimationStart = start;
      } else if (this.currentAnimationStart === 0) {
        return;
      }

      const t = Math.min(1, Math.max(0, (timestamp - start) / duration));

      this.profiles.activeEP.viewModel.hoveredChartPosition = t;

      if (t < 1) {
        requestAnimationFrame(step);
      } else {
        this.currentAnimationStart = 0;
      }
    };

    this.cameraTracking = true;
    requestAnimationFrame(step);
  }

  render() {
    return (
      <div class="animation interactive">
        {this.currentAnimationStart ? (
          <span class="icon-ui-pause" onclick={() => this.stop()}></span>
        ) : (
          <span class="icon-ui-play" onclick={() => this.play()}></span>
        )}
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

      if (this.cameraTracking && startCam && endCam) {
        const newCam = lerp(startCam, endCam, activePos);
        scene.view.goTo(newCam, {
          speedFactor: 2,
          easing: "linear"
        });
      }

      const ratio = section.fastTime / section.slowTime;
      const pos = Math.min(1, Math.max(0, this.profiles.showNew ? activePos * ratio : activePos / ratio));
      inactiveEP.viewModel.hoveredChartPosition = pos;
    } else {
      inactiveEP.viewModel.hoveredChartPosition = activePos;
    }
  }
}

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

  @property()
  private cameraTracking = true;

  @property()
  private running = false;

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
        this.stop();
        this.cameraTracking = false;
      }
    });

    this.profiles.watch("section", () => {
      this.running = false;
      this.cameraTracking = true;
      this.profiles.activeEP.viewModel.hoveredChartPosition = undefined as any;
    });

    this.profiles.watch("showNew", () => {
      this.running = false;
    });
  }

  stop() {
    this.running = false;
  }

  async play() {
    // Stop any current animation

    this.running = true;
    const startCam = this.profiles.section.startCam;
    if (startCam) {
      try {
        await scene.view.goTo(startCam);
      } catch {
        this.running = false;
      }
    }

    const duration = 10000;
    let start: number;

    const step = (timestamp: number) => {
      if (!this.running) {
        return;
      }
      if (start === undefined) {
        start = timestamp;
      }

      const t = Math.min(1, Math.max(0, (timestamp - start) / duration));

      this.profiles.activeEP.viewModel.hoveredChartPosition = t;

      if (t < 1) {
        requestAnimationFrame(step);
      } else {
        this.running = false;
      }
    };

    this.cameraTracking = true;
    requestAnimationFrame(step);
  }

  render() {
    return (
      <div class="animation interactive">
        {this.running ? (
          <button class="btn btn-small" onclick={() => this.stop()}>
            <span class="icon-ui-pause"></span>
          </button>
        ) : (
          <button class="btn btn-small" onclick={() => this.play()}>
            <span class="icon-ui-play"></span>
          </button>
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

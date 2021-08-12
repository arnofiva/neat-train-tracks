import { property, subclass } from "esri/core/accessorSupport/decorators";
import { tsx } from "esri/widgets/support/widget";
import Widget from "esri/widgets/Widget";

@subclass("app.trackselector")
export default class TrackSelector extends Widget {
  @property()
  showNew = true;

  render() {
    return (
      <div class="track-selector interactive">
        <div>
          <a onclick={() => (this.showNew = true)} class={this.showNew ? "active" : ""}>
            New Track{" "}
          </a>
        </div>
        <div>
          <a onclick={() => (this.showNew = false)} class={this.showNew ? "" : "active"}>
            Old Track{" "}
          </a>
        </div>
      </div>
    );
  }
}

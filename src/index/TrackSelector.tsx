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
          <a onclick={() => (this.showNew = true)}>New Track </a>
          <span class={this.showNew ? "icon-ui-check-mark" : ""}></span>
        </div>
        <div>
          <a onclick={() => (this.showNew = false)}>Old Track </a>
          <span class={this.showNew ? "" : "icon-ui-check-mark"}></span>
        </div>
      </div>
    );
  }
}

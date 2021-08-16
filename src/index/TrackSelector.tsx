import { property, subclass } from "esri/core/accessorSupport/decorators";
import { tsx } from "esri/widgets/support/widget";
import Widget from "esri/widgets/Widget";

@subclass("app.trackselector")
export default class TrackSelector extends Widget {
  @property()
  showNew = true;

  render() {

    const btnClass = "btn";
    const newClass = `${btnClass} fast ${this.showNew ? "active" : ""}`;
    const oldClass = `${btnClass} slow ${this.showNew ? "" : "active"}`;

    return (
      <div class="track-selector interactive">
        <button class={newClass} onclick={() => (this.showNew = true)}>
          New Track
        </button>
        <button class={oldClass} onclick={() => (this.showNew = false)}>
          Old Track
        </button>
      </div>
    );
  }
}

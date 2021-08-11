import { property, subclass } from "esri/core/accessorSupport/decorators";
import { tsx } from "esri/widgets/support/widget";
import Widget from "esri/widgets/Widget";
import TrackSelector from "./TrackSelector";

export interface LegendProps extends __esri.WidgetProperties {
  selector: TrackSelector;
}

@subclass("app.legend")
export default class Legend extends Widget {
  @property()
  selector: TrackSelector;

  constructor(props: LegendProps) {
    super(props);
  }

  render() {
    const classSuffix = this.selector.showNew ? "fast" : "slow";

    return (
      <div class="legend">
        <h4 class={`elevation ${classSuffix}`}>Elevation</h4>
        <h4 class={`track ${classSuffix}`}>Track</h4>
      </div>
    );
  }
}

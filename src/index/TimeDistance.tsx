import { property, subclass } from "esri/core/accessorSupport/decorators";
import { tsx } from "esri/widgets/support/widget";
import Widget from "esri/widgets/Widget";
import TrackProfiles from "./TrackProfiles";

export interface TimeDistanceProps extends __esri.WidgetProperties {
  profile: TrackProfiles;
}

@subclass("app.timedistance")
export default class TimeDistance extends Widget {
  @property()
  profile: TrackProfiles;

  constructor(props: TimeDistanceProps) {
    super(props);
  }

  render() {
    const time = this.profile.time;

    const minutes = time % 60;

    const hours = Math.floor(time / 60);

    const timeNode = hours ? (
      <span>
        {hours}
        <span class="units">h</span>&nbsp;
        {minutes}
        <span class="units">min</span>
      </span>
    ) : (
      <span>
        <span class="units"></span>
        {minutes}
        <span class="units">min</span>
      </span>
    );

    return (
      <div class="time-distance">
        <h4>Travel Time</h4>
        {timeNode}
        <h4>Distance</h4>
        <span>
          {this.profile.distance.toFixed(1)}
          <span class="units">km</span>
        </span>
      </div>
    );
  }
}

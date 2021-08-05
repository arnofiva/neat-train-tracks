import Widget = require("esri/widgets/Widget");
import { property, subclass } from "esri/core/accessorSupport/decorators";

import { tsx } from "esri/widgets/support/widget";
import TrackProfiles from "./TrackProfiles";
import { scene } from "./Scene";
import Tracks from "./Tracks";
import promiseUtils = require("esri/core/promiseUtils");
import watchUtils = require("esri/core/watchUtils");
import { slowColorFaded, fastColorFaded, sections } from "./constants";
import { tracks2D, tracks3D } from "./layers";
import { views } from "esri/views/View";

export interface AppProps extends __esri.WidgetProperties {
  tracks: Tracks;
}

@subclass("app")
export default class App extends Widget {
  @property()
  tracks: Tracks;

  @property()
  trackProfiles: TrackProfiles;

  @property()
  scene = scene;

  constructor(props: AppProps) {
    super(props);
  }

  postInitialize() {
    this.trackProfiles = new TrackProfiles({
      tracks: this.tracks
    });

    this.scene.view.on("click", (e) => {
      this.trackProfiles.showNew = !this.trackProfiles.showNew;
      this.updateProfiles();
    });

    this.scene.view.on("key-down", async (e) => {
      const num = Number.parseInt(e.key);
      if (0 <= num && num <= 3) {
        this.trackProfiles.section = num;
        await this.updateProfiles();
        this.scene.view.goTo(sections[num].camera);
      }
    });

    this.updateProfiles();
  }

  public render() {
    const profiles = this.trackProfiles.render();

    return (
      <div>
        <div class="wrapper">
          <div class="grid-container">
            <div class="column-24 tablet-column-9 phone-column-6">
              <h1>Zurich - Milano by Train</h1>

              <div class="column-6 tablet-column-3 phone-column-2">
                <span class="placeholder">Track selector</span>
              </div>

              <div class="column-18 tablet-column-6 phone-pre-2 phone-column-2">
                <span class="placeholder phone-show">Time & Distance</span>
              </div>
            </div>

            <div class="column-24 tablet-column-3 phone-column-6">
              <span class="placeholder tablet-only" style="height: 50px;">
                Time & Distance (tablet)
              </span>
            </div>

            <div class="column-6 tablet-column-1 phone-column-1">
              <span class="placeholder tablet-hide">Time & Distance</span>
            </div>
          </div>
        </div>

        <div class="footer">
          <div class="grid-container">
            <div class="column-6 tablet-column-6 phone-column-1">
              <span class="placeholder tablet-hide">Legend</span>
            </div>

            <div class="column-18 tablet-column-6 phone-column-2">
              <span class="placeholder tablet-hide">Sections</span>
            </div>

            <div class="column-12 tablet-column-9 phone-column-3">
              <span class="placeholder tablet-only">Sections (Tablet)</span>
            </div>

            <div class="column-12 tablet-column-3 phone-column-3">
              <span class="placeholder tablet-only">Legend (Tablet)</span>
            </div>

            <div class="column-8 tablet-column-4 phone-column-2">
              <span class="placeholder phone-show">Play (Phone)</span>
            </div>

            <div class="column-8 tablet-column-4 phone-column-2">
              <span class="placeholder phone-show">Sections (Phone)</span>
            </div>

            <div class="column-8 tablet-column-4 phone-column-2">
              <span class="placeholder phone-show">Legend (phone)</span>
            </div>

            {/* Footer 2nd part */}

            <div class="column-6 tablet-column-3 phone-column-6">
              <span class="placeholder phone-hide">Play</span>
            </div>

            <div class="column-18 tablet-column-9 phone-column-6">
              <div class="profiles interactive">{profiles}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  updateProfiles = promiseUtils.debounce(async () => {
    tracks2D.removeAll();
    tracks3D.removeAll();

    const graphics = this.tracks.fadedTracks(this.trackProfiles.showNew, this.trackProfiles.section);

    tracks2D.addMany(graphics.map((g) => g.clone()));
    tracks3D.addMany(graphics);

    await Promise.all([
      await this.scene.highlightTracks3D(this.trackProfiles.showNew ? slowColorFaded : fastColorFaded)
      // await this.trackProfiles.update(this.showNew, this.section)
    ]);
  });

  toggle = document.getElementById("trackSwitchInput") as HTMLInputElement;
}

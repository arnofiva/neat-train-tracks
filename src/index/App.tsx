import Widget = require("esri/widgets/Widget");
import { property, subclass } from "esri/core/accessorSupport/decorators";

import { tsx } from "esri/widgets/support/widget";
import TrackProfiles from "./TrackProfiles";
import { scene } from "./Scene";
import Tracks from "./Tracks";
import promiseUtils = require("esri/core/promiseUtils");
import { slowColorFaded, fastColorFaded, Section } from "./constants";
import { tracks2D, tracks3D } from "./layers";
import TimeDistance from "./TimeDistance";

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
  timeDistance: TimeDistance;

  @property()
  scene = scene;

  @property()
  layout: "phone" | "tablet" | "desktop";

  constructor(props: AppProps) {
    super(props);
  }

  postInitialize() {
    this.trackProfiles = new TrackProfiles({
      tracks: this.tracks
    });

    this.timeDistance = new TimeDistance({
      profile: this.trackProfiles
    });

    window.addEventListener("resize", (e) => {
      this.evaluateLayout();
    });

    document.addEventListener("keydown", async (e) => {
      if (e.key === " ") {
        this.trackProfiles.selector.showNew = !this.trackProfiles.selector.showNew;
      } else {
        const num = Number.parseInt(e.key);
        await this.selectSection(num);
      }
    });

    this.trackProfiles.selector.watch("showNew", () => {
      this.updateProfiles();
    });

    this.evaluateLayout();
    this.updateProfiles();

    if (this.layout === "phone") {
      this.selectSection(2);
    }
  }

  public render() {
    const profiles = this.trackProfiles.render();

    const timeDistance = this.timeDistance.render();
    const selector = this.trackProfiles.selector.render();

    return (
      <div>
        <div class="wrapper">
          <div class="grid-container">
            <div class="column-24 tablet-column-9 phone-column-6">
              <h1>Zurich - Milan by Train</h1>

              <div class="column-6 tablet-column-3 phone-column-2">{selector}</div>

              <div class="column-18 tablet-column-6 phone-pre-2 phone-column-2 text-right">
                {this.layout === "phone" ? timeDistance : <div></div>}
              </div>
            </div>

            <div class="column-24 tablet-column-3 phone-column-6 text-right">{this.layout === "tablet" ? timeDistance : <div></div>}</div>

            <div class="column-6 tablet-column-1 phone-column-1">{this.layout === "desktop" ? timeDistance : <div></div>}</div>
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
              <div class="interactive">{profiles}</div>
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

  async selectSection(sectionIndex: number) {
    if (0 <= sectionIndex && sectionIndex <= 3) {
      let section = Section.fromIndex(sectionIndex);
      this.trackProfiles.section = section;
      await this.updateProfiles();
      this.scene.view.goTo(section.camera);
    }
  }

  bindTopPadding(e: any) {
    console.log("Bind", { e });
  }

  evaluateLayout() {
    const width = window.innerWidth;

    // this.scene.view.padding = {
    //   top,
    //   left
    // };

    if (860 <= width) {
      this.layout = "desktop";
      this.scene.view.padding = {
        top: 50,
        left: 220,
        bottom: 200
      };
    } else if (480 <= width) {
      this.layout = "tablet";
      this.scene.view.padding = {
        top: 60,
        left: 40,
        right: 40,
        bottom: 150
      };
    } else {
      this.layout = "phone";
      this.scene.view.padding = {
        top: 60,
        // left: 50,
        // right: 50,
        bottom: 150
      };
    }
  }
}

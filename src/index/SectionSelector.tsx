import { property, subclass } from "esri/core/accessorSupport/decorators";
import { tsx } from "esri/widgets/support/widget";
import Widget from "esri/widgets/Widget";
import { Section } from "./constants";

@subclass("app.sectionselector")
export default class SectionSelector extends Widget {
  @property()
  section = Section.TOTAL;

  render() {
    return (
      <div class="sections interactive">
        {/* <span class="placeholder">Sections</span> */}

        <div class="section">
          <span class="label" onclick={() => this.selectSection(Section.ZIMMERBERG)}>
            Zimmerberg (2002)
          </span>
        </div>
        <div class="section">
          <span class="label" onclick={() => this.selectSection(Section.GOTTHARD)}>
            Gotthard (2016)
          </span>
        </div>
        <div class="section">
          <span class="label" onclick={() => this.selectSection(Section.CENERI)}>
            Ceneri (2020)
          </span>
        </div>
      </div>
    );
  }

  private selectSection(section: Section) {
    if (this.section === section) {
      this.section = Section.TOTAL;
    } else {
      this.section = section;
    }
  }
}

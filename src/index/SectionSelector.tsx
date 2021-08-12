import { property, subclass } from "esri/core/accessorSupport/decorators";
import { tsx } from "esri/widgets/support/widget";
import Widget from "esri/widgets/Widget";
import { Section } from "./constants";

@subclass("app.sectionselector")
export default class SectionSelector extends Widget {
  @property()
  section = Section.TOTAL;

  render() {

    const sections = [Section.ZIMMERBERG, Section.GOTTHARD, Section.CENERI].map((section) => (
      <div class={`track-section ${section.label.toLowerCase()}`}>
        <span class="track-pin"></span>
        <span class="track-label" onclick={() => this.selectSection(section)}>
          {section.label} ({section.year})
        </span>
      </div>
    ));

    return <div class="track-sections interactive">{sections}</div>;
  }

  private selectSection(section: Section) {
    if (this.section === section) {
      this.section = Section.TOTAL;
    } else {
      this.section = section;
    }
  }
}

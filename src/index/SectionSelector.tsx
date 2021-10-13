import { property, subclass } from "esri/core/accessorSupport/decorators";
import { tsx } from "esri/widgets/support/widget";
import Widget from "esri/widgets/Widget";
import { Section } from "./constants";

@subclass("app.sectionselector")
export default class SectionSelector extends Widget {
  @property()
  section = Section.ALL;

  render() {
    const sections = [Section.ALL, Section.ZIMMERBERG, Section.GOTTHARD, Section.CENERI].map((section) => {
      const btnClass = `btn btn-small ${this.section === section ? "active" : ""} ${section.label.toLowerCase()}`;
      return (
        <button onclick={() => this.selectSection(section)} class={btnClass}>
          {section.label} {section !== Section.ALL ? `(${section.year})` : ""}
        </button>
      );
    });

    return <div class="track-sections interactive">{sections}</div>;
  }

  private selectSection(section: Section) {
    if (this.section === section) {
      this.section = Section.ALL;
    } else {
      this.section = section;
    }
  }
}

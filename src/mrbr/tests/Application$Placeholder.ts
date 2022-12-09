import { Mrbr_UI_Bootstrap_Controls_Placeholder } from "../ui/bootstrap/controls/Placeholder";
import { Mrbr_UI_Bootstrap_Controls_PlaceholderAnimations } from "../ui/bootstrap/controls/PlaceholderAnimations";
import { Mrbr_UI_Bootstrap_Controls_PlaceholderElementTypes } from "../ui/bootstrap/controls/PlaceholderElementTypes";
import { Mrbr_UI_Bootstrap_Controls_PlaceholderSizings } from "../ui/bootstrap/controls/PlaceholderSizings";
import { Mrbr_UI_Bootstrap_Controls_PlaceholderWidths } from "../ui/bootstrap/controls/PlaceholderWidths";
import { Mrbr_UI_Bootstrap_Utilities_Backgrounds } from "../ui/bootstrap/utilities/backgrounds";

export class Mrbr_Tests_Application$Placeholder {

  constructor() {
    const placeholder = Mrbr_UI_Bootstrap_Controls_Placeholder,
      placeholder1 = new placeholder("placeholder1", Mrbr_UI_Bootstrap_Controls_PlaceholderElementTypes.span, Mrbr_UI_Bootstrap_Controls_PlaceholderWidths.col9, Mrbr_UI_Bootstrap_Controls_PlaceholderSizings.lg)
        .Animation(Mrbr_UI_Bootstrap_Controls_PlaceholderAnimations.wave),
      placeholder2 = new placeholder()
        .Width(Mrbr_UI_Bootstrap_Controls_PlaceholderWidths.col3)
        .ElementType(Mrbr_UI_Bootstrap_Controls_PlaceholderElementTypes.span)
        .Sizing(Mrbr_UI_Bootstrap_Controls_PlaceholderSizings.xs)
        .Animation(Mrbr_UI_Bootstrap_Controls_PlaceholderAnimations.glow)
        .Colour(Mrbr_UI_Bootstrap_Utilities_Backgrounds.danger)

    Promise.all([placeholder1.initialise(), placeholder2.initialise()])
      .then(() => {
        placeholder1.mount("ph-1");
        placeholder2.mount("ph-2");
        setTimeout(() => {
          placeholder1.dispose();
        }, 6000);
      })
  }
}
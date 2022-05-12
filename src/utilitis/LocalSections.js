import ICard1 from "../Components/Sections/Card/ICard1";
import ICard2 from "../Components/Sections/Card/ICard2";
import IForm1 from "../Components/Sections/Contact/IForm1";
import IFooter1 from "../Components/Sections/Footer/IFooter1";
import IGallery1 from "../Components/Sections/Gallery/IGallery1";
import IHero1 from "../Components/Sections/Hero/IHero1";
import IHero2 from "../Components/Sections/Hero/IHero2";
import IHero3 from "../Components/Sections/Hero/IHero3";
import IHero4 from "../Components/Sections/Hero/IHero4";
import INavbar1 from "../Components/Sections/Navbar/INavbar1";
import ISlider1 from "../Components/Sections/Testimonals/Slider1";

export const LocalSections = [
  {
    group: "Navbar",
    variants: [{ c: INavbar1, id: "INavbar1" }],
  },
  {
    group: "Hero",
    variants: [
      { c: Hero1, id: "IHero1" },
      { c: Hero2, id: "IHero2" },
      { c: Hero3, id: "IHero3" },
      { c: Hero4, id: "IHero4" },
    ],
  },
  {
    group: "Card",
    variants: [
      { c: Card1, id: "ICard1" },
      { c: Card2, id: "ICard2" },
    ],
  },
  {
    group: "Gallery",
    variants: [{ c: IGallery1, id: "IGallery1" }],
  },
  {
    group: "Testimonal",
    variants: [{ c: ISlider1, id: "ISlider1" }],
  },
  {
    group: "Contact",
    variants: [{ c: IForm1, id: "IForm1" }],
  },
  {
    group: "Footer",
    variants: [{ c: IFooter1, id: "IFooter1" }],
  },
];

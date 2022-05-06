import Card1 from "../Components/Sections/Card/Card1";
import Card2 from "../Components/Sections/Card/Card2";
import Form1 from "../Components/Sections/Contact/Form1";
import Footer1 from "../Components/Sections/Footer/Footer1";
import Gallery1 from "../Components/Sections/Gallery/Gallery1";
import Hero1 from "../Components/Sections/Hero/Hero1";
import Hero2 from "../Components/Sections/Hero/Hero2";
import Hero3 from "../Components/Sections/Hero/Hero3";
import Hero4 from "../Components/Sections/Hero/Hero4";
import Navbar1 from "../Components/Sections/Navbar/Navbar1";
import Slider1 from "../Components/Sections/Testimonals/Slider1";

export const LocalSections = [
  {
    group: "Navbar",
    variants: [{ c: Navbar1, id: "Navbar1" }],
  },
  {
    group: "Hero",
    variants: [
      { c: Hero1, id: "Hero1" },
      { c: Hero2, id: "Hero2" },
      { c: Hero3, id: "Hero3" },
      { c: Hero4, id: "Hero4" },
    ],
  },
  {
    group: "Card",
    variants: [
      { c: Card1, id: "Card1" },
      { c: Card2, id: "Card2" },
    ],
  },
  {
    group: "Gallery",
    variants: [{ c: Gallery1, id: "Gallery1" }],
  },
  {
    group: "Testimonal",
    variants: [{ c: Slider1, id: "Slider1" }],
  },
  {
    group: "Contact",
    variants: [{ c: Form1, id: "Form1" }],
  },
  {
    group: "Footer",
    variants: [{ c: Footer1, id: "Footer1" }],
  },
];

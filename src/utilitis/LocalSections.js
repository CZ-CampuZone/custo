import { Card1 } from "../Components/Sections/Card/Card1";
import Card2 from "../Components/Sections/Card/Card2";
import Card3 from "../Components/Sections/Card/Card3";
import Hero6 from "../Components/Sections/Hero/Hero6";
import Hero5 from "../Components/Sections/Hero/Hero5";
import Hero4 from "../Components/Sections/Hero/Hero4";
import  Hero3  from "../Components/Sections/Hero/Hero3";
import { Hero2 } from "../Components/Sections/Hero/Hero2";
import { Hero1 } from "../Components/Sections/Hero/Hero1";
import { Navbar1 } from "../Components/Sections/Navbar/Navbar1";
import { Navbar2 } from "../Components/Sections/Navbar/Navbar2";
import { Slider1 } from "../Components/Sections/Testimonals/Slider1";
import Slider2 from "../Components/Sections/Testimonals/Slider2";
import { Gallery1 } from "../Components/Sections/Gallery/Gallery1";
import { Gallery2 } from "../Components/Sections/Gallery/Gallery2";
import Gallery3 from "../Components/Sections/Gallery/Gallery3";
import { Footer1 } from "../Components/Sections/Footer/Footer1";
import Footer2 from "../Components/Sections/Footer/Footer2";
import { Form1 } from "../Components/Sections/Contact/Form1";
import { Form2 } from "../Components/Sections/Contact/Form2";
import Form3 from "../Components/Sections/Contact/Form3";



export const LocalSections = [
  {
    group: "Navbar",
    variants: [{ c: Navbar1, id: "Navbar1" },{ c: Navbar2, id: "Navbar2" }],
  },
  {
    group: "Hero",
    variants: [{ c: Hero1, id: "Hero1" },{ c: Hero2, id: "Hero2" },{ c: Hero3, id: "Hero3" },{ c: Hero4, id: "Hero4" },{ c: Hero5, id: "Hero5" },{ c: Hero6, id: "Hero6" }],
  },
  {
    group: "Card",
    variants: [{ c: Card1, id: "Card1" },{ c: Card2, id: "Card2" },{ c: Card3, id: "Card3" }],
  },
  {
    group: "Gallery",
    variants: [{ c: Gallery1, id: "Gallery1" },{ c: Gallery2, id: "Gallery2" },{ c: Gallery3, id: "Gallery3" }],
  },
  {
    group: "Testimonal",
    variants: [{ c: Slider1, id: "Slider1" },{ c: Slider2, id: "Slider2" }],
  },
  {
    group: "Contact",
    variants: [{ c: Form1, id: "Form1" },{ c: Form2, id: "Form2" },{ c: Form3, id: "Form3" }],
  },
  {
    group: "Footer",
    variants: [{ c: Footer1, id: "Footer1" },{ c: Footer2, id: "Footer2" }],
  },
];

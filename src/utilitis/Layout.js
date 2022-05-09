import {Card1} from "../Components/Sections/Card/Card1";

import Form1 from "../Components/Sections/Contact/Form1";
import {Footer1} from "../Components/Sections/Footer/Footer1";
import {Gallery1} from "../Components/Sections/Gallery/Gallery1";
import {Hero1} from "../Components/Sections/Hero/Hero1";

import {Navbar1} from "../Components/Sections/Navbar/Navbar1";
import Slider1 from "../Components/Sections/Testimonals/Slider1";

export const Layout = [
  { c: Navbar1, id: "Navbar1" },
  { c: Hero1, id: "Hero1" },
  
  { c: Card1, id: "Card1" },
  // { c: Card2, id: "Card2" },
  { c: Gallery1, id: "Gallery1" },
  // { c: Slider1, id: "Slider1" },
  { c: Form1, id: "Form1" },
  { c: Footer1, id: "Footer1" },
];
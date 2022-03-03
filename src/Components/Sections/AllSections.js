import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import Navbar1 from "./Navbar/Navbar1";
import Hero1 from "./Hero/Hero1";
import Hero2 from "./Hero/Hero2";
import Hero3 from "./Hero/Hero3";
import Hero4 from "./Hero/Hero4";
import Form1 from "./Contact/Form1";
import Card1 from "./Card/Card1";
import Card2 from "./Card/Card2";
import Gallery1 from "./Gallery/Gallery1";
import Slider1 from "./Testimonals/Slider1";
import Footer1 from "./Footer/Footer1";

const AllSections = () => {
  const items = [
    {
      heading: "Menubar",
      content: [{ component: Navbar1, name: "Navbar_1" }],
    },
    {
      heading: "Hero",
      content: [
        { component: Hero1, name: "Hero _1" },
        { component: Hero2, name: "Hero _2" },
        { component: Hero3, name: "Hero _3" },
        { component: Hero4, name: "Hero _4" },
      ],
    },
    {
      heading: "Card",
      content: [
        { component: Card1, name: "Card _1" },
        { component: Card2, name: "Card _2" },
      ],
    },
    {
      heading: "Gallery",
      content: [{ component: Gallery1, name: "Gallery_1" }],
    },
    {
      heading: "Testimonals",
      content: [{ component: Slider1, name: "Slider_1" }],
    },
    {
      heading: "Contact",
      content: [{ component: Form1, name: "Form_1" }],
    },
    {
      heading: "Footer",
      content: [{ component: Footer1, name: "Footer_1" }],
    },
  ];
  return (
    <div className="all-section-list bg-light col-2 p-0">
      <h6 className="px-2 py-3 text-center text-uppercase">All Sections</h6>
      {/* allowMultipleExpanded */}
      {/* command for multiple expand - doesn't auto close */}
      <Accordion allowZeroExpanded>
        {items.map((item, index) => (
          <AccordionItem key={index}>
            <AccordionItemHeading>
              <AccordionItemButton>{item.heading}</AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              {item.content.map((section, index) => (
                <p key={index} className="inner-accordion-list">
                  {section.name}
                </p>
              ))}
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default AllSections;

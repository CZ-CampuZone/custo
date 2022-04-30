import React from "react";
import { useContext, useState } from "react";
import { HashLink } from "react-router-hash-link";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import { LocalSections } from "../../utilitis/LocalSections";
import AuthContext from "../../Context/Context";
const AllSections = (props) => {
  const ctx = useContext(AuthContext);
  return (
    <div className="all-section-list  col-2 p-0">
      <h6 className="px-2 py-3 text-center text-uppercase" style={{color:"#9e3a8ccc"}}>All Sections</h6>
      {/* allowMultipleExpanded */}
      {/* command for multiple expand - doesn't auto close */}
      <Accordion allowZeroExpanded>
        {LocalSections.map((item, index) => (
          <AccordionItem key={index}>
            <AccordionItemHeading>
              <AccordionItemButton>{item.group}</AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              {item.variants.map((section) => (
                <HashLink to={`#${section.id}`} key={section.id}>
                  <p key={section.id} className="inner-accordion-list">
                    {section.id}
                  </p>
                </HashLink>
              ))}
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default AllSections;

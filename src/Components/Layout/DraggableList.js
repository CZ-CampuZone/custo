import React, { useState, useContext } from "react";
import { useDrag } from "react-dnd";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import { LocalSections } from "../../utilitis/LocalSections";
import AuthContext from "../../Context/Context";

const DraggableList = (props) => {
  const ctx = useContext(AuthContext);
  const CreateComponent = (props) => {
    const [{ isDragging }, drag] = useDrag({
      item: { id: props.data.id, c: props.data.c, uniqId: props.data.id + ctx.layoutFlow?.length },
      type: "Object",
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    });
    const Component = props.data.c;
    return (
      <div
        className="m-4 p-3 border border-primary"
        id={props.data.id}
        ref={drag}
        style={{ zoom: "0.2" }}
      >
        <Component />
      </div>
    );
  };
  return (
    <>
      <div className="all-section-list  col-2 p-0">
        {/* <h6 className="px-2 py-3 text-center text-uppercase" style={{color:"#9e3a8ccc"}}>All Sections</h6> */}
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
                  <div key={section.id}>
                    <p className="pl-2 pb-0 inner-accordion-list">
                      {section.id}
                    </p>
                    <CreateComponent data={section} />
                  </div>
                ))}
              </AccordionItemPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </>
  );
};

export default DraggableList;

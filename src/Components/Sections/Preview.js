import { useContext, useState } from "react";
import { LocalSections } from "../../utilitis/LocalSections";
import AuthContext from "../../Context/Context";

const Preview = (props) => {
  const ctx = useContext(AuthContext);
  const CreateComponent = ({ component }) => {
    const Component = component;
    return <Component />;
  };
  return (
    <div
      className="col-10 p-2 special-scroll"
      style={{
        height: "91vh",
        overflowX: "hidden",
        overflowY: "auto",
        scrollBehavior: "smooth",
      }}
    >
      <h3 className="text-center p-2" style={{ color: "var(--primary)" }}>
        Fickle provides you with various options
      </h3>
      {LocalSections.map((single, index) => (
        <div style={{boxShadow:"rgba(0, 0, 0, 0.1) 0px 10px 50px"}} className="p-2 rounded  my-2" key={index * 11}>
          <h6 style={{color:"rgba(158, 58, 140, 0.8)"}} className=" text-capitalize px-2 py-3">
            {single.group}
          </h6>
          <div className="row">
            {single.variants.map((section) => (
              <div key={section.id} className="col-6 p-1">
                <div
                  className="p-2 border"
                  id={section.id}
                  style={{ zoom: "0.5" }}
                >
                  <CreateComponent component={section.c} />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Preview;

import React, { useContext, useEffect } from "react";
import AuthContext from "../../Context/Context";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ReactComponent as SectionIcon } from "../../Assests/sections.svg";
import { ReactComponent as LayoutIcon } from "../../Assests/layout.svg";
import { ReactComponent as EditIcon } from "../../Assests/edit.svg";

const StyleGuide = () => {
  const ctx = useContext(AuthContext);
  useEffect(() => {
    // if (ctx.getWebstieData === null) {
    //   ctx.getWebstieData();
    //   ctx.getUserData();
    //   ctx.getLayoutData();
    //   setTimeout(() => {
    //     ctx.formLayout();
    //   }, 3000);
    //  }
    ctx.updateIsEditable(false);
  }, []);

  const data = [
    {
      id: 0,
      img: EditIcon,
      title: "Edit",
      desc: "In this menu we could update images and contents available in the components which we placed in the Layout section."
    },
    {
      id: 1,
      img: LayoutIcon,
      title: "Layouts",
      desc: "In this menu we could drag and drop our desired components to add and arrange it as required. Also, we could delete the component if not needed."
    },
  
    {
      id: 2,
      img: SectionIcon,
      title: "Sections",
      desc: "In this menu we could have a preview of all the available components that could be added to our web site."
    }
  ]



  return <>
    <div className="container my-2 style-guide">
      <h2 className="text-center " style={{color: "var(--primary)"}}> Guidelines</h2>

      <div class="content">
        {/* <h5 className="text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, at! Nulla</h5> */}
        <div class="cards">
          
            
              
                <div v-for="data in datas" class="card my-2">
                  <div className="d-flex">
                
                  <SectionIcon className="p-2"  style={{width:"4%",fill:"#9e3a8ccc",boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",borderRadius:"100px"}}/>
                    
                   
                    <p class="title mt-2 mx-2 ">Sections</p>
                  </div>
                  <p style={{fontSize:"18px"}}>In this menu we could drag and drop our desired components to add and arrange it as required. Also, we could delete the component if not needed.</p>
                </div>
                <div v-for="data in datas" class="card my-2">
                  <div className="d-flex">
                
            <LayoutIcon className="p-2"  style={{width:"4%",fill:"#9e3a8ccc",boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",borderRadius:"100px"}}/>
                    
                   
                    <p class="title mt-2 mx-2 ">Layouts</p>
                  </div>
                  <p style={{fontSize:"18px"}}>In this menu we could have a preview of all the available components that could be added to our web site</p>
                </div>
                <div v-for="data in datas" class="card my-2">
                  <div className="d-flex">
            
                <EditIcon className="p-2"  style={{width:"4%",fill:"#9e3a8ccc",boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",borderRadius:"100px"}}/>
            
                    
                    
                   
                    <p class="title mt-2 mx-2 ">Edit</p>
                  </div>
                  <p style={{fontSize:"18px"}}>In this menu we could update images and contents available in the components which we placed in the Layout section.</p>
                </div>
            
            
        



        </div>
      </div>

    </div>


  </>;
};

export default StyleGuide;

import React, { useContext, useEffect } from "react";
import AuthContext from "../../Context/Context";

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
      img: "https://s2.svgbox.net/illlustrations.svg?ic=burger&color=000000",
      title: "Edit",
      desc: "In this menu we could update images and contents available in the components which we placed in the Layout section."
    },
    {
      id: 1,
      img: "https://s2.svgbox.net/illlustrations.svg?ic=auntum&color=000000",
      title: "Layouts",
      desc: "In this menu we could drag and drop our desired components to add and arrange it as required. Also, we could delete the component if not needed."
    },
  
    {
      id: 2,
      img: "https://s2.svgbox.net/illlustrations.svg?ic=coffee&color=000000",
      title: "Sections",
      desc: "In this menu we could have a preview of all the available components that could be added to our web site."
    }
  ]



  return <>
    <div className="container my-2 style-guide">
      <h2 className="text-center " style={{color: "var(--primary)"}}> Guidelines</h2>

      <div class="content">
        <h5 className="text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, at! Nulla</h5>
        <div class="cards">
          {data.reverse().map((data) => {
            return (
              <>
                <div v-for="data in datas" class="card my-2">
                  <div className="d-flex">
                    <img class="icon " src={data.img} alt="" />
                    <p class="title mt-2 mx-2 ">{data.title}</p>
                  </div>
                  <p style={{fontSize:"18px"}}>{data.desc}</p>
                </div>
              </>
            )
          })}



        </div>
      </div>

    </div>


  </>;
};

export default StyleGuide;

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
      img: "https://s2.svgbox.net/illlustrations.svg?ic=auntum&color=000000",
      title: "Layouts",
      desc: "Loremsantium doloremque quae nam, laboriosam dolore nihil beatae modi nostrum? Loremsantium doloremque quae nam, laboriosam dolore nihil beatae modi nostrum? Loremsantium doloremque quae nam, laboriosam dolore nihil beatae modi nostrum?"
    },
    {
      id: 1,
      img: "https://s2.svgbox.net/illlustrations.svg?ic=burger&color=000000",
      title: "Edit",
      desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptaosam dolore nihil beatae modi nostrum? Loremsantium doloremque quae nam, laboriosam dolore nihil beatae modi nostrum?Loremsantium doloremque quae nam, laboriosam dolore nihil beatae modi nostrum?"
    },
    {
      id: 2,
      img: "https://s2.svgbox.net/illlustrations.svg?ic=coffee&color=000000",
      title: "Sections",
      desc: "Lorem ipsum dolor sit amet, conosam dolore nihil beatae modi nostrum? Loremsantium doloremque quae nam, laboriosam dolore nihil beatae modi nostrum?Loremsantium doloremque quae nam, laboriosam dolore nihil beatae modi nostrum?"
    }
  ]



  return <>
    <div className="container my-2 style-guide">
      <h2 className="text-center text-danger"> Guidelines</h2>

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
                  <small class="desc">{data.desc}</small>
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

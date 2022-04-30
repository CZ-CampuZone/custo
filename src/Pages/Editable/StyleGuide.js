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


    <div class="container my-5">
    <div class="text-center mb-5">
      <span class="text-secondary">STEP</span>
      <h1 class="text-capitalize font-weight-bold">how it <span className="text-danger" >Works?</span></h1>
    </div>

    <div class="col-12 col-md-8 mx-auto">
      
      <div class="d-flex my-4 align-items-start">
        <div class="mr-3 text-center mt-2">
          <div class="p-4 rounded-circle text-white font-weight-bold d-flex align-items-center justify-content-center" style={{height: "40px", width:"40px", backgroundColor: "#dc3545"}}>1</div>
          <span class="text-secondary">STEP</span>
        </div>
        <div class="rounded bg-light p-4">
          <h5 class="mb-3" style={{fontWeight:600}}>Your Headline Here!</h5>
          <p class="text-secondary font-weight-light">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem aperiam temporibus sequi reprehenderit, maxime at cupiditate officia ipsam ipsum.</p>
        </div>
      </div>

      <div class="d-flex my-4 align-items-start">
        <div class="mr-3 text-center mt-2">
          <div class="p-4 rounded-circle text-white font-weight-bold d-flex align-items-center justify-content-center" style={{height: "40px", width:"40px", backgroundColor: "#dc3545"}}>2</div>
          <span class="text-secondary">STEP</span>
        </div>
        <div class="rounded bg-light p-4">
          <h5 class="mb-3" style={{fontWeight:600}}>Your Headline Here!</h5>
          <p class="text-secondary font-weight-light">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem aperiam temporibus sequi reprehenderit, maxime at cupiditate officia ipsam ipsum.</p>
        </div>
      </div>

      <div class="d-flex my-4 align-items-start">
        <div class="mr-3 text-center mt-2">
          <div class="p-4 rounded-circle text-white font-weight-bold d-flex align-items-center justify-content-center" style={{height: "40px", width:"40px", backgroundColor: "#dc3545"}}>3</div>
          <span class="text-secondary">STEP</span>
        </div>
        <div class="rounded bg-light p-4">
          <h5 class="mb-3" style={{fontWeight:600}}>Your Headline Here!</h5>
          <p class="text-secondary font-weight-light">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem aperiam temporibus sequi reprehenderit, maxime at cupiditate officia ipsam ipsum.</p>
        </div>
      </div>

    </div>
  </div>
  </>;
};

export default StyleGuide;

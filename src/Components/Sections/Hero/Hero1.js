import React from "react";


const Hero1 = () => {

  const data = {
    container: {
      style: "container",
      value: "",
    },
   heading :{
     style:"",
     value:"Divi Daycare",
   },
   paragraph :{
     style:"",
     value:"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout It is a long established fact that a reader will be distracted by the  readable content of a page when looking at its layout"
   }
  };

  return <>
      <div class="hero" id="#Home">
      <div class={data.container.style}>
        <img src="/Images/text.png" class="pretext" />
      </div>
      <div class="texter container">
        <h2 className={data.heading.style}    >{data.heading.value}</h2>
        <p className={data.paragraph.style}  >{data.paragraph.value}</p>
        <button type="button" class="btn">
          GET STARTED
        </button>
      </div>
    
      <img
        src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIydnciIHZpZXdCb3g9IjAgMCAxMjgwIDE0MCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSIjZmZmZmZmIj48cGF0aCBkPSJNMTI4MCA4NmMtMTkuOS0xNy4yMS00MC4wOC0zOS42OS03OS44OS0zOS42OS01Ny40OSAwLTU2LjkzIDQ2LjU5LTExNSA0Ni41OS01My42MSAwLTU5Ljc2LTM5LjYyLTExNS42LTM5LjYyQzkyMy43IDUzLjI3IDkyNC4yNiA4NyA4NTMuODkgODdjLTg5LjM1IDAtNzguNzQtODctMTg4LjItODdDNTU0IDAgNTQzLjk1IDEyMS44IDQyMy4zMiAxMjEuOGMtMTAwLjUyIDAtMTE3Ljg0LTU0Ljg4LTE5MS41Ni01NC44OC03Ny4wNiAwLTEwMCA0OC41Ny0xNTEuNzUgNDguNTctNDAgMC02MC0xMi4yMS04MC0yOS41MXY1NEgxMjgweiIvPjwvZz48L3N2Zz4"
        class="wave"
      />
      <img src="/Images/1.png" class="house" />
    </div>
    
  
  </>;
};

export default Hero1;

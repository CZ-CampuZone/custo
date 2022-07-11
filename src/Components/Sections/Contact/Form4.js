import { makeStyles } from "@mui/styles";
import clsx from "clsx";
import cat3 from "../../../Assests/images/cat3.jpg";
import learn from "../../../Assests/images/learn.png"

const useStyles = makeStyles(() => ({
    totalform:{
        width:"100%",
        marginLeft:"10%"
    },
  formback: {
    background: "#FEF6FF",
    borderRadius: "8px",
    padding: "30px",
    width: "100%",
    borderTop:"2px",
    borderTopColor:"#000"
  },
  textdec: {
    color: "#4B4453",
    fontSize: "15px",
  },
  textdec2:{
    color:"#9467DE"
  },
  btnclr: {
    color: "#fff",
    background: "#8E41A6",
  },
  image:{
    width:"100px",
    height:"100px"

  },
  firstbg:{
    background:"#9467DE",
    borderRadius: "8px",

    
  },
  image2:{
    justifyContent:"center",
    marginTop:"30%"
  }

  
}));
export const Form4 = () => {
  const classes = useStyles();
  return (
    <>
    <div className={clsx(classes.totalform," container row ")}>
        <div className={clsx(classes.firstbg,"col  ")}>
            <div className="row d-flex justify-content-center align-items-center">
                <h1 className="mt-4 text-white">
                OPEN FOR REGISTRATION
            </h1>
            </div>
            <div className="row">
            <img className={classes.image2} src={learn}/>
            </div>
           
        </div>
        <div className="col">
        <div className={clsx(classes.formback, "container")}>
        <div className="text-center">
          <h3 className={clsx(classes.textdec2,"mb-3")}>ADMISSION FORM</h3>
         
        </div>
        <div className="container ">
          <form>
            <div class="text-center">
              <img src={cat3} class={clsx(classes.image,"rounded")} alt="..." />
            </div>
            <div class="form-row mt-3">
              <div class="col">
                <label className={classes.textdec} for="formGroupExampleInput">
                  Student Name
                </label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Student Name"
                />
              </div>
            </div>
            <div class="form-row mt-3">
            <div class="col-md-6">
                <label className={classes.textdec} for="formGroupExampleInput">
                  Previous school
                </label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Previous school"
                />
              </div>
              <div class="form-group col-md-6">
                <label className={classes.textdec} for="inputState">
                  Class going for
                </label>
                <select id="inputState" class="form-control">
                  <option selected>Choose...</option>
                  <option>...</option>
                </select>
              </div>
            </div>
            <div class="form-row mt-3">
              <div class="col">
                <label className={classes.textdec} for="formGroupExampleInput">
                  Father's Name
                </label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Father's Name"
                />
              </div>
            </div>
            <div class="form-row mt-3">
              <div class="col">
                <label className={classes.textdec} for="formGroupExampleInput">
                  Email Id
                </label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Email Id"
                />
              </div>
            </div>
            <div class="form-row mt-3">
              <div class="col">
                <label className={classes.textdec} for="formGroupExampleInput">
                  Mobile Number
                </label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Mobile Number "
                />
              </div>
            </div>
            <div class="form-row mt-3">
              <div class="col form-group">
                <label
                  className={classes.textdec}
                  for="exampleFormControlTextarea1"
                >
                  Anything want to ask?
                </label>
                <textarea
                  class="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                ></textarea>
              </div>
            </div>
            <div className="text-center">
              <button type="button" class={clsx(classes.btnclr, "btn  btn-sm")}>
                Send Application
              </button>
            </div>
          </form>
        </div>
      </div>
        </div>
    </div>
     
    </>
  );
};

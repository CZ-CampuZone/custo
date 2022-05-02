import { useState, useContext } from "react";
import AuthContext from "../../Context/Context";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../services/firebase";
import Loader from "../../loader/Loader";

const Login = (props) => {
  const ctx = useContext(AuthContext);
  const [modalstate, setModalstate] = useState(false);
  const [loading, setloading] = useState(false);
  const [error, setError] = useState(null);
  const [userCred, setUserCred] = useState({
    email: "",
    password: "",
  });
  const [user, setUser] = useState("");
  const [forgotPassword, setForgotpassword] = useState(false);
  const navigate = useNavigate();
  const titleCase = (str) => {
    return str
      .split("-")
      .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };
  onAuthStateChanged(auth, (currentuser) => {
    setUser(currentuser);
  });
  function resetHanler(e) {
    e.preventDefault();
    setloading(true);
    if (userCred.email === "") {
      setError("Enter Email");
      setloading(false);
    }
    else {
      sendPasswordResetEmail(auth, userCred.email)
        .then(() => {
          alert("verificaton email was sent")
        })
        .catch((error) => {
          console.log("error", error);
          setloading(false);
          const errorCode = error.code;
          const message = errorCode.substring(5);
          setError(titleCase(message));
        });

    }
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    setModalstate(false);
    setloading(true);
    if (userCred.email === "") {
      setError("Enter Email");
      setloading(false);
    } else if (userCred.password === "") {
      setError("Enter Password");
      setloading(false);
    } else {
      signInWithEmailAndPassword(auth, userCred.email, userCred.password)
        .then((res) => {
          setloading(false);
          console.log("success");
          ctx.setUserId(res.user.uid);

          setTimeout(() => {
            user && navigate(`/${res.user.uid}/home`);

          }, 1000);
        })
        .catch((error) => {
          console.log("error", error);
          setloading(false);
          const errorCode = error.code;
          const message = errorCode.substring(5);
          setError(titleCase(message));
        });
    }
  };

  const onChangeHandler = (event) => {
    event.preventDefault();
    let val = event.target.value;
    setUserCred((prevState) => {
      return {
        ...prevState,
        [event.target.name]: val,
      };
    });
  };
  return (
    <>
     
      {loading && (
        <>
          <Loader />
        </>
      )}
      <div className=" Login-Edit overlay" style={{ height: "100vh" }}>
        <div>
          <nav class="navbar d-flex navbar-light headercol ">
            <a class="navbar-brand" href="#">
              <img
                src="/docs/4.0/assets/brand/bootstrap-solid.svg"
                width="30"
                height="30"
                alt=""
              />
            </a>

            <h2 className="text-white Login-name" style={{ width: "55%" }}>Fickle</h2>

            {modalstate ? (
              <div class=" shadow position-absolute" style={{ zIndex: "999999999", left: "0", right: "0", top: "0", bottom: "0" }} >
                <div class="modal-dialog modal-login">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h4 class="modal-title">Hello Buddy!</h4>
                      <button
                        type="button"
                        class="close"
                        data-dismiss="modal"
                        aria-hidden="true"
                        onClick={() => { setModalstate(false) }}
                      >
                        &times;
                      </button>
                    </div>
                    <div class="modal-body">
                      <form
                        action="/examples/actions/confirmation.php"
                        method="post"
                      >
                        <div class="form-group">
                          <input
                            type="text"
                            class="form-control"
                            name="email"
                            placeholder=" Enter Email"
                            required="required"
                            value={userCred.email}
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"

                            onChange={onChangeHandler}
                          />
                        </div>
                     {forgotPassword === false && <div class="form-group">
                          <input
                            type="password"
                            class="form-control"
                            name="password"
                            placeholder="Enter Password"
                            required="required"
                            value={userCred.password}
                            id="exampleInputPassword1"

                            onChange={onChangeHandler}
                          />
                        </div>}
                        {error && (
                          <small className=" text-right d-block ">
                            {error}
                          </small>
                        )}
                        <div class="form-group">
                          <button onClick={forgotPassword?resetHanler:handleLogin}
                            type="submit"
                            class="btn btn-primary btn-lg btn-block login-btn"
                          >
                           {forgotPassword?"Sent":"Login"}
                          </button>
                        </div>
                      </form>
                    </div>
                    <div class="modal-footer"onClick={()=>{forgotPassword?setForgotpassword(false):setForgotpassword(true)}}>
                    <p >   {forgotPassword?"Back to login":"Forgot Password"}</p> 
                    </div>
                  </div>
                </div>
              </div>
            ) : (<></>)}
          </nav>
        </div>
        <div></div>
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-5 marg">
            <h2 className="content">
              Your<br/> Business<br/>  At<br/>  Your<br/>  Fingertips
            </h2>
            {/* <p className="align-top pcolor mt-3">
              Create the perfect palette or get inspired by thousands of
              beautiful color schemes.
            </p> */}
            <button onClick={() => { setModalstate(true) }} type="button" href="#myModal" class="btn px-4 btntclr mt-3" data-toggle="modal">
              Login
            </button>
          </div>
          <div className="col-md-6 p-4 marg2">
            <img src="https://s3-alpha.figma.com/hub/file/314494079/976a59d3-cf17-4dcc-a3d8-6651da344ee4-cover" />
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;

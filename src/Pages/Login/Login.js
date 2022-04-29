import { useState, useContext } from "react";
import AuthContext from "../../Context/Context";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../services/firebase";
import Loader from "../../loader/Loader";

const Login = (props) => {
  const ctx = useContext(AuthContext);
  const [loading, setloading] = useState(false);
  const [error, setError] = useState(null);
  const [userCred, setUserCred] = useState({
    email: "",
    password: "",
  });
  const [user, setUser] = useState("");
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
  const handleLogin = async (e) => {
    e.preventDefault();
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
      {/* {loading && (
        <>
          <Loader />
        </>
      )}
      <div className="headercol"> 
      <div className="Lg-form overlay  w-100 d-flex align-items-center justify-content-center">
        <div>
          
        </div>
        <div className=" cz-form col-lg-4 col-sm-5 p-5  bg-white ">
          <img
            src="https://www.campuzone.com/logo2.png"
            className="rounded mx-auto d-block align-items-center w-25"
            alt="..."
          />
          <form>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1 text-center ">
                Email address
              </label>
              <input
                type="email"
                name="email"
                required
                value={userCred.email}
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                onChange={onChangeHandler}
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="exampleInputPassword1 text-center ">
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                className="form-control"
                value={userCred.password}
                id="exampleInputPassword1"
                placeholder="Password"
                onChange={onChangeHandler}
              />
            </div>
            {error && (
              <small className="text-danger text-right d-block pt-2">
                {error}
              </small>
            )}
            <div className="btnContainer ">
              <button onClick={handleLogin} className="btn  mt-2 px-3">
                Log in
              </button>
            </div>
          </form>
        </div>
        </div>
      </div> */}
      <div className="overlay height">
        <div>
          <nav class="navbar navbar-light headercol">
            <a class="navbar-brand" href="#">
              <img
                src="/docs/4.0/assets/brand/bootstrap-solid.svg"
                width="30"
                height="30"
                alt=""
              />
            </a>
            
            <div class="text-center">
            <button type="button" class="btn btn-light" href="#myModal" data-toggle="modal">Login</button>
              
            </div>

            <div id="myModal" class="modal fade">
              <div class="modal-dialog modal-login">
                <div class="modal-content">
                  <div class="modal-header">
                    <h4 class="modal-title">Hello Buddy!</h4>
                    <button
                      type="button"
                      class="close"
                      data-dismiss="modal"
                      aria-hidden="true"
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
                          name="username"
                          placeholder="Username"
                          required="required"
                        />
                      </div>
                      <div class="form-group">
                        <input
                          type="password"
                          class="form-control"
                          name="password"
                          placeholder="Password"
                          required="required"
                        />
                      </div>
                      <div class="form-group">
                        <button
                          type="submit"
                          class="btn btn-primary btn-lg btn-block login-btn"
                        >
                          Login
                        </button>
                      </div>
                    </form>
                  </div>
                  <div class="modal-footer">
                    <a href="#">Forgot Password?</a>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
        <div></div>
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-5 marg">
            <h2 className="content">
              The super fast color palettes generator!
            </h2>
            <p className="align-top pcolor mt-3">
              Create the perfect palette or get inspired by thousands of
              beautiful color schemes.
            </p>
            <button type="button" class="btn btntclr mt-3">
              Explore trending templates
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

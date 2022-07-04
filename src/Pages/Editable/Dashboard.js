import React, { useContext, useEffect, useState } from "react";
import {
  Navigate,
  Outlet,
  Route,
  Routes,
  useNavigate,
  useParams,
} from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Landing from "./Landing";
import StyleGuide from "./StyleGuide";
import Sections from "./Sections";
import Layout from "./Layout";
import Edit from "./Edit";
import Settings from "./Settings";
import AuthContext from "../../Context/Context";
import Gallery from "./Gallery";
import Loader from "../../loader/Loader";
import { Messages } from "./Message";

const Dashboard = (props) => {
  const [loading, setLoading] = useState(true);
  let params = useParams();
  const navigate = useNavigate();
  const ctx = useContext(AuthContext);
  useEffect(() => {
    ctx.getWebsiteData();
    ctx.getUserData();
    ctx.getLayoutData();
    setLoading(false);

    window.addEventListener("beforeunload", alertUser);
    return () => {
      window.removeEventListener("beforeunload", alertUser);
      navigate("/admin");
    };
  }, []);

  const alertUser = (e) => {
    e.preventDefault();
    e.returnValue = "";
  };
  let ui = null;
  if (params.id === ctx.userId) {
    ui = (
      <>
        {loading && <Loader />}
        <div className="main_container row justify-content-end">
          <Sidebar />
          <div className="col-md-9 col-lg-10 right_col p-0 pl-1" role="main">
            {/* Top Navigation */}
            <Navbar />
            <Routes>
              <Route path="settings" element={<Settings />}></Route>
              <Route path="gallery" element={<Gallery />}></Route>
              <Route path="edit" element={<Edit />}></Route>
              <Route path="layout" element={<Layout />}></Route>
              <Route path="sections" element={<Sections />}></Route>
              <Route path="styleguide" element={<StyleGuide />}></Route>
              <Route path="messages" element={<Messages />}></Route>
              <Route index path="home" element={<Landing />}></Route>
            </Routes>
          </div>
        </div>
      </>
    );
  } else {
    ctx.logout();
    ui = <Navigate to={`/login`}></Navigate>;
  }
  return ui;
};

export default Dashboard;

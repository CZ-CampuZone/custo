import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../services/firebase";
import { Layout } from "../utilitis/Layout";
import {
  doc,
  getDoc,
  updateDoc,
  collection,
  getDocs,
} from "firebase/firestore";
import { db } from "../services/firebase";
import { updatePassword } from "firebase/auth";
const AuthContext = React.createContext({
  user: "",
  userId: "",
  layoutFlow: [],
  isLoggedIn: false,
  isEditable: Boolean,
  websiteData: {},
  userWebsiteData: () => {},
  userLayoutData: () => {},
  getWebsiteData: () => {},
  getUserData: () => {},
  getLayoutData: () => {},
  setUserId: () => {},
  updateUser: () => {},
  updateData: () => {},
  deleteData: () => {},
  updateIsEditable: () => {},
  updateLayout: () => {},
  addLayout: () => {},
  getFormData: () => {},
  messageData: [],
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  let navigate = useNavigate();
  const [websiteData, setWebsiteData] = useState({});
  const [user, setUser] = useState("");
  const [userId, setId] = useState(localStorage.getItem("EditableCampuz"));
  const [layoutData, setLayoutData] = useState(null);
  const [layoutFlow, setLayoutFlow] = useState(null);
  const [isEditable, setIsEditable] = useState(false);
  const [messageData, setMessageData] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(userId ? true : false);

  useEffect(() => {}, []);
  // get website data for end user
  async function userWebsiteData() {
    const querySnapshot = await getDocs(collection(db, "websitedata"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      setWebsiteData(doc.data().websiteData);
    });
  }
  // get website layout information for end user
  async function userLayoutData() {
    const querySnapshot = await getDocs(collection(db, "layout"));
    querySnapshot.forEach((doc) => {
      let val = doc.data();
      setLayoutData(val);
      var newArr = [];
      for (var i = 0; i < val.layout.length; i++) {
        let tempArr = Layout.filter((x) => val.layout[i].id === x.id);
        newArr = newArr.concat(tempArr);
      }
      console.log(newArr);
      let finalArray = newArr?.map((item, i) =>
        Object.assign({}, item, val.layout[i])
      );
      setLayoutFlow(finalArray);
    });
  }
  // function to get website data by admin
  async function getWebsiteData() {
    const docRef = doc(db, "      ", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setWebsiteData(docSnap.data().websiteData);
    } else {
      console.log("No such document!");
    }
  }
  // Get Contact Form Data
  async function getFormData() {
    const docRef = doc(db, "formdata", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setMessageData(docSnap.data().message);
    } else {
      console.log("No such document!");
    }
  }
  //
  // function to get user data of admin
  async function getUserData() {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setUser(docSnap.data());
    } else {
      console.log("No such document!");
    }
  }
  // function to get website layout information for admin
  async function getLayoutData() {
    const docRef = doc(db, "layout", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      let val = docSnap.data();
      setLayoutData(val);
      var newArr = [];
      for (var i = 0; i < val.layout.length; i++) {
        let tempArr = Layout.filter((x) => val.layout[i].id === x.id);
        newArr = newArr.concat(tempArr);
      }
      console.log(newArr);
      let finalArray = newArr?.map((item, i) =>
        Object.assign({}, item, val.layout[i])
      );
      setLayoutFlow(finalArray);
    } else {
      console.log("No such document!");
    }
  }
  console.log("layout", layoutFlow);

  const updateData = (data, Identifier) => {
    console.log(Identifier, data);
    // if (Array.isArray(data) === true) {
    //   console.log("Array", Identifier, data);
    websiteData[Identifier] = data;
    // upadte in db
    updateDoc(doc(db, "websitedata", userId), {
      websiteData: websiteData,
    });
  };

  const deleteData = (data) => {
    let tempArr = Object.keys(websiteData);
    tempArr = tempArr.filter((e) => e !== data);
    console.log(data, tempArr);

    let updatedData = {};
    tempArr.forEach((value) => {
      updatedData[value] = websiteData[value];
      return true;
    });

    setWebsiteData(updatedData);
  };

  const updateUser = (data) => {
    setUser(data);
    console.log("procees1", data);
    updateDoc(doc(db, "users", userId), data);

    // function to update new passsowrd
    if (data.newPassword !== "") {
      updatePassword(auth.currentUser, data.newPassword)
        .then(() => {
          alert("New password was changed");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  // function to update layout array
  const updateLayout = (data) => {
    setLayoutFlow(data);
    var tempArr = [];
    for (var i = 0; i < data.length; i++) {
      let newData = {
        id: data[i].id,
        uniqId: data[i].uniqId,
      };
      tempArr = tempArr.concat(newData);
    }
    setLayoutData({
      layout: tempArr,
    });
  };

  const addLayout = (data) => {
    console.log("Added", data);
    setLayoutFlow((prevState) => {
      return [...prevState, data];
    });
  };

  // toggles between editing
  const updateIsEditable = (data) => {
    setIsEditable(data);
  };
  // function to update & set userId in local storage && session storage
  const setUserId = (uId) => {
    setId(uId); // set userId
    setIsLoggedIn(true);
    sessionStorage.setItem("EditableCampuz", uId);
    localStorage.setItem("EditableCampuz", uId);
  };
  // logout function
  const logoutHandler = () => {
    auth
      .signOut() // end user session in firebase
      .then(() => {
        setIsLoggedIn(false);
        setId(); // empty user Id
        console.log("Signed out successfully!!!");
        sessionStorage.clear("editablecampuz"); // removes item from session storage
        localStorage.clear("editablecampuz"); // removes item from local storage
        navigate("/login", { replace: true });
      })
      .catch((e) => console.log(e));
  };

  return (
    <AuthContext.Provider
      value={{
        setUserId: setUserId,
        logout: logoutHandler,
        userId: userId,
        user: user,
        websiteData: websiteData,
        layoutFlow: layoutFlow,
        layoutData: layoutData,
        isLoggedIn: isLoggedIn,
        isEditable: isEditable,
        updateIsEditable: updateIsEditable,
        userWebsiteData: userWebsiteData,
        userLayoutData: userLayoutData,
        getWebsiteData: getWebsiteData,
        getUserData: getUserData,
        getLayoutData: getLayoutData,
        updateUser: updateUser,
        updateData: updateData,
        deleteData: deleteData,
        updateLayout: updateLayout,
        addLayout: addLayout,
        getFormData: getFormData,
        messageData: messageData,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

import {
  collection,
  getDoc,
  setDoc,
  getDocs,
  doc,
  updateDoc,
  deleteField,
  FieldValue,
  arrayRemove,
} from "firebase/firestore";
import {db} from "../../services/firebase";
import "./Messages.css";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../Context/Context";
export const Messages = () => {
  const ctx = useContext(AuthContext);
  useEffect(() => {
    ctx.getFormData();
  }, []);
  console.log(ctx.messageData);

  function removehol(e) {
    console.log(e, "data");
    updateDoc(doc(db, "formdata", ctx.userId), {
     message: posts.filter((x) => x.id !== e),
    })
      .then(() => {
        alert("Message was removed");
        ctx.getFormData();
      })
      
  }

 
  const [posts, SetPosts] = useState([]);
  const [postPerPage, SetPostPerPage] = useState(10);
  const [currentPage, SetCurrentPage] = useState(1);
  console.log(posts);
  
  useEffect(() => {
    SetPosts(ctx.messageData);
  }, [ctx.messageData]);
  const [pageItem, SetPageItem] = useState({
    start: 0,
    end: postPerPage,
  });

  const onPageChangeEvent = (start, end) => {
    SetPageItem({
      start: start,
      end: end,
    });
  };

  const OnPerPostChangeEvent = (e) => {
    SetPostPerPage(e.target.value);
    SetCurrentPage(1);
  };

  const numOfPages = Math.ceil(posts.length / postPerPage);
  // console.log(numOfPages);

  const numOfButtons = [];
  for (let i = 1; i <= numOfPages; i++) {
    numOfButtons.push(i);
  }

  const prevPageClick = () => {
    if (currentPage === 1) {
      SetCurrentPage(currentPage);
    } else {
      SetCurrentPage(currentPage - 1);
      window.scrollTo(0, 0);
    }
  };

  const nextPageClick = () => {
    if (currentPage === numOfButtons.length) {
      SetCurrentPage(currentPage);
    } else {
      SetCurrentPage(currentPage + 1);
      window.scrollTo(0, 0);
    }
  };
  



  const [arrOfCurrButtons, setArrOfCurrButtons] = useState([]);

  useEffect(() => {
    let tempNumberOfButtons = [...arrOfCurrButtons];

    let dotsInitial = "...";
    let dotsLeft = "... ";
    let dotsRight = " ...";

    if (numOfButtons.length < 6) {
      tempNumberOfButtons = numOfButtons;
    } else if (currentPage >= 1 && currentPage <= 3) {
      tempNumberOfButtons = [1, 2, 3, 4, dotsInitial, numOfButtons.length];
    } else if (currentPage === 4) {
      const sliced = numOfButtons.slice(0, 5);
      tempNumberOfButtons = [...sliced, dotsInitial, numOfButtons.length];
    } else if (currentPage > 4 && currentPage < numOfButtons.length - 2) {
      // from 5 to 8 -> (10 - 2)
      const sliced1 = numOfButtons.slice(currentPage - 2, currentPage);
      // sliced1 (5-2, 5) -> [4,5]
      const sliced2 = numOfButtons.slice(currentPage, currentPage + 1);
      // sliced1 (5, 5+1) -> [6]
      tempNumberOfButtons = [
        1,
        dotsLeft,
        ...sliced1,
        ...sliced2,
        dotsRight,
        numOfButtons.length,
      ];
      // [1, '...', 4, 5, 6, '...', 10]
    } else if (currentPage > numOfButtons.length - 3) {
      // > 7
      const sliced = numOfButtons.slice(numOfButtons.length - 4);
      // slice(10-4)
      tempNumberOfButtons = [1, dotsLeft, ...sliced];
    } else if (currentPage === dotsInitial) {
      // [1, 2, 3, 4, "...", 10].length = 6 - 3  = 3
      // arrOfCurrButtons[3] = 4 + 1 = 5
      // or
      // [1, 2, 3, 4, 5, "...", 10].length = 7 - 3 = 4
      // [1, 2, 3, 4, 5, "...", 10][4] = 5 + 1 = 6
      SetCurrentPage(arrOfCurrButtons[arrOfCurrButtons.length - 3] + 1);
    } else if (currentPage === dotsRight) {
      SetCurrentPage(arrOfCurrButtons[3] + 2);
    } else if (currentPage === dotsLeft) {
      SetCurrentPage(arrOfCurrButtons[3] - 2);
    }

    setArrOfCurrButtons(tempNumberOfButtons);
    const value = currentPage * postPerPage;

    onPageChangeEvent(value - postPerPage, value);
  }, [currentPage, postPerPage, numOfPages]);

  return (
    <>
      <div className="container ml-2 my-2 style-guide">
        <h2 className="text-center " style={{ color: "var(--primary)" }}>
          {" "}
          Messages
          <Badge
            badgeContent={posts.length}
            color="secondary"
            className="mx-2"
          >
            <MailIcon color="action" />
          </Badge>
        </h2>

        <div class="container">
          <div class="row">
            <div class="col-md-10 offset-md-1">
              <ul class="job-list">
                {posts?.map((data, index) => (
                  <li class="job-preview  d-flex">
                    <div class="content col-md-11 row p-0 m-0">
                      <div className="col-md-6 p-0">
                        <h4 class="job-title">{data.name}</h4>
                        <h6 class="company">{data.company}</h6>
                      </div>
                      <div className="col-md-6  p-0">
                      
                        <h6 class="company "> <i class="fa fa-phone-square mx-2" aria-hidden="true"></i> {data.phone}</h6>
                        
                        <h6 class="company"><i class="fa fa-envelope mx-2" aria-hidden="true"></i>{data.email}</h6>
                      </div>

                      <p
                        className="text-justify"
                        style={{ overflowWrap: "anywhere" }}
                      >
                        {data.message}
                      </p>
                    </div>
                    <div className="col-md-1 p-0">
                      <a
                        href="#"
                        class="btn btn-apply float-sm-right float-xs-left"
                        onClick={(e) => removehol(data.id)}
                      >
                        Remove
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        {
          posts.length >= 4 && (
            <div className="row m-0   justify-content-center align-items-center">
          <div
            className={` btn  text-white px-4  ${
              currentPage === 1 ? "arrow-disabled" : "buttonnav"
            }`}
            onClick={prevPageClick}
            role="button"
          >
            <i class="fas fa-angle-double-left"></i>
          </div>
          {arrOfCurrButtons.map((data, index) => (
            <button
              key={index}
              className={` d-sm-flex justify-content-center btn align-items-center d-none  p-2 mx-1 pages
                    ${currentPage === data ? "active" : ""}`}
              onClick={() => {
                SetCurrentPage(data);
              }}
            >
              {data}
            </button>
          ))}
          <div
            className={`btn  text-white px-4
                ${
                  currentPage === numOfButtons.length
                    ? "arrow-disabled"
                    : "buttonnav"
                }`}
            onClick={nextPageClick}
            role="button"
          >
            <i class="fas fa-angle-double-right"></i>
          </div>
        </div>
          )
        }
      </div>
    </>
  );
};

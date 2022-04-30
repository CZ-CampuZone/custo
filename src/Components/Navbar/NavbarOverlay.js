import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";
import { ReactComponent as LogoutIcon } from "../../Assests/shutdown.svg";
import { ReactComponent as SettingsIcon } from "../../Assests/settings.svg";
import { Typography } from "@material-ui/core";
import AuthContext from "../../Context/Context";

const useStyles = makeStyles({
  root: {
    width: "0",
    opacity: 0,
    zIndex: -1,
    transform: "translateY(-50px)",
    transition: "all 0.3s ease",
  },
  open: {
    opacity: 1,
    zIndex: 99,
    transform: "translateY(0px)",
    width: "auto",
  },
  wrapper: {
    padding: "5px",
    position: "absolute",
    top: "28px",
    right: "0",
    border: "1px solid #e8e8e8",
    background: "#fff",
    borderRadius: "4.5px",
    boxShadow: "0 3px 4px #00000036",
    width: "180px",
    zIndex: 99,
    "&::before": {
      content: "''",
      width: "0",
      height: "0",
      border: "10px solid transparent",
      borderTop: 0,
      borderBottom: "15px solid #EEE",
      position: "absolute",
      top: "-15px",
      right: "28px",
    },
  },
  overlay: {
    position: "fixed",
    background: "transparent",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: -1,
    visibility: "hidden",
    color: "transparent",
    minWidth: "100%",
    minHeight: "100%",
    cursor: "initial",
  },
  overlayOpen: {
    zIndex: 10,
    visibility: "visible",
  },
  listItem: {
    display: "flex",
    color: "#000",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    "& p": {
      fontSize: "1rem",
      margin: "5px 0",
      width: "75px",
    },
    "& svg": {
      width: "1rem",
      height: "1rem",
      fill: "#dc3545",
    },
    "&:hover": {
      textDecoration: "none",
      color: "#000",
      background: "#e8e8e8",
      cursor: "pointer"
    },
  },
});

export const NavbarOverlay = (props) => {
  const ctx = useContext(AuthContext);
  const classes = useStyles();
  const { isOpen, onClose } = props;
  return (
    <>
      <div className={`${classes.root} ${isOpen ? classes.open : ""}`}>
        <div className={classes.wrapper}>
          <NavLink to={`/${ctx.userId}/settings`} className={classes.listItem}>
            <Typography>Settings</Typography>
            <SettingsIcon  />
          </NavLink>
          <div className={classes.listItem} onClick={ctx.logout}>
            <Typography>Logout</Typography>
            <LogoutIcon />
          </div>
        </div>
      </div>
      <div
        className={`${classes.overlay} ${isOpen ? classes.overlayOpen : ""}`}
        onClick={onClose}
      >
        Overlay
      </div>
    </>
  );
};

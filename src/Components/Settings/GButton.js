import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from '@material-ui/core';

const useStyles = makeStyles({
  button: {
    padding: "0.35rem 0.7rem",
    borderRadius: "25px",
    fontSize: "0.75rem",
    transition: "all 0.2s ease",
    border: "none",
    outline: "none",
    margin:"10px",
    textTransform: "initial",
    "&:focus, &:active": {
      border: "none",
      outline: "none",
    },
    "&.Mui-disabled": {
      background: "#F2F2F2",
      color: "",
    },
  },
  primary: {
    background: "rgba(158, 58, 140, 0.8)",
    color: "#fff",
    "&:hover": {
      background: "#fff",
      color: "rgba(158, 58, 140, 0.8)",
      "& $buttonTag": {
        background: "rgba(158, 58, 140, 0.8)",
        color: "#fff",
      },
    },
    "& $buttonTag": {
      background: "#fff",
      color: "rgba(158, 58, 140, 0.8)",
    },
  },
  buttonTag: {
    fontSize: "0.65rem",
    marginLeft: "10px",
    borderRadius: "25px",
    padding: "0.2rem 0.6rem",
  },
  outline: {
    background: "#fff",
    border: "1px solid",
    padding: "0.25rem 1rem",
    "&, $emphasis": {
      color: "#5A2E8A",
      "&:hover": {
        background: "#5A2E8A",
        color: "#fff",
      },
    },
  },
  boxShadow: {
    boxShadow: "0 3px 6px #00000036",
  },
  paddingLeftRight: {
    paddingLeft: "3rem",
    paddingRight: "3rem",
  },
});

export const GButton = (props) => {
  const classNamees = useStyles();
  const {
    label,
    onClick,
    tagName,
    inlineStyles,
    disabled,
    icon,
    buttonType = "primary",
    outline,
    boxShadow,
    isLong,
  } = props;
  let rootclassName = classNamees.button;

  switch (buttonType) {
    case "primary":
      rootclassName = `${rootclassName} ${classNamees.primary}`;
      break;
    case "secondary":
      rootclassName = `${rootclassName} ${classNamees.secondary}`;
      break;
    case "warning":
      rootclassName = `${rootclassName} ${classNamees.warning}`;
      break;
    case "emphasis":
      rootclassName = `${rootclassName} ${classNamees.emphasis}`;
      break;
  }

  if (outline) {
    rootclassName = `${rootclassName} ${classNamees.outline}`;
  }

  if (boxShadow) {
    rootclassName = `${rootclassName} ${classNamees.boxShadow}`;
  }

  if (isLong) {
    rootclassName = `${rootclassName} ${classNamees.paddingLeftRight}`;
  }

  return (
    <Button
      size={"large"}
      className={rootclassName}
      style={inlineStyles}
      onClick={onClick}
      disabled={disabled}
      startIcon={icon ? icon : null}
    >
      {label}
      {tagName && <span className={classNamees.buttonTag}>{tagName}</span>}
    </Button>
  );
};

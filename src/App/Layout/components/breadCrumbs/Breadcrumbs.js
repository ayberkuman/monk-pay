import React from "react";
import {
  Breadcrumbs as MUIBreadcrumbs,
  Link,
  Typography,
} from "@mui/material/";
import { withRouter } from "react-router";
import "./breadcrumbs.scss";

const Breadcrumbs = (props) => {
  const {
    history,
    location: { pathname },
  } = props;
  const pathnames = pathname.split("/").filter((x) => x);
  return (
    <div role="presentation" className="breadcrumbs-container">
      <MUIBreadcrumbs aria-label="breadcrumb">
        <Link
          sx={{
            color: "gray",
          }}
          style={{
            cursor: "pointer",
          }}
          className="crumbs"
          underline="none"
          onClick={() => history.push("/")}
        >
          Dashboard
        </Link>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          let crumbNames =
            pathnames[index].charAt(0).toUpperCase() +
            pathnames[index].slice(1);
          crumbNames = crumbNames.replace(/-/g, " ");
          return isLast ? (
            <Typography
              sx={{
                color: "black",
                fontSize: "large",
              }}
            >
              {crumbNames}
            </Typography>
          ) : (
            <Link
              sx={{
                color: "gray",
              }}
              style={{
                cursor: "pointer",
              }}
              className="crumbs"
              underline="none"
              onClick={() => history.push(routeTo)}
            >
              {crumbNames}
            </Link>
          );
        })}
      </MUIBreadcrumbs>
    </div>
  );
};

export default withRouter(Breadcrumbs);

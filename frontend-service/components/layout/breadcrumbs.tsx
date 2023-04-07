import React from "react";
import {
  Breadcrumbs as MUIBreadcrumbs,
  Link,
  Typography
} from "@mui/material";
import { FC } from "react";
import { withRouter } from "next/router";

const Breadcrumbs = (props: any) => {
  // console.log(props);
  const { router } = props;
  const  { pathname } = router;
  const pathnames = pathname.split("/");
  console.log(pathnames);
  return (
    <div role="presentation">
      <MUIBreadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit">
          MUI
        </Link>
        <Link
          underline="hover"
          color="inherit"
        >
          Core
        </Link>
        <Typography color="text.primary">Breadcrumbs</Typography>
      </MUIBreadcrumbs>
    </div>
  );
}

export default withRouter(Breadcrumbs);
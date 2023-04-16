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
  const  { asPath } = router;
  const pathnames = asPath.split("/").filter((x: any) => x);
  const ignores = [
    "administrators",
    "outlets"
  ];
  // console.log(pathnames);
  return (
    <div role="presentation">
      <MUIBreadcrumbs separator=">" aria-label="breadcrumb">
        <Link onClick={()=>router.push("/")} underline="hover" color="inherit">
          Home
        </Link>
        {pathnames.map((name: string, index: any) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
          // console.log(routeTo);
          const isLast = index === pathnames.length - 1;
          return isLast || ignores.includes(name)? (
            <Typography> {name} </Typography>
          ) : (
            <Link onClick={()=>router.push(routeTo)} underline="hover" color="inherit">{name}</Link>
          );
        })}
      </MUIBreadcrumbs>
    </div>
  );
}

export default withRouter(Breadcrumbs);
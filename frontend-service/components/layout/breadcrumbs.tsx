import React from "react";
import { Breadcrumbs as MUIBreadcrumbs, Link, Typography } from "@mui/material";
import { FC } from "react";
import { withRouter } from "next/router";

const Breadcrumbs = (props: any) => {
  // console.log(props);
  const { router } = props;
  const { asPath } = router;
  const pathnames = asPath.split("/").filter((x: any) => x);
  const ignores = ["administrators", "outlets"];
  // console.log(pathnames);
  return (
    <div role="presentation" className="my-4 md:mt-0">
      <MUIBreadcrumbs separator=">" aria-label="breadcrumb">
        <Link onClick={() => router.push("/")} underline="hover" color="inherit">
          <p>Home</p>
        </Link>
        {pathnames.map((name: string, index: any) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
          // console.log(routeTo);
          const isLast = index === pathnames.length - 1;
          return isLast || ignores.includes(name) ? (
            <Typography component="div" key={`breadcrumb-${name}`}>
              {" "}
              <p className="capitalize">{name}</p>{" "}
            </Typography>
          ) : (
            <Link onClick={() => router.push(routeTo)} underline="hover" color="inherit" key={`breadcrumb-${name}`}>
              <p className="capitalize">{name}</p>
            </Link>
          );
        })}
      </MUIBreadcrumbs>
    </div>
  );
};

export default withRouter(Breadcrumbs);

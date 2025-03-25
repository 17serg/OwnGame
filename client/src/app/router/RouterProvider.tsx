import React from "react";
import { Route, Routes } from "react-router";
import Layout from "../Layout/Layout";
import { CLIENT_ROUTES } from "@/shared/enums/clientRoutes";
import { HomePage, ProductPage, SignUpPage, LoginPage } from "@/pages";

export default function RouterProvider(): React.JSX.Element {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={CLIENT_ROUTES.MAIN} element={<HomePage />} />
        <Route path={CLIENT_ROUTES.PRODUCTS} element={<ProductPage />} />
        <Route path={CLIENT_ROUTES.SIGN_UP} element={<SignUpPage />} />
        <Route path={CLIENT_ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={CLIENT_ROUTES.NOT_FOUND} element={<h1>No content</h1>} />
      </Route>
    </Routes>
  );
}

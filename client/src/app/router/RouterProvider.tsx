import React from "react";
import { Route, Routes } from "react-router";
import Layout from "../Layout/Layout";
import { CLIENT_ROUTES } from "@/shared/enums/clientRoutes";
import { SignUpPage, LoginPage } from "@/pages";
import { MainPage } from "@/pages/MainPage/MainPage";

export default function RouterProvider(): React.JSX.Element {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={CLIENT_ROUTES.MAIN} element={<MainPage />} />
        {/* <Route path={CLIENT_ROUTES.BOOKS} element={<ProductPage />} /> */}
        {/* <Route path={CLIENT_ROUTES.ADDBOOK} element={<ProductPage />} /> */}
        <Route path={CLIENT_ROUTES.SIGN_UP} element={<SignUpPage />} />
        <Route path={CLIENT_ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={CLIENT_ROUTES.NOT_FOUND} element={<h1>No content</h1>} />
      </Route>
    </Routes>
  );
}

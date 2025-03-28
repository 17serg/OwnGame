import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "../Layout/Layout";
import { CLIENT_ROUTES } from "@/shared/enums/clientRoutes";
import { SignUpPage, LoginPage } from "@/pages";
import { MainPage } from "@/pages/MainPage/MainPage";
import GameStatisticsPage from "@/features/Statistics/GameStatisticsPage";
import { GamePage } from "@/pages/GamePage/GamePage";
import { useAppDispatch } from "@/shared/lib/reduxHooks";
import { fetchGameStatistics } from "@/entities/game/slice/gameSlice";

export default function RouterProvider(): React.JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchGameStatistics()); // Загружаем статистику при монтировании
  }, [dispatch]);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={CLIENT_ROUTES.MAIN} element={<MainPage />} />
        <Route path={CLIENT_ROUTES.SIGN_UP} element={<SignUpPage />} />
        <Route path={CLIENT_ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={CLIENT_ROUTES.GAME} element={<GamePage />} />
        <Route path={CLIENT_ROUTES.STATISTICS} element={<GameStatisticsPage />} />
        <Route path={CLIENT_ROUTES.NOT_FOUND} element={<h1>No content</h1>} />
      </Route>
    </Routes>
  );
}

import React from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "../shared/Layout";
import { Home } from "../pages/Home";

export function AppRouter(): JSX.Element {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/grid" element={<Home />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

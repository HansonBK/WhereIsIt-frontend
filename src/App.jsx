import { useState } from 'react';
import {BrowserRouter, Routes, Route , Navigate } from "react-router-dom";

import Layout from "./components/Layout";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import PropertyView from "./pages/PropertyView";
import SpaceView from "./pages/SpaceView";
import ContainerView from "./pages/ContainerView";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path ="/Login" element={<Login />}/>
        <Route path ="/register" element={<Register />}/>

        <Route element={<Layout />}>
          <Route path ="/" element={<Navigate to = "/dashboard" replace />}/>
          <Route path ="/dashboard" element={<Dashboard />}/>
          <Route path ="/property/:propertyId" element={<PropertyView />}/>
          <Route path ="/space/:spaceId" element={<SpaceView />}/>
          <Route path ="/container/:containerId" element={<ContainerView />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;



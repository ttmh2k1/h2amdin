import React from "react"
import { Routes, Route, BrowserRouter } from "react-router-dom"
import Home from "./pages/home"
import LoginPage from "./pages/login/LoginPage"

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/'>
            <Route index element={<Home />} />
            <Route path="login" element={<LoginPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

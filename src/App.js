import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import Register from "./components/Register";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/instagram/dashboard" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }/>
          <Route path="/instagram/login" element={<Login />}/>
          <Route path="/instagram/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

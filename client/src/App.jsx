import { Routes, Route } from "react-router-dom";

import { Toaster } from "react-hot-toast";

import Register from "./pages/Register";
import Login from "./pages/Login";

import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <>
      <Toaster position="top-right" />

      <Routes>
        <Route path="/register" element={<Register />} />

        <Route path="/login" element={<Login />} />

        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <div className="p-10 text-3xl">Chat Application</div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;

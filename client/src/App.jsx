import { Routes, Route } from "react-router-dom";

import { Toaster } from "react-hot-toast";

import Register from "./pages/Register";
import Login from "./pages/Login";

import ProtectedRoute from "./routes/ProtectedRoute";
import Chat from "./pages/Chat";

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
<Chat/>

            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;

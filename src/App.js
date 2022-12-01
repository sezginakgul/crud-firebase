import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import AuthContextProvider from "./context/AuthContext";
import AppRouter from "./router/AppRouter";

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter className="App">
        <AppRouter />
        <ToastContainer />
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;

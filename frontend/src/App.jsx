import { Route, Routes } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Toaster } from "react-hot-toast";

import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import TransactionPage from "./pages/TransactionPage";
import NotFoundPage from "./pages/NotFoundPage";
import Header from "./components/ui/Header";
import { GET_AUTHENTICATED_USER } from "./graphql/queries/userQuery";

function App() {
  const { loading, data, error } = useQuery(GET_AUTHENTICATED_USER);

  console.log("Loading : ", loading);
  console.log("Authenticated user : ", data);
  console.log("Error : ", error);
  return (
    <>
      {data?.authUser && <Header />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/transaction/:id" element={<TransactionPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;

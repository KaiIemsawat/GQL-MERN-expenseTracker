import { Route, Routes } from "react-router-dom";
import { useQuery } from "@apollo/client";

import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import TransactionPage from "./pages/TransactionPage";
import NotFoundPage from "./pages/NotFoundPage";
import Header from "./components/ui/Header";
import { GET_AUTHENTICATED_USER } from "./graphql/queries/userQuery";

function App() {
  const authUser = true;
  const { loading, data, error } = useQuery(GET_AUTHENTICATED_USER);

  console.log("Loading : ", loading);
  console.log("Authenticated user : ", data);
  console.log("Error : ", error);
  return (
    <>
      {authUser && <Header />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/transaction/:id" element={<TransactionPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;

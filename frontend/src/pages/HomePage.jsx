import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import toast from "react-hot-toast";

import Cards from "../components/Cards";
import TransactionForm from "../components/TransactionForm";

import { MdLogout } from "react-icons/md";
import { useMutation, useQuery } from "@apollo/client";
import { LOGOUT } from "../graphql/mutations/userMutation";
import { GET_TRANSACTION_STATISTICS } from "../graphql/queries/transactionQuery";
import { GET_AUTHENTICATED_USER } from "../graphql/queries/userQuery";
import { useEffect, useState } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

const HomePage = () => {
  const { data } = useQuery(GET_TRANSACTION_STATISTICS);
  const { data: authUserData } = useQuery(GET_AUTHENTICATED_USER);

  console.log(authUserData);

  const [logout, { loading, client }] = useMutation(LOGOUT, {
    refetchQueries: ["GetAuthenticatedUser"],
  });

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "$",
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1,
        borderRadius: 0,
        spacing: 0,
        cutout: 120,
      },
    ],
  });

  useEffect(() => {
    if (data?.categoryStatistics) {
      const categories = data.categoryStatistics.map((stat) => stat.category);
      const totalAmounts = data.categoryStatistics.map(
        (stat) => stat.totalAmount,
      );

      const backgroundColors = [];
      const borderColors = [];

      categories.forEach((category) => {
        if (category === "saving") {
          backgroundColors.push("rgb(75, 192, 192)");
          borderColors.push("rgb(75, 192, 192)");
        } else if (category === "expense") {
          backgroundColors.push("rgb(255, 99, 132)");
          borderColors.push("rgb(255, 99, 132)");
        } else if (category === "investment") {
          backgroundColors.push("rgb(54, 162, 235)");
          borderColors.push("rgb(54, 162, 235)");
        }
      });

      setChartData((prev) => ({
        labels: categories,
        datasets: [
          {
            ...prev.datasets[0],
            data: totalAmounts,
            backgroundColor: backgroundColors,
            borderColor: borderColors,
          },
        ],
      }));
    }
  }, [data]);

  const handleLogout = async () => {
    try {
      await logout(); // Clear Apollo Client cache
      toast.success("successfully logged out");
      client.resetStore();
    } catch (error) {
      console.error("Error logging out : ", error);
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className="relative z-20 mx-auto flex h-screen max-w-7xl flex-col items-center justify-center gap-6">
        <div className="flex items-center">
          <p className="relative z-50 mb-4 mr-4 inline-block bg-gradient-to-r from-pink-600 via-indigo-500 to-pink-400 bg-clip-text text-center text-2xl font-bold text-transparent md:text-4xl lg:text-4xl">
            Spend wisely, track wisely
          </p>
          <img
            src={authUserData?.authUser.profilePicture}
            className="h-11 w-11 cursor-pointer rounded-full border"
            alt="Avatar"
          />
          {!loading && (
            <MdLogout
              className="mx-2 h-5 w-5 cursor-pointer"
              onClick={handleLogout}
            />
          )}
          {/* loading spinner */}
          {loading && (
            <div className="mx-2 h-6 w-6 animate-spin rounded-full border-b-2 border-t-2"></div>
          )}
        </div>
        <div className="flex w-full flex-wrap items-center justify-center gap-6">
          {data?.categoryStatistics.length > 0 && (
            <div className="h-[330px] w-[330px] md:h-[360px] md:w-[360px]">
              <Doughnut data={chartData} />
            </div>
          )}

          <TransactionForm />
        </div>
        <Cards />
      </div>
    </>
  );
};
export default HomePage;

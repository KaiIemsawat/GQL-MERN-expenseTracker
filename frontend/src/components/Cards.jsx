import { useQuery } from "@apollo/client";
import Card from "./Card";
import { GET_TRANSACTIONS } from "../graphql/queries/transactionQuery";
import toast from "react-hot-toast";
import {
  GET_AUTHENTICATED_USER,
  GET_USER_AND_TRANSACTIONS,
} from "../graphql/queries/userQuery";

const Cards = () => {
  const { data, loading, error } = useQuery(GET_TRANSACTIONS);
  const { data: authUser } = useQuery(GET_AUTHENTICATED_USER);

  // * Good to have this below code once the app getting larger
  // const { data: userAndTransactions } = useQuery(GET_USER_AND_TRANSACTIONS, {
  //   variables: {
  //     userId: authUser?.authUser._id,
  //   },
  // });
  // console.log("UserAndTransactions : ", userAndTransactions);

  if (error) return toast.error(error.message);

  // TODO => ADD RELATIONSHIPS
  return (
    <div className="min-h-[40vh] w-full px-10">
      <p className="my-10 text-center text-5xl font-bold">History</p>
      <div className="mb-20 grid w-full grid-cols-1 justify-start gap-4 md:grid-cols-2 lg:grid-cols-3">
        {!loading &&
          data.transactions.map((transaction) => (
            <Card
              key={transaction._id}
              transaction={transaction}
              authUser={authUser.authUser}
            />
          ))}
      </div>
      {!loading && data?.transactions?.length === 0 && (
        <p className="w-full text-center text-2xl font-bold">
          No transaction history found.
        </p>
      )}
    </div>
  );
};
export default Cards;

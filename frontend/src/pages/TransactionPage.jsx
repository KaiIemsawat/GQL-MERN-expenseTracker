import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

import TransactionFormSkeleton from "../components/skeletons/TransactionFormSkeleton";
import { UPDATE_TRANSACTION } from "../graphql/mutations/transactionMutation";
import {
  GET_TRANSACTION,
  GET_TRANSACTION_STATISTICS,
} from "../graphql/queries/transactionQuery";

const TransactionPage = () => {
  const nav = useNavigate();
  const { id } = useParams(); // {id} <= matches with params from App.jsx 'path="/transaction/:id"'
  const { loading, data } = useQuery(GET_TRANSACTION, {
    variables: { id }, // {id} <= matches with id from 'GetTransaction($id: ID!)' from transactionQuery.js
  });

  const [updateTransaction, { loading: loadingUpdate }] = useMutation(
    UPDATE_TRANSACTION,
    {
      // refetchQueries: ["GetTransactions", "GetTransactionStatistics"],
      refetchQueries: [{ query: GET_TRANSACTION_STATISTICS }],
    },
  );

  const [formData, setFormData] = useState({
    description: data?.transaction?.description || "",
    paymentType: data?.transaction?.paymentType || "",
    category: data?.transaction?.category || "",
    amount: data?.transaction?.amount || "",
    location: data?.transaction?.location || "",
    date: data?.transaction?.date || "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const amount = parseFloat(formData.amount); // convert string value (by default) to float
    try {
      await updateTransaction({
        variables: {
          input: {
            ...formData,
            amount,
            transactionId: id,
          },
        },
      });
      toast.success("successfully updated transaction.!");
      nav("/");
    } catch (error) {
      toast.error(error.message);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (data) {
      setFormData({
        description: data?.transaction?.description,
        paymentType: data?.transaction?.paymentType,
        category: data?.transaction?.category,
        amount: data?.transaction?.amount,
        location: data?.transaction?.location,
        date: new Date(+data?.transaction?.date).toISOString().substr(0, 10), // convert timestamp to date
      });
    }
  }, [data]);

  if (loading) return <TransactionFormSkeleton />;

  return (
    <div className="mx-auto flex h-screen max-w-4xl flex-col items-center">
      <p className="relative z-50 mb-4 mr-4 inline-block bg-gradient-to-r from-pink-600 via-indigo-500 to-pink-400 bg-clip-text text-center text-2xl font-bold text-transparent md:text-4xl lg:text-4xl">
        Update this transaction
      </p>
      <form
        className="flex w-full max-w-lg flex-col gap-5 px-3"
        onSubmit={handleSubmit}
      >
        {/* TRANSACTION */}
        <div className="flex flex-wrap">
          <div className="w-full">
            <label
              className="mb-2 block text-xs font-bold uppercase tracking-wide text-white"
              htmlFor="description"
            >
              Transaction
            </label>
            <input
              className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
              id="description"
              name="description"
              type="text"
              placeholder="Rent, Groceries, Salary, etc."
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        {/* PAYMENT TYPE */}
        <div className="flex flex-wrap gap-3">
          <div className="mb-6 w-full flex-1 md:mb-0">
            <label
              className="mb-2 block text-xs font-bold uppercase tracking-wide text-white"
              htmlFor="paymentType"
            >
              Payment Type
            </label>
            <div className="relative">
              <select
                className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                id="paymentType"
                name="paymentType"
                onChange={handleInputChange}
                defaultValue={formData.paymentType}
              >
                <option value={"card"}>Card</option>
                <option value={"cash"}>Cash</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="h-4 w-4 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>

          {/* CATEGORY */}
          <div className="mb-6 w-full flex-1 md:mb-0">
            <label
              className="mb-2 block text-xs font-bold uppercase tracking-wide text-white"
              htmlFor="category"
            >
              Category
            </label>
            <div className="relative">
              <select
                className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                id="category"
                name="category"
                onChange={handleInputChange}
                defaultValue={formData.category}
              >
                <option value={"saving"}>Saving</option>
                <option value={"expense"}>Expense</option>
                <option value={"investment"}>Investment</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="h-4 w-4 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>

          {/* AMOUNT */}
          <div className="mb-6 w-full flex-1 md:mb-0">
            <label
              className="mb-2 block text-xs font-bold uppercase text-white"
              htmlFor="amount"
            >
              Amount($)
            </label>
            <input
              className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
              id="amount"
              name="amount"
              type="number"
              placeholder="150"
              value={formData.amount}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        {/* LOCATION */}
        <div className="flex flex-wrap gap-3">
          <div className="mb-6 w-full flex-1 md:mb-0">
            <label
              className="mb-2 block text-xs font-bold uppercase tracking-wide text-white"
              htmlFor="location"
            >
              Location
            </label>
            <input
              className="mb-3 block w-full appearance-none rounded border bg-gray-200 px-4 py-3 leading-tight text-gray-700 focus:bg-white focus:outline-none"
              id="location"
              name="location"
              type="text"
              placeholder="New York"
              value={formData.location}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* DATE */}
          <div className="w-full flex-1">
            <label
              className="mb-2 block text-xs font-bold uppercase tracking-wide text-white"
              htmlFor="date"
            >
              Date
            </label>
            <input
              type="date"
              name="date"
              id="date"
              className="mb-3 block w-full appearance-none rounded border bg-gray-200 px-4 py-[11px] leading-tight text-gray-700 focus:bg-white focus:outline-none"
              placeholder="Select date"
              value={formData.date}
              onChange={handleInputChange}
            />
          </div>
        </div>
        {/* SUBMIT BUTTON */}
        <button
          className="w-full rounded bg-gradient-to-br from-pink-500 to-pink-500 px-4 py-2 font-bold text-white hover:from-pink-600 hover:to-pink-600"
          type="submit"
        >
          {loadingUpdate ? "Updating..." : "Update Transaction"}
        </button>
      </form>
    </div>
  );
};
export default TransactionPage;

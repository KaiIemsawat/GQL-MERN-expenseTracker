import { FaLocationDot } from "react-icons/fa6";
import { BsCardText } from "react-icons/bs";
import { MdOutlinePayments } from "react-icons/md";
import { FaSackDollar } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { HiPencilAlt } from "react-icons/hi";
import { Link } from "react-router-dom";

const categoryColorMap = {
  saving: "from-green-700 to-green-400",
  expense: "from-pink-800 to-pink-600",
  investment: "from-blue-700 to-blue-400",
  // Add more categories and corresponding color classes as needed
};

const Card = ({ cardType }) => {
  // cardType then will be specific in Cards.jsx
  // Then, the value of cardClass would be assigned base on 'categoryColorMap[cardType]'
  const cardClass = categoryColorMap[cardType];

  return (
    <div className={`rounded-md bg-gradient-to-br p-4 ${cardClass}`}>
      <div className="flex flex-col gap-3">
        <div className="flex flex-row items-center justify-between">
          <h2 className="text-lg font-bold text-white">Saving</h2>
          <div className="flex items-center gap-2">
            <FaTrash className={"cursor-pointer"} />
            <Link to={`/transaction/123`}>
              <HiPencilAlt className="cursor-pointer" size={20} />
            </Link>
          </div>
        </div>
        <p className="flex items-center gap-1 text-white">
          <BsCardText />
          Description: Salary
        </p>
        <p className="flex items-center gap-1 text-white">
          <MdOutlinePayments />
          Payment Type: Cash
        </p>
        <p className="flex items-center gap-1 text-white">
          <FaSackDollar />
          Amount: $150
        </p>
        <p className="flex items-center gap-1 text-white">
          <FaLocationDot />
          Location: New York
        </p>
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold text-black">21 Sep, 2001</p>
          <img
            src={"https://tecdn.b-cdn.net/img/new/avatars/2.webp"}
            className="h-8 w-8 rounded-full border"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};
export default Card;

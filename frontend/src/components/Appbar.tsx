import { Link, useNavigate } from "react-router-dom";
import Avatar from "./Avatar";

const Appbar = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full flex justify-between items-center px-20 py-2 border-b">
      <div className="text-lg font-bold">Blogger</div>
      <div className="flex items-center gap-5">
        <Link to={"/publish"}>
          <button
            type="button"
            className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-3 py-1 text-center  dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            New
          </button>
        </Link>

        <div
          className="cursor-pointer	"
          onClick={() => {
            localStorage.clear();
            navigate("/signin");
          }}
        >
          <button
            type="button"
            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-3 py-1 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          >
            Log Out
          </button>
        </div>
        <Avatar
          tailwindHeight={"8"}
          tailwindWidth={"8"}
          authorName="Amresh"
          avatarSrc={undefined}
        />
      </div>
    </div>
  );
};

export default Appbar;

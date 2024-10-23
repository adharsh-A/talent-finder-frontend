import { useNavigate } from "react-router-dom"; // Correct import

const NotFound = () => {
  const navigate = useNavigate(); // Correct hook

  const handleClick = () => {
    navigate(-1); // Go back to the previous page
    };

    const handleHome = () => {
        navigate("/");
      };

  return (
      <div className="flex flex-col items-center justify-center h-screen border border-red-500 border-28">
          <div className="flex space-x-4 md:space-x-8 ">
              
      <button
        onClick={handleClick}
        className="border border-gray-500 text-white font-bold py-2 px-4 rounded md-28 relative"
      >
       Go Back
      </button>
      <button
        onClick={handleHome}
        className="border border-gray-500 text-white font-bold py-2 px-4 rounded "
        >
       Home
      </button>
          </div>
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <p className="mt-4">The page you are looking for does not exist.</p>
    </div>
  );
};

export default NotFound;

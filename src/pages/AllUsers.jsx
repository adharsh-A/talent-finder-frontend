import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, Briefcase, Clock } from 'lucide-react';
import Loader from '../components/ui/Loader'; // Importing the loader component

const defaultProfileImg = 'https://tabler.io/_next/image?url=%2Favatars%2Fdefault%2F78529e2ec8eb4a2eb2fb961e04915b0a.png&w=400&q=75';

const AllUsers = () => {
  document.title = 'All Users';
  useEffect(() => {
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  const [isLoading, setIsLoading] = useState(false);

  // Fetch users from API when component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_BACKEND}users`);
        setUsers(response.data.users);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Calculate the number of pages
  const pageCount = Math.ceil(users.length / itemsPerPage);

  // Handle page click
  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  // Slice data for pagination
  const displayItems = users.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  );

  return (
    <div className="bg-slate-950 min-h-screen text-white py-10 px-4 pt-28">
      {isLoading ? (
          <Loader /> 
      ) : (
        <>
          {/* Bento Grid for Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {displayItems.map((user, index) => (
              <motion.div
                className="group relative overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300"
                key={user._id || index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <Link to={`/${user.id}`} className="block">
                  <div className="relative p-6">
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500/10 rounded-full blur-2xl transform group-hover:scale-150 transition-transform duration-500"></div>
                    
                    {/* Profile Section */}
                    <div className="flex flex-col items-center relative z-10">
                      <div className="relative mb-4">
                        <div className="w-20 h-20 rounded-full overflow-hidden ring-2 ring-purple-500/30 shadow-lg">
                          <img
                            src={user.image || defaultProfileImg}
                            alt={`${user.name}'s profile`}
                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <div className="absolute -bottom-2 -right-2 bg-purple-500 w-6 h-6 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      </div>

                      {/* User Information */}
                      <h2 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors duration-300">
                        {user.name || `User ${index + 1}`}
                      </h2>
                      
                      <div className="flex items-center gap-2 text-gray-400 mb-2">
                        <Briefcase className="w-4 h-4" />
                        <p className="text-sm font-medium">{user.data.occupation}</p>
                      </div>
                      
                      <div className="flex items-center gap-2 text-gray-400">
                        <Clock className="w-4 h-4" />
                        <p className="text-sm">{user.data.experience}</p>
                      </div>
                    </div>

                    {/* Hover Effects */}
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-10 flex justify-center">
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              breakLabel={"..."}
              pageCount={pageCount}
              onPageChange={handlePageClick}
              containerClassName="flex space-x-2"
              pageLinkClassName="px-3 py-1 bg-gray-800 text-purple-400 rounded-full hover:bg-purple-500 hover:text-white"
              previousLinkClassName="px-3 py-1 bg-gray-800 text-purple-400 rounded-full hover:bg-purple-500 hover:text-white"
              nextLinkClassName="px-3 py-1 bg-gray-800 text-purple-400 rounded-full hover:bg-purple-500 hover:text-white"
              activeLinkClassName="bg-purple-500 text-white"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default AllUsers;

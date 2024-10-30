import React, { useEffect, useState, useCallback, useMemo } from "react";
import axios from "axios";
import JobCard from "../components/JobCard";
import Loader from "@/components/ui/Loader";
import NotFound from "./NotFound";

export const JobSearch = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [currentPage, setCurrentPage] = useState(() => {
    return Number(sessionStorage.getItem('currentPage')) || 1;
  });
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    experience: "",
    skills: "",
    remote: "",
  });

  // Memoized fetch function
  // Memoized fetch function
const fetchJobs = useCallback(async () => {
  setIsLoading(true);
  try {
    // Fetch paginated jobs for display
    const paginatedResponse = await axios.get(`${import.meta.env.VITE_BACKEND}jobs`, {
      params: { page: currentPage, limit: 10 },
    });

    const paginatedJobs = paginatedResponse.data.jobs.sort(
      (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
    );
    
    setFilteredJobs(paginatedJobs || []);
    setTotalPages(paginatedResponse.data.totalPages);

    // Always fetch all jobs for filtering
    const initialResponse = await axios.get(`${import.meta.env.VITE_BACKEND}jobs`, {
      params: { page: 1, limit: 50 },
    });
    
    setJobs(initialResponse.data.jobs.sort(
      (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
    ));

  } catch (error) {
    console.error("Error fetching jobs:", error);
    setIsError(true);
  } finally {
    setIsLoading(false);
  }
}, [currentPage]); // Remove filters from dependency array since we always fetch all jobs
  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  useEffect(() => {
    sessionStorage.setItem('currentPage', currentPage);
  }, [currentPage]);

  // Memoized filter function
  const applyFilters = useCallback(() => {
    const { experience, skills, remote } = filters;
    
    if (!experience && !skills && !remote) {
      return;
    }

    const filtered = jobs.filter((job) => {
      if (!job.data) return false;
      
      const matchesExperience = experience ? 
        parseInt(job.data.experience) >= parseInt(experience) : true;
      const matchesSkills = skills ? 
        job.data.skills.toLowerCase().includes(skills.toLowerCase()) : true;
      const matchesRemote = remote ? 
        job.isRemote === (remote === "true") : true;

      return matchesExperience && matchesSkills && matchesRemote;
    });

    setFilteredJobs(filtered);
  }, [jobs, filters]);

  // Memoize handlers
  const handleFilterChange = useCallback((e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  }, []);

  const handlePageChange = useCallback((newPage) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setCurrentPage(newPage);
  }, []);

  // Memoize pagination numbers
  const paginationNumbers = useMemo(() => 
    Array.from({ length: totalPages }, (_, i) => i + 1),
    [totalPages]
  );

  if (isLoading) return <Loader />;
  if (isError) return <NotFound />;
  if (!Array.isArray(filteredJobs) || filteredJobs.length === 0) {
    return (
<div className="flex justify-center items-center min-h-screen w-full bg-slate-950 py-8">
  <div className="text-sm bg-black md:bg-slate-800 rounded-lg shadow-lg p-6 max-w-md w-full text-center">
    <h1 className="text-2xl font-bold md:text-xl md:text-4xl  mb-6 text-indigo-500">Job Search</h1>
    <p className="text-sm md:text-xl  mb-4 text-slate-300">No jobs found.</p>
    <p className="text-sm md:text-xl mb-4 text-slate-300">Please try different filters.</p>
    <p className="text-sm md:text-xl mb-4 text-slate-300">If the issue persists, please contact support.</p>
    <p className=" text-sm md:text-xl mb-6 text-slate-300">Thank you!</p>
    <button
      type="button"
      onClick={() => window.location.reload()}
      className="py-2 px-6 bg-gray-800 border border-gray-700 text-white font-bold rounded-md hover:bg-blue-700 transition duration-300"
    >
      Retry
    </button>
  </div>
</div>
    );
  }

  return (
    <div className="tracking-wide md:pt-28 pt-20  min-h-screen w-full bg-slate-950 text-center text-slate-50 md:py-8 py-0 flex flex-wrap justify-center">
      <h1 className="text-center md:ml-0 mx-auto md:text-center text-4xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-600   font-bold md:text-4xl md:mb-8 mb-2 w-full ">Job Search</h1>
      
      {/* Filter Section */}
      <div className="md:mb-8 mb-3 w-full flex  flex-col md:flex-row md:justify-center  items-center md:items-center gap-4 mr-5 ">
        <input
          type="text"
          name="experience"
          placeholder="Filter by experience (e.g., 3+ years)"
          className=" p-2 rounded h-10"
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="skills"
          placeholder="Filter by skills (e.g., React, Node.js)"
          className="p-2 rounded"
          onChange={handleFilterChange}
        />
        <select name="remote" onChange={handleFilterChange} className="p-2 rounded">
          <option value="">Filter by remote</option>
          <option value="true">Remote</option>
          <option value="false">On-site</option>
        </select>
        <div className="flex gap-2">
          
      <button className="bg-gray-800 border border-gray-700 text-white font-bold rounded-md hover:bg-gray-800 transition duration-300 md:px-6 px-4 py-1" onClick={applyFilters}>
        Apply
        </button>
        <button className="bg-red-800/30 border border-red-700/30 text-white font-bold rounded-md hover:bg-gray-800 transition duration-300 md:px-6 px-4 py-1" onClick={() => setFilters({ experience: "", skills: "", remote: "" })}>
          Clear
        </button>
        </div>
      </div>

      {/* Job Listing */}
      <div className="md:px-16 px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        {filteredJobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>

      {/* New Pagination */}
      <div className="mt-8 w-full flex justify-center">
        <nav aria-label="Page navigation example">
          <ul className="inline-flex -space-x-px text-sm">
            <li>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Previous
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <li key={page}>
                <button
                  onClick={() => handlePageChange(page)}
                  className={`flex items-center justify-center px-3 h-8 leading-tight border ${
                    page === currentPage
                      ? "text-blue-600 border-gray-300 bg-blue-50"
                      : "text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  }`}
                >
                  {page}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

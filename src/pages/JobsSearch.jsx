import React, { useEffect, useState } from "react";
import axios from "axios";
import JobCard from "../components/JobCard"; 
import Loader from "@/components/ui/Loader";
import NotFound from "./NotFound";

export const JobSearch = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });

  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    experience: "",
    skills: "",
    remote: "",
  });

  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND}jobs`, {
          params: {
            page: currentPage,
            limit: 50,
          },
        });

        setJobs(response.data.jobs||[]);
        setFilteredJobs(response.data.jobs||[]); // Initially all jobs are visible
        setCurrentPage(response.data.currentPage);
        setTotalPages(response.data.totalPages);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setIsError(true);
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, [currentPage]);

  // Filter jobs based on experience, skills, or remote status
  const applyFilters = () => {
    const filtered = jobs.filter((job) => {
      const { experience, skills, remote } = filters;

          // Check if job.data exists before accessing its properties
    if (!job.data) return false;

      const matchesExperience = experience ? parseInt(job.data.experience) >= parseInt(experience) : true;
      const matchesSkills = skills ? job.data.skills.toLowerCase().includes(skills.toLowerCase()) : true;
      const matchesRemote = remote ? job.isRemote === (remote === "true") : true;

      return matchesExperience && matchesSkills && matchesRemote;
    });
    setFilteredJobs(filtered);
  };

  useEffect(() => {
    applyFilters();
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const handlePageChange = (newPage) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setCurrentPage(newPage);

  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <NotFound />;
  }

  if (!Array.isArray(filteredJobs) || filteredJobs.length === 0) {
    return (
      <div className="pt-28 min-h-screen w-full bg-slate-950 text-center text-slate-50 py-8 flex flex-wrap justify-center">
        <h1 className="text-4xl mb-8 w-full">Job Search</h1>
        <p className="text-2xl mb-8 w-full">No jobs found.</p>
        <p className="text-2xl mb-8 w-full">Please try different filters.</p>
        <p className="text-2xl mb-8 w-full">If the issue persists, please contact support.</p>
        <p className="text-2xl mb-8 w-full">Thank you!</p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="py-2 px-4 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-700 transition duration-300"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="pt-28 min-h-screen w-full bg-slate-950 text-center text-slate-50 py-8 flex flex-wrap justify-center">
      <h1 className="text-4xl mb-8 w-full">Job Search</h1>
      
      {/* Filter Section */}
      <div className="mb-8 w-full flex flex-col md:flex-row justify-center items-center gap-4">
        <input
          type="text"
          name="experience"
          placeholder="Filter by experience (e.g., 3+ years)"
          className="p-2 rounded"
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
      </div>

      {/* Job Listing */}
      <div className="px-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
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

import React from "react";
import { Link } from "react-router-dom";

const JobCard = ({ job, className }) => {
  // Split the job description into words and limit it to 15 words
  const truncateDescription = (description) => {
    const words = description.split(" ");
    if (words.length > 15) {
      return words.slice(0, 15).join(" ") + " ...";
    }
    return description;
  };

  return (
    <Link to={`/jobs/${job.id}`}>
      <div
        className={`md:min-w-[350px] text-left bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-5 m-0 transition-transform transform hover:scale-[1.02] ${className}`}
      >
        <h2 className="text-xl font-bold text-[#c7d2fe]">{job.title}</h2>
        <p className="text-gray-400 mb-2">{job.location}</p>
        <p className="text-gray-500">{truncateDescription(job.description)}</p>
        <p className="text-gray-300 mt-2">Salary: ${job.salary.toLocaleString()}</p>
        <p className="text-gray-300">Experience: {job.data.experience}</p>
        <p className="text-gray-300">Skills: {job.data.skills}</p>
        <div className="mt-4">
          <button
            to={`/jobs/${job.id}`}
            className="shadow-[0_0_0_3px_#000000_inset] px-6 py-2 bg-transparent border border-black dark:border-white dark:text-white text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400"
          >
            Apply Now
          </button>
        </div>
      </div>
    </Link>
  );
};

export default JobCard;
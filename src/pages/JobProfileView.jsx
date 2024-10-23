import Loader from "@/components/ui/Loader";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NotFound from "./NotFound";
import "./JobProfileView.css";

const JobDetail = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });

  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        // Replace the URL below with your actual API endpoint
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND}jobs/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch job details");
        }
        const data = await response.json();
        setJob(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <NotFound />;
  }

  if (!job) {
    return <p>No job details found.</p>;
  }
  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="job-card mt-28">
      <button
        type="button"
        onClick={handleBack}
        className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 rounded-lg text-xs px-3 py-1 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
      >
        <svg
          className="w-4 h-4 text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 8 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M7 1 1.3 6.326a.91.91 0 0 0 0 1.348L7 13"
          />
        </svg>
      </button>

      <div className="job-header">
        <div className="flex justify-between ">
          <div>
            <h2>{job.title}</h2>
            <h4>{job.location}</h4>
            <p>Salary: ${job.salary}</p>
          </div>

          <div>
            <h2>{job.client.data.clientCompany}</h2>
            <h4>Email:{job.client.data.clientContactEmail}</h4>
            <p>Website: {job.client.data.clientWebsite}</p>
          </div>
        </div>
      </div>
      <div className="job-body">
        <p>
          <strong>Experience:</strong> {job.data.experience}
        </p>
        <div className="skills-section">
          <strong>Skills Required:</strong>
          <div className="skills-list">
            {job.data.skills.split(", ").map((skill, index) => (
              <span key={index} className="skill-item">
                {skill}
              </span>
            ))}
          </div>
        </div>
        <p>
          <strong>Description:</strong> {job.description}
        </p>
      </div>
      <div className="job-footer">
        <p>
          <strong>Remote:</strong> {job.isRemote ? "Yes" : "No"}
        </p>
        <p>Created on: {new Date(job.createdAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default JobDetail;

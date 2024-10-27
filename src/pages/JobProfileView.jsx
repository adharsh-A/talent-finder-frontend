import Loader from "@/components/ui/Loader";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NotFound from "./NotFound";
import "./JobProfileView.css";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

const JobDetail = () => {
  // Scroll to the top on component mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const { toast } = useToast();
  const { id } = useParams(); // Get the job ID from the route parameters
  const userId = useSelector((state) => state.auth.id); // Get user ID from Redux store
  const role = useSelector((state) => state.auth.role);

  const [jobId, setJobId] = useState(id); // Job ID from route
  const [isApplying, setIsApplying] = useState(false); // Track if the user is applying
  const [appliedSuccessfully, setAppliedSuccessfully] = useState(false); // Track application status
  const [job, setJob] = useState(null); // Store job details
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch job details on component mount
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND}jobs/${id}`);

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

  // Handle loading and error states
  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <NotFound />;
  }

  if (!job) {
    return <p>No job details found.</p>;
  }

  // Handle form submission (apply to the job)
  const handleApply = async (e) => {
    e.preventDefault();
    setIsApplying(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND}jobs/${jobId}/apply`,
        { userId: userId },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        toast({
          title: "Applied successfully",
          description: "You have successfully applied for this job.",
          status: "success",
          duration: 5000,
        });
        setAppliedSuccessfully(true);
      }
        console.log(error);
      
    } catch (error) {
      toast({
        title: error?.response?.data?.message || "Error",
        description: "An error occurred while applying for this job.",
        status: "error",
        duration: 5000,
      });
    } finally {
      setIsApplying(false);
    }
  };

  // Handle back button (navigate back)
  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="job-card mt-28">
      {/* Back button */}
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

      {/* Job details */}
      <div className="job-header">
        <div className="flex justify-between">
          <div>
            <h2>{job.title}</h2>
            <h4>{job.location}</h4>
            <p>Salary: ${job.salary}</p>
          </div>
          <div>
            <h2>{job.client?.data?.clientCompany}</h2>
            <h4>Email: {job.client?.data?.clientContactEmail}</h4>
            <p>Website: {job.client?.data?.clientWebsite}</p>
          </div>
        </div>
      </div>

      {/* Job description */}
      <div className="job-body">
        <p>
          <strong>Experience:</strong> {job.data?.experience}
        </p>
        <div className="skills-section">
          <strong>Skills Required:</strong>
          <div className="skills-list">
            {job.data?.skills.split(", ").map((skill, index) => (
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

      {/* Footer with apply button */}
      <div className="job-footer flex justify-between">
        <div>
          <p>
            <strong>Remote:</strong> {job.isRemote ? "Yes" : "No"}
          </p>
          <p>Created on: {new Date(job.createdAt).toLocaleDateString()}</p>
        </div>
{role === "talent" ?        <Button
          variant="outline"
          onClick={handleApply}
          className="mt-4 mr-4 px-8"
          disabled={isApplying || appliedSuccessfully}
        >
          {isApplying ? "Applying..." : appliedSuccessfully ? "Applied" :  "Apply Now"}
        </Button>: <h1 className="text-red-500 mt-8 border border-red-500/80 mt-4 mr-4 px-4 py-2">only talent can apply</h1>}
      </div>
    </div>
  );
};

export default JobDetail;

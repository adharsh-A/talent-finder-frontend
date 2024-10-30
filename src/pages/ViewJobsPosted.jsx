import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Briefcase, MapPin, DollarSign, Calendar, ExternalLink } from "lucide-react";
import Loader from "@/components/ui/Loader";
import { useNavigate } from "react-router-dom";

const ViewJobsPosted = () => {
  const navigate = useNavigate();
  const id = useSelector((state) => state.auth.id);
  const [jobsPosted, setJobsPosted] = useState([]);
  const[isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchJobsPosted = async () => {

      try {
        setIsLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_BACKEND}jobs/client/${id}`);
        setJobsPosted(response.data);
      } catch (error) {
        console.error(error);
      }finally{
        setIsLoading(false);
      }
    };
    fetchJobsPosted();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatSalary = (salary) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(salary);
  };

  const handleViewApplicants = (jobId) => {
    navigate(`/view-applicants/${jobId}`);
  };
  return (
    <div className="min-h-screen bg-zinc-950 p-6">
      {isLoading ? <Loader /> : <div className="max-w-7xl md:mx-24 md:mt-28 mt-[3.5rem]">
        <h1 className="md:text-3xl text-2xl  font-bold text-white mb-8">Posted Jobs</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-6  gap-4">
          {jobsPosted.map((job) => (
            <div
              key={job.id}
              className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden hover:border-zinc-700 transition-all"
            >
              <div className="md:p-4 p-3">
                <div className="flex md:flex-row gap-2 flex-col justify-between items-start md:mb-4 mb-2">
                  <h2 className=" md:text-xl text-lg font-bold text-white">
                    {job.title}
                  </h2>
                  {job.isRemote && (
                    <span className="md:px-2 md:py-1 px-2 py-1 md:text-sm  text-xs rounded-full bg-emerald-500/10 text-emerald-500">
                      Remote
                    </span>
                  )}
                </div>
                
                <div className="md:space-y-2 space-y-1 md:text-sm text-xs">
                  <div className="flex items-center gap-2 text-zinc-400">
                    <Briefcase className="w-4 h-4" />
                    <span>Experience: {job.data.experience}</span>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-400">
                    <MapPin className="w-4 h-4" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-1 text-zinc-400">
                    <DollarSign className="w-4 h-4" />
                    <span>{job.salary}/year</span>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-400">
                    <Calendar className="w-4 h-4" />
                    <span>Posted on {formatDate(job.createdAt)}</span>
                  </div>
                  
                  <div className="mt-4">
                    <h3 className="font-semibold mb-2 text-zinc-300">Required Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {job.data.skills.split(', ').map((skill) => (
                        <span
                          key={skill}
                          className="md:px-2 md:py-1 px-2 py-1 md:text-sm text-xs rounded-md bg-zinc-800 text-zinc-300 border border-zinc-700"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-zinc-400 md:mt-2 mt-1">{job.description}</p>
                  <div className="flex gap-2">
                              
                    <button className="w-1/4 mt-4 flex items-center justify-center gap-2 bg-zinc-600 hover:bg-zinc-700 hover:border-white-700 text-white py-2 px-4 rounded-md transition-colors">
                      <ExternalLink className="w-4 h-4" />
                      Edit
                    </button>
                    <button className="w-3/4 mt-4 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors" onClick={() => handleViewApplicants(job.id)}>
                      <ExternalLink className="w-4 h-4" />
                      View Applicants
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>}
    </div>
  );
};

export default ViewJobsPosted;
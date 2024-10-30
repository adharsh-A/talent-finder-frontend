import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "@/components/ui/Loader";
import { Toaster, toast } from "sonner";
import { ExternalLink,MoveLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SeeApplicants = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const navigate = useNavigate();
  const { jobId } = useParams();
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplicant, setSelectedApplicant] = useState(null);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND}jobs/applications/${jobId}`
        );
        const talentApplicants = response.data.filter(
          (applicant) => applicant.user.role === "talent"
        );
        setApplicants(talentApplicants);
      } catch (error) {
        toast.error("Failed to fetch applicants");
        console.error("Error fetching applicants:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchApplicants();
  }, [jobId]);

  const handleStatusChange = async (applicationId, newStatus) => {
    try {
      setLoading(true);
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND}jobs/application/status`,
        {
          applicationId,
          status: newStatus,
        }
      );

      setApplicants((prev) =>
        prev.map((app) =>
          app.id === applicationId ? { ...app, status: newStatus } : app
        )
      );
      toast.success(`Application status updated to ${newStatus}`);
    } catch (error) {
      toast.error("Failed to update application status");
      console.error("Error updating status:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleContact = (email) => {
    window.location.href = `mailto:${email}`;
  };

  if (loading) {
    return <Loader />;
  }

  if (applicants.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
        <div className="text-center">
        <button onClick={() => window.history.back()} className=" text-gray-400 hover:text-white transition-all">
            <MoveLeft className="w-8 h-8"/>
          </button>
          <h2 className="text-2xl font-bold text-white mb-2">
            No Talent Applications
          </h2>
          <p className="text-gray-400">
            There are currently no applications from talent for this position.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent py-8 px-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto md:mt-16 lg:mt-20 mt-[2rem]">
        <div className="text-center mb-8">
       
          <h1 className="md:text-3xl  text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 mb-2">
            Talent Applications
          </h1>
          <p className="text-gray-400 text-sm sm:text-lg">
            {applicants.length} candidate{applicants.length !== 1 ? "s" : ""}{" "}
            awaiting your review
          </p>
        </div>

        <div className="grid md:gap-6 gap-4 sm:grid-cols-2 lg:grid-cols-3 md:mx-16">
          {applicants.map((applicant) => (
            <div
              key={applicant.id}
              className={`bg-gray-800 md:rounded-lg rounded-md shadow-md hover:shadow-lg transition-all md:p-4 p-3 border border-gray-700 
              `}
              onClick={() => setSelectedApplicant(applicant)}
            >
              <div className="flex items-center justify-between md:mb-2 mb-2">
                <div className="flex items-center space-x-4">
                  <div className="md:w-12 md:h-12 w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center ring-2 ring-gray-600">
                    {applicant.user.image ? (
                      <img
                        src={applicant.user.image}
                        alt={applicant.user.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-xl sm:text-2xl text-gray-400 font-semibold">
                        {applicant.user.name.charAt(0)}
                      </span>
                    )}
                  </div>
                  <div>
                    <h2 className="text-base sm:text-xl font-semibold text-white">
                      {applicant.user.name}
                    </h2>
                    <p className="text-gray-400 text-xs sm:text-base">
                      @{applicant.user.username}
                    </p>
                  </div>
                </div>
                <span
                  className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium capitalize ${
                    applicant.status === "pending"
                      ? "bg-yellow-900/50 text-yellow-200 border border-yellow-700"
                      : applicant.status === "accepted"
                      ? "bg-green-900/50 text-green-200 border border-green-700"
                      : "bg-red-900/50 text-red-200 border border-red-700"
                  }`}
                >
                  {applicant.status}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-gray-300">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-sm sm:text-base">
                    {applicant.user.data.occupation}
                  </span>
                </div>

                <div>
                  <h4 className="font-medium text-gray-300 mb-1 md:text-base text-sm  sm:mb-2">
                    Skills
                  </h4>
                  <div className="flex flex-wrap gap-1 md:gap-2">
                    {applicant.user.data.skills.split(",").map((skill) => (
                      <span
                        key={skill}
                        className="bg-blue-900/30 text-blue-200 border border-blue-700/50 rounded-full md:px-3 md:py-1 px-2 py-1  text-xs sm:text-sm"
                      >
                        {skill.trim()}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-sm md:text-base text-gray-300 mb-1 sm:mb-0">
                    Experience
                  </h4>
                  <p className="text-gray-400 text-sm sm:text-base">
                    {applicant.user.data.experience}
                  </p>
                </div>

                {applicant.user.data.portfolio && (
                  <a
                    href={applicant.user.data.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center md:space-x-2 space-x-1 text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                      />
                    </svg>
                    <span className="text-sm sm:text-base">View Portfolio</span>
                  </a>
                )}

                <div className="md:pt-4 pt-2 border-t border-gray-700 mt-4 space-y-3">
                  {applicant.status === "pending" && (
                    <div className="flex space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStatusChange(applicant.id, "accepted");
                        }}
                        className="w-full text-center bg-green-700/30 border border-green-700 hover:bg-green-500/50 text-white rounded-md md:px-3 md:py-2 px-2 py-1 text-base md:text-lg transition-all"
                      >
                        Accept
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStatusChange(applicant.id, "rejected");
                        }}
                        className="w-full text-center bg-red-600/30 border border-red-600 text-red-100 hover:bg-red-500/50 text-white rounded-md md:px-3 md:py-2 px-2 py-1 text-base md:text-lg transition-all"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                  {applicant.status === "accepted" && (
                    <div className="flex space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStatusChange(applicant.id, "pending");
                        }}
                        className="w-full text-center bg-gray-600 hover:bg-gray-500 text-white rounded-md px-3 py-2 text-sm sm:text-base transition-all"
                      >
                        make it pending
                      </button>
                    </div>
                  )}
                  {applicant.status === "rejected" && (
                    <div className="flex space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStatusChange(applicant.id, "pending");
                        }}
                        className="w-full text-center bg-gray-600 hover:bg-gray-500 text-white rounded-md px-3 py-2 text-sm sm:text-base transition-all"
                      >
                        make it pending
                      </button>
                    </div>
                  )}
                  <div className="md:flex flex flex col-gap-2 space-x-2 block space-y-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/${applicant.user.id}`)
                      }}
                      className="md:w-2/5 w-full text-center flex items-center justify-center bg-gray-600 hover:bg-gray-500 text-white rounded-md px-1 py-0 text-sm md:text-base transition-all"
                    >
                      <ExternalLink className="w-3 h-3 mr-1" />
                      View Profile
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleContact(applicant.user.email);
                      }}
                      className="md:w-3/5 w-full text-center bg-blue-600 hover:bg-blue-500 text-white rounded-md px-3 py-2 text-sm sm:text-base transition-all"
                    >
                      Contact via Email
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* <Toaster/> */}
    </div>
  );
};

export default SeeApplicants;

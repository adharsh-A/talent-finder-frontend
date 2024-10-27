import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { useSelector } from "react-redux";
import NotFound from "./NotFound";
import { Building2, MapPin, Calendar, Briefcase, DollarSign, Trash2 } from "lucide-react";
import Loader from "@/components/ui/Loader";
import { toast } from "sonner";

const ApplicationsPage = () => {
  useEffect(() => {
    window.scrollTo({top: 0, behavior: 'smooth'});
  },[])
  const id = useSelector((state) => state.auth.id);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND}jobs/applications-user/${id}`
      );
      
      // Sort applications by updatedAt in descending order
      const sortedApplications = response.data.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

      setApplications(sortedApplications);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch applications:", err);
      setError("Failed to load applications.");
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND}jobs/application/delete`, 
        {
          params: {
            applicationId: deletingId,
          }
        }
      );
      setApplications(applications.filter(app => app.id !== deletingId));
      setShowDeleteDialog(false);
      toast.success("Application deleted successfully");
    } catch (error) {
      console.error("Failed to delete application:", error);
      toast.error("Failed to delete application");
      setShowDeleteDialog(false);
    }
  };

  const getStatusColor = (status) => {
    const statusColors = {
      pending: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
      accepted: "bg-green-500/10 text-green-500 border-green-500/20",
      rejected: "bg-red-500/10 text-red-500 border-red-500/20",
      interviewing: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    };
    return statusColors[status.toLowerCase()] || "bg-gray-500/10 text-gray-500 border-gray-500/20";
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <Loader />
        <BackgroundBeams />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <NotFound />
        <BackgroundBeams />
      </div>
    );
  }

  return (
    <div className="flex justify-center min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02]">
      <BackgroundBeams />
      <div className="w-full max-w-5xl mx-auto p-6 relative mt-20">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-100 to-neutral-400">
            Your Applications
          </h1>
          <span className="px-4 py-2 rounded-full bg-white/10 text-sm">
            Total: {applications.length}
          </span>
        </div>

        {applications.length === 0 ? (
          <div className="text-center py-20 bg-white/5 rounded-lg border border-white/10">
            <Briefcase className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-xl text-gray-300">No applications found</p>
            <p className="text-gray-500 mt-2">Start applying to jobs to see them here</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {applications.map((application) => (
              <div
                key={application.id}
                className="group relative bg-white/5 rounded-xl border border-white/10 p-6 hover:bg-white/[0.07] transition-all"
              >
                <Link to={`/jobs/${application.job.id}`} className="block">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-3">
                      <h2 className="text-xl font-semibold text-white">
                        {application.job.title}
                      </h2>

                      <div className="flex flex-wrap gap-3">
                        <div className="flex items-center text-gray-400">
                          <Building2 className="h-4 w-4 mr-2" />
                          <span>{application.job.company}</span>
                        </div>

                        <div className="flex items-center text-gray-400">
                          <MapPin className="h-4 w-4 mr-2" />
                          <span>
                            {application.job.location}
                            {application.job.isRemote && " (Remote)"}
                          </span>
                        </div>

                        <div className="flex items-center text-gray-400">
                          <DollarSign className="h-4 w-4 mr-0" />
                          <span>{application.job.salary.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col md:items-end gap-3">
                      <div
                        className={`px-4 py-1.5 rounded-full border ${getStatusColor(
                          application.status
                        )} text-sm font-medium`}
                      >
                        {application.status}
                      </div>
                      <div className="flex items-center text-gray-400 text-sm">
                        <Calendar className="h-4 w-4 mr-2" />
                        Applied {new Date(application.createdAt).toLocaleDateString()}
                        <button
                          className=" mx-4 rounded-full opacity-1 transition-opacity duration-200 hover:bg-white/10"
                          onClick={(e) => {
                            e.preventDefault();
                            setDeletingId(application.id);
                            setShowDeleteDialog(true);
                          }}
                        >
                          <Trash2 className="h-5 w-5 text-red-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>

                {showDeleteDialog && deletingId === application.id && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-zinc-900 rounded-lg p-6 max-w-md w-full space-y-4">
                      <h2 className="text-lg font-semibold">Delete Application</h2>
                      <p>Are you sure you want to delete this application? This action cannot be undone.</p>
                      <div className="flex justify-end gap-4">
                        <button
                          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                          onClick={() => setShowDeleteDialog(false)}
                        >
                          Cancel
                        </button>
                        <button
                          className=" px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                          onClick={handleDelete}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicationsPage;

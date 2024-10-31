import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Briefcase, MapPin, DollarSign, Calendar, ExternalLink, X } from "lucide-react";
import Loader from "@/components/ui/Loader";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import CustomSwitch from './CustomSwitch.jsx'; // Adjust the import path based on your project structure


const ViewJobsPosted = () => {
  const navigate = useNavigate();
  const id = useSelector((state) => state.auth.id);
  const [jobsPosted, setJobsPosted] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: "",
    location: "",
    salary: "",
    isRemote: false,
    description: "",
    experience: "",
    skills: ""
  });

  useEffect(() => {
    fetchJobsPosted();
  }, []);

  const fetchJobsPosted = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_BACKEND}jobs/client/${id}`);
      setJobsPosted(response.data);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch jobs"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditClick = (job) => {
    setEditingJob(job);
    setEditFormData({
      title: job.title,
      location: job.location,
      salary: job.salary,
      isRemote: job.isRemote,
      description: job.description,
      experience: job.data.experience,
      skills: job.data.skills
    });
    setIsEditDrawerOpen(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await axios.put(`${import.meta.env.VITE_BACKEND}jobs/${editingJob.id}`, {
        ...editFormData,
        data: {
          experience: editFormData.experience,
          skills: editFormData.skills
        }
      });
      
      toast.success("Job updated successfully");
      
      setIsEditDrawerOpen(false);
      fetchJobsPosted(); // Refresh the jobs list
    } catch (error) {
      console.error(error);
      toast.error("Failed to update job");
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleViewApplicants = (jobId) => {
    navigate(`/view-applicants/${jobId}`);
  };
  const handleSwitchChange = (checked) => {
    // Update the isRemote field while keeping other fields unchanged
    setEditFormData((prevState) => ({
      ...prevState,
      isRemote: checked, // Toggle isRemote state
    }));
  };

  return (
    <div className="min-h-screen bg-zinc-950 p-6">
      {isLoading ? <Loader /> : (
        <div className="max-w-7xl md:mx-24 md:mt-28 mt-[3.5rem]">
          <h1 className="md:text-3xl text-2xl font-bold text-white mb-8">Posted Jobs</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-6 gap-4">
            {jobsPosted.map((job) => (
              <div
                key={job.id}
                className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden hover:border-zinc-700 transition-all"
              >
                <div className="md:p-4 p-3">
                  <div className="flex md:flex-row gap-2 flex-col justify-between items-start md:mb-4 mb-2">
                    <h2 className="md:text-xl text-lg font-bold text-white">
                      {job.title}
                    </h2>
                    {job.isRemote && (
                      <span className="md:px-2 md:py-1 px-2 py-1 md:text-sm text-xs rounded-full bg-emerald-500/10 text-emerald-500">
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
                        {job.data.skills.split(',').map((skill) => (
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
                      <button 
                        className="w-1/4 mt-4 flex items-center justify-center gap-2 bg-zinc-600 hover:bg-zinc-700 hover:border-white-700 text-white py-2 px-4 rounded-md transition-colors"
                        onClick={() => handleEditClick(job)}
                      >
                        <ExternalLink className="w-4 h-4" />
                        Edit
                      </button>
                      <button 
                        className="w-3/4 mt-4 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors" 
                        onClick={() => handleViewApplicants(job.id)}
                      >
                        <ExternalLink className="w-4 h-4" />
                        View Applicants
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <Sheet open={isEditDrawerOpen} onOpenChange={setIsEditDrawerOpen}>
        <SheetContent className="bg-zinc-900 border-zinc-800 text-white w-full sm:max-w-xl">
          <SheetHeader>
            <SheetTitle className="text-white">Edit Job Posting</SheetTitle>
          </SheetHeader>
          <form onSubmit={handleEditSubmit} className="space-y-1 mt-2">
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1">Title</label>
              <Input
                type="text"
                value={editFormData.title}
                onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                className="bg-zinc-800 border-zinc-700 text-white"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1">Location</label>
              <Input
                type="text"
                value={editFormData.location}
                onChange={(e) => setEditFormData({ ...editFormData, location: e.target.value })}
                className="bg-zinc-800 border-zinc-700 text-white"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1">Salary</label>
              <Input
                type="text"
                value={editFormData.salary}
                onChange={(e) => setEditFormData({ ...editFormData, salary: e.target.value })}
                className="bg-zinc-800 border-zinc-700 text-white"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1">Experience Required</label>
              <Input
                type="text"
                value={editFormData.experience}
                onChange={(e) => setEditFormData({ ...editFormData, experience: e.target.value })}
                className="bg-zinc-800 border-zinc-700 text-white"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1">Skills (comma-separated)</label>
              <Input
                type="text"
                value={editFormData.skills}
                onChange={(e) => setEditFormData({ ...editFormData, skills: e.target.value })}
                className="bg-zinc-800 border-zinc-700 text-white"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1">Description</label>
              <Textarea
                value={editFormData.description}
                onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                className="bg-zinc-800 border-zinc-700 text-white min-h-[100px]"
                required
              />
            </div>
            
            <div className="flex items-center space-x-2">
            <CustomSwitch
          checked={editFormData.isRemote} // Reflect the current state of isRemote
          onChange={handleSwitchChange} // Call the function when the switch is toggled
        />
              <label className="text-sm font-medium text-zinc-400">Remote Position</label>
            </div>
            
            <div className="flex gap-2 pt-4">
              <Button
                type="submit"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                disabled={isLoading}
              >
                Save Changes
              </Button>
              <SheetClose asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700"
                >
                  Cancel
                </Button>
              </SheetClose>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ViewJobsPosted;
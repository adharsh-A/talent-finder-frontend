import { BackgroundBeams } from "@/components/ui/background-beams";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@mui/material";
import React, { useState } from "react";
import { useCreateJobMutation } from "@/redux/jobApi";
import { toast } from "react-toastify";

const JobPost = () => {
  const [createJob, { isLoading }] = useCreateJobMutation();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    salary: "",
    location: "",
    image: "",
    isRemote: false,
  });

  const handleClear = () => {
    setFormData({
      title: "",
      description: "",
      salary: "",
      location: "",
      image: "",
      isRemote: false,
    });
  }
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await createJob(formData).unwrap();
      console.log("Create response:", response);
      toast.success("Job created successfully!");
      handleClear();
    } catch (error) {
      console.error("Error creating job:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen min-w-full  pt-24 bg-slate-950">
      <form onSubmit={handleSubmit} className="z-10 md:p-12 bg-black md:w-2/3 w-[250px] md:text-base sm:text-sm md:flex flex-col p-0 border p-6 rounded-3xl shadow-md">
        <h2 className="text-xl font-bold mb-4">Post a Job</h2>

        <div className="mb-4">
          <label htmlFor="title">Job Title</label>
          <Input
            
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description">Description</label>
          <Textarea
            className="resize-none h-24 bg-zinc-700 opacity-50 border:none"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="salary">Salary</label>
          <Input
            type="text"
            id="salary"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="location">Location</label>
          <Input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
  <label htmlFor="isRemote">Remote</label>
  <Switch
    type="checkbox"
    name="isRemote"
    checked={formData.isRemote}
    onChange={handleChange}
    sx={{
      '& .MuiSwitch-switchBase': {
        color: 'gray', // Custom color for unchecked state
      },
      '& .MuiSwitch-switchBase.Mui-checked': {
        color: 'white', // Custom color for checked state
      },
      '& .MuiSwitch-track': {
        backgroundColor: 'lightgray', // Custom track color
      },
      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
        backgroundColor: 'blue', // Track color when checked
      },
    }}
  />
</div>
        <div className="flex mb-4">
          
        <RainbowButton type="submit">Post Job</RainbowButton>
        <Button onClick={handleClear}>Clear</Button>
</div>
      </form>
      <BackgroundBeams />
    </div>
  );
};

export default JobPost;

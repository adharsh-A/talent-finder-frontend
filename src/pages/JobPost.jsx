import { BackgroundBeams } from "@/components/ui/background-beams";
import React, { useState } from "react";

const JobPost = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    salary: "",
    location: "",
    image: "",
    isRemote: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here, you would typically send formData to your backend API
    try {
      const response = await fetch("/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log("Job posted successfully:", data);
      // Optionally, reset the form or provide feedback
      setFormData({
        title: "",
        description: "",
        salary: "",
        location: "",
        image: "",
        isRemote: false,
      });
    } catch (error) {
      console.error("Error posting job:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen min-w-full pt-24">
      <form onSubmit={handleSubmit} className="bg-zinc w-1/2  p-6 rounded-3xl shadow-md">
        <h2 className="text-xl font-bold mb-4">Post a Job</h2>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="title">Job Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="border rounded w-full p-2"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="border rounded w-full p-2"
            required
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="salary">Salary</label>
          <input
            type="number"
            id="salary"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            className="border rounded w-full p-2"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="border rounded w-full p-2"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="image">Image URL</label>
          <input
            type="text"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="border rounded w-full p-2"
          />
        </div>

        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="isRemote"
              checked={formData.isRemote}
              onChange={handleChange}
              className="mr-2"
            />
            Remote Job
          </label>
        </div>

        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Post Job
        </button>
          </form>
          <BackgroundBeams />
    </div>
  );
};

export default JobPost;

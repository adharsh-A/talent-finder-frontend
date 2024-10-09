import React, { useEffect, useState } from "react";
import { useGetUserQuery } from "@/redux/userApi";
import { useSelector } from "react-redux";
import { BackgroundBeams } from "@/components/ui/background-beams";
import "./ProfileView.css";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { occupations } from "./UserDetails";

const MyProfile = (props) => {
  const id = useSelector((state) => state.auth.id);
  const { data, isLoading } = useGetUserQuery(id);

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    skills: "",
    occupation: "",
    experience: "",
    additionalInfo: "",
    portfolio: "",
  });

  // When data is fetched, update the form fields
  useEffect(() => {
    if (data) {
      setFormData({
        name: data.name || "",
        username: data.username || "",
        skills: data.skills || "",
        occupation: data.occupation || "",
        experience: data.experience || "",
        additionalInfo: data.additionalInfo || "",
        portfolio: data.portfolio || "",
      });
    }
  }, [data]);

  // Handle input change
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // Submit logic here
  };

  return (
    <div>
      <div className="min-h-screen flex justify-center items-center">
        <div className="bg-black/[0.96] border w-full mt-[6rem] py-8 px-12 rounded-2xl lg:w-3/4 h-fit md:w-1/4">
          <h1 className="text-3xl font-bold mb-6 text-center text-slate-50">My Profile</h1>
          <div className="flex justify-center mb-4">
            <div className="w-24 h-24 rounded-full overflow-hidden">
              <img
                src="https://via.placeholder.com/100"
                alt="Profile Picture"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Name Input */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <Input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="mt-1 block w-full"
              />
            </div>

            {/* Username Input */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <Input
                type="text"
                id="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                className="mt-1 block w-full"
              />
            </div>

            {/* Skills Input */}
            <div>
              <label htmlFor="skills" className="block text-sm font-medium text-gray-700">
                Skills
              </label>
              <Input
                type="text"
                id="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="Enter your skills (comma-separated)"
                className="mt-1 block w-full"
              />
            </div>

            {/* Occupation Input */}
            <div>
              <label htmlFor="occupation" className="block text-sm font-medium text-gray-700">
                Occupation
              </label>
              <Input
                type="text"
                id="occupation"
                value={formData.occupation}
                onChange={handleChange}
                placeholder="Enter your occupation"
                className="mt-1 block w-full"
              />
            </div>

            {/* Experience Input */}
            <div>
              <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
                Experience
              </label>
              <Input
                type="text"
                id="experience"
                value={formData.experience}
                onChange={handleChange}
                placeholder="Enter your experience (in years)"
                className="mt-1 block w-full"
              />
            </div>

            {/* Additional Info Input */}
            <div>
              <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700">
                Additional Info
              </label>
              <Input
                type="text"
                id="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleChange}
                placeholder="Any additional info"
                className="mt-1 block w-full"
              />
            </div>

            {/* Portfolio Link Input */}
            <div>
              <label htmlFor="portfolio" className="block text-sm font-medium text-gray-700">
                Portfolio Link
              </label>
              <Input
                type="url"
                id="portfolio"
                value={formData.portfolio}
                onChange={handleChange}
                placeholder="Enter your portfolio link"
                className="mt-1 block w-full"
              />
            </div>

            <div className="flex justify-end mt-4">
              <Button className="cursor-pointer hover:bg-white/[0.50] px-4 mr-2 py-1 bg-white/[0.4] text-white rounded-lg transform hover:-translate-y-1 transition duration-400">
                Cancel
              </Button>
              <Button className="cursor-pointer relative inline-flex h-10 overflow-hidden rounded-lg p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                <span className="font-bold text-lg inline-flex h-full w-full items-center justify-center rounded-lg bg-slate-950 px-6 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                  Save
                </span>
              </Button>
            </div>
          </form>
        </div>
      </div>
      <BackgroundBeams />
    </div>
  );
};

export default MyProfile;

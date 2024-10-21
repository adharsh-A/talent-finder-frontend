import React, { useEffect, useState } from "react";
import { useGetUserQuery } from "@/redux/userApi";
import { useSelector } from "react-redux";
import { BackgroundBeams } from "@/components/ui/background-beams";
import "./ProfileView.css";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { BorderBeam } from "@/components/ui/border-beam";
import { useUpdateProfileMutation } from "@/redux/userApi";
import Loader from "@/components/ui/Loader";
import { toast } from "react-toastify";

const occupationData = [
  "Software Engineer",
  "Web Developer",
  "Data Scientist",
  "Product Manager",
  "Project Manager",
  "UI/UX Designer",
  "Graphic Designer",
  "Network Administrator",
  "System Analyst",
  "Database Administrator",
  "Mobile App Developer",
  "DevOps Engineer",
  "Cloud Architect",
  "Cybersecurity Specialist",
  "Full Stack Developer",
  "Frontend Developer",
  "Backend Developer",
  "Quality Assurance Engineer",
  "Technical Support Specialist",
  "Business Analyst",
  "IT Consultant",
  "Data Analyst",
  "Machine Learning Engineer",
  "AI Specialist",
  "Game Developer",
  "Blockchain Developer",
  "SEO Specialist",
  "Digital Marketing Manager",
  "Content Writer",
  "Copywriter",
  "Video Editor",
  "3D Animator",
  "Photographer",
  "Videographer",
  "Social Media Manager",
  "Salesforce Administrator",
  "IT Project Coordinator",
  "Information Security Analyst",
  "Cloud Engineer",
  "Site Reliability Engineer",
  "Solutions Architect",
  "Infrastructure Engineer",
  "Network Engineer",
  "Hardware Engineer",
  "Embedded Systems Engineer",
  "Technical Writer",
  "Security Consultant",
  "Application Developer",
  "Big Data Engineer",
  "Data Engineer",
  "IT Auditor",
  "Software Tester",
  "Automation Engineer",
  "SAP Consultant",
  "ERP Specialist",
  "CRM Developer",
  "AI Researcher",
  "Digital Strategist",
  "Business Intelligence Analyst",
  "E-commerce Manager",
  "Operations Manager",
  "Logistics Coordinator",
  "Supply Chain Manager",
  "Financial Analyst",
  "Accountant",
  "Human Resources Specialist",
  "Recruitment Specialist",
  "Training and Development Manager",
  "Legal Consultant",
  "Compliance Officer",
  "Market Research Analyst",
  "Brand Manager",
  "Public Relations Specialist",
  "Event Planner",
  "Customer Service Manager",
  "Customer Success Manager",
  "Technical Recruiter",
  "Operations Analyst",
  "Quality Control Specialist",
  "Environmental Consultant",
  "Health and Safety Officer",
  "Mechanical Engineer",
  "Electrical Engineer",
  "Civil Engineer",
  "Chemical Engineer",
  "Industrial Engineer",
  "Manufacturing Engineer",
  "Biomedical Engineer",
  "Aerospace Engineer",
  "Marine Engineer",
  "Architect",
  "Interior Designer",
  "Urban Planner",
  "Construction Manager",
  "Surveyor",
  "Real Estate Agent",
  "Property Manager",
  "Retail Manager",
  "Store Manager",
  "Fashion Designer",
  "Chef",
  "Hotel Manager",
  "Travel Agent",
  "Tour Guide",
  "Event Manager",
];

const MyProfile = (props) => {
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
  const id = useSelector((state) => state.auth.id);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    skills: "",
    occupation: "",
    experience: "",
    additionalInfo: "",
    portfolio: "",
    userId: Number(id),
  });

  const { data = {}, isLoading } = useGetUserQuery(Number(id));

  useEffect(() => {
    if (data&&data.data) {
      console.log("Data received:", data);
      // Update formData with user data
      setFormData({
        name: data.name || "",
        username: data.username || "",
        skills: typeof data.data.skills === "string" ? data.data.skills : "",
        occupation: data.data.occupation || "",
        experience: data.data.experience || "",
        additionalInfo: data.data.additionalInfo || "",
        portfolio: data.data.portfolio || "",
        userId: Number(id),
      });
    
    }
  }, [data, id]);

  // Handle input change
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateProfile(formData).unwrap();
      console.log("Update response:", response);
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Error updating profile:", error);
      console.error("Error updating profile:", error); // Error handling
    }
  };

  return (
    <div>
      {isLoading || isUpdating ? (
        <Loader />
      ) : (
        <div className="min-h-screen flex justify-center items-center">
          <div className="overflow-hidden relative  z-10 bg-zinc-900/[0.7]  w-full mt-[6rem] py-8 px-12 rounded-2xl lg:w-3/4 h-fit md:w-1/4">
            <BorderBeam size={200} duration={8} delay={1} />
            <h1 className="text-3xl font-bold mb-6 text-center text-slate-50">
              My Profile
            </h1>
            <div className="flex justify-center mb-4">
              <div className="w-24 h-24 rounded-full overflow-hidden">
                <img
                  src="https://tabler.io/_next/image?url=%2Favatars%2Fdefault%2F78529e2ec8eb4a2eb2fb961e04915b0a.png&w=400&q=75"
                  alt="Profile Picture"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <Label htmlFor="name">Name</Label>
              <Input
                label="Name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
              />
              <Label htmlFor="username">Username</Label>
              <Input
                label="Username"
                id="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
              />
              <Label htmlFor="skills">Skills</Label>
              <Input
                label="Skills"
                id="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="Enter your skills"
                />
                
                
              <Label htmlFor="occupation">Occupation</Label>
              <select
                id="occupation"
                value={formData.occupation}
                onChange={handleChange}
                className="bg-zinc-800 text-white rounded-md p-2 w-full"
              >
                <option value="" disabled>Select an occupation</option>
                {occupationData.map((occupation, index) => (
                  <option value={occupation} key={index} className="text-white bg-slate-700 p-2 w-full ">
                    {occupation}
                  </option>
                ))}
              </select>


              <Label htmlFor="experience">Experience</Label>
              <Input
                label="Experience"
                id="experience"
                value={formData.experience}
                onChange={handleChange}
                placeholder="Enter your experience"
              />

              <Label htmlFor="additionalInfo">Additional Info</Label>
              <Input
                label="Additional Info"
                id="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleChange}
                placeholder="Enter additional information"
              />

              <Label htmlFor="portfolio">Portfolio</Label>
              <Input
                label="Portfolio"
                id="portfolio"
                value={formData.portfolio}
                onChange={handleChange}
                placeholder="Enter your portfolio link"
              />

              <div className="flex justify-end mt-4">
                <button className="cursor-pointer hover:bg-white/[0.10] px-3 mr-2 py-1 bg-white/[0.2] text-white rounded-lg transform  text-sm transition duration-400">
                  Cancel
                </button>
                <Button
                  onClick={handleSubmit}
                  className="cursor-pointer relative inline-flex h-10 overflow-hidden rounded-lg p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
                >
                  <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                  <span className="font-bold text-lg inline-flex h-full w-full items-center justify-center rounded-lg bg-slate-950 px-6 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                    Save
                  </span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
      <BackgroundBeams size={1} duration={15} />
    </div>
  );
};

export default MyProfile;

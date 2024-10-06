import React, { useEffect, useState } from "react";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router";
import { useUpdateUserProfileMutation } from "@/redux/userApi";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export function UserDetailsForm() {
  const [
    updateUserProfile,
    { isLoading: isLoggingIn, isError: isLoginError, error: loginError },
  ] = useUpdateUserProfileMutation();
  const navigate = useNavigate();

  const id = useSelector((state) => state.auth.id);
  const [userId, setUserId] = useState(id);
  
  // Synchronize userId with Redux state id if id changes
  useEffect(() => {
    setUserId(id);
  }, [id]);
  
  // State for form data
  const [formData, setFormData] = useState({
    userId: userId,
    skills: "",
    occupation: "",
    experience: "",
    portfolio: "",
    additionalInfo: "",
  });
  

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {  
      const response = await updateUserProfile(formData).unwrap();
console.log('Update response:', response);

      toast.success("Profile updated successfully");
      navigate("/");
    } catch (err) {
      console.log(err);
      toast.error("Failed to update profile",{
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="mt-28 max-w-2xl w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-[#222220]">
      <h2 className="font-bold text-xl text-white dark:text-neutral-200">
        Complete Your Profile
      </h2>
      <p className="text-white text-sm max-w-sm mt-2 dark:text-neutral-300">
        Fill in your professional details
      </p>
      <form className="my-8" onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-4">
        <Label htmlFor="skills">
  Skills <sup>(separate with commas)</sup>
</Label>
          <Input
            id="skills"
            placeholder="e.g., React, Node.js, Python"
            type="text"
            required
            value={formData.skills}
            onChange={handleInputChange}
          />
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="occupation">Occupation</Label>
          <Input
            id="occupation"
            list="occupations"
            placeholder="e.g., Software Developer"
            type="text"
            value={formData.occupation}
            onChange={handleInputChange}
          />
          <datalist id="occupations">
            {occupations.map((occupation, index) => (
              <option value={occupation} key={index} />
            ))}
          </datalist>
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="experience">Years of Experience</Label>
          <Input
            id="experience"
            placeholder="e.g., 3 years"
            type="number"
            value={formData.experience}
            onChange={handleInputChange}
          />
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="portfolio">Portfolio Link</Label>
          <Input
            id="portfolio"
            placeholder="e.g., https://yourportfolio.com"
            type="url"
            value={formData.portfolio}
            onChange={handleInputChange}
          />
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="additionalInfo">Additional Info</Label>
          <Input
            id="additionalInfo"
            placeholder="Anything else important"
            type="text"
            value={formData.additionalInfo}
            onChange={handleInputChange}
          />
        </LabelInputContainer>

        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          {isLoggingIn ? `Submitting` : `Submit`}
          <BottomGradient />
        </button>
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
export const occupations = [
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

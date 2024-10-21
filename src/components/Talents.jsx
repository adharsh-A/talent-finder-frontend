import { useEffect, useState } from "react";
import { HoverEffect } from "../components/ui/card-hover-effect";
import "./talents.css";
import { useGetAllUsersQuery, useSearchByDataMutation } from "@/redux/userApi";
import { Button } from "../components/ui/button";
import axios from "axios";
import Loader from "./ui/Loader";
import { toast } from "react-toastify";

export function Talents() {
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [experience, setExperience] = useState("");
  const [selectedOccupation, setSelectedOccupation] = useState("");
  const [skill, setSkill] = useState("");
  const [name, setName] = useState("");

  const handleClear = () => {
    setExperience("");
    setSelectedOccupation("");
    setSkill("");
    setName("");
    setFilteredProjects(projects);
    setCurrentPage(1);
  };

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage] = useState(3); // You can adjust the number of items per page
  const [paginationLoading, setPaginationLoading] = useState(false); // New loading state for pagination

  // State for the filters
  const [loader, setLoader] = useState(false);
  const { data, isLoading } = useGetAllUsersQuery({
    page: currentPage,
    limit: projectsPerPage,
  });

  if (data) {
    console.log(data);
  }
  const projects = data?.users || [];
  let totalPages = data?.totalPages || 1;
  useEffect(() => {
    if (data) {
      setFilteredProjects(projects);
    }
  }, [data]);

  // Sync filteredProjects whenever the API data (projects) change

  // Filtering function
  const applyFilters = async () => {
    try {
      setLoader(true);
      const link = import.meta.env.VITE_BACKEND;
      const data = await axios.post(`${link}client/search-data`, {
        experience: experience,
        occupation: selectedOccupation,
        skill: skill,
        name: name,
        limit: projectsPerPage, // Replace with your desired limit
        currentPage: Number(currentPage), // Add currentPage if you want to control pagination
      });
      const response = data.data;
      console.log(data);
      if (data) {
        setFilteredProjects(response.users);
        setLoader(false);
      }
      setCurrentPage(response.currentPage); // Reset to the first page after applying filters
    } catch (error) {
      setLoader(false);
      toast.error(err, {
        position: "bottom-right",
      });
      console.error("Error fetching filtered users", error);
    }
  };

  // Logic for pagination

  // const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setPaginationLoading(true);
      setTimeout(() => {
        setCurrentPage(currentPage + 1);
        setPaginationLoading(false); // Stop loading after timeout
      }, 2000); // Simulate loading for 2000ms
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setPaginationLoading(true);
      setTimeout(() => {
        setCurrentPage(currentPage - 1);
        setPaginationLoading(false); // Stop loading after timeout
      }, 2000); // Simulate loading for 2000ms
    }
  };

  return (
    <>
      <div className="flex max-w-7xl mx-auto px-8">
        {/* Sidebar */}
        <div className="w-1/5 p-4 bg-black rounded-lg shadow-md talent-sidebar">
          <h2 className="text-xl font-bold mb-4 text-white">Filters</h2>

          {/* Experience Filter */}
          <div className="mb-4">
            <h3 className="font-semibold text-white">Experience</h3>
            <input
              type="number"
              placeholder="Years of experience"
              className="border w-full p-2 mt-2 rounded-lg"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
            />
          </div>

          {/* Occupation Filter */}
          <div className="mb-4">
            <h3 className="font-semibold text-white">Occupation</h3>
            <select
              className="border w-full p-2 mt-2 rounded-lg text-white bg-black" // Added text-black for better readability
              value={selectedOccupation}
              onChange={(e) => setSelectedOccupation(e.target.value)}
            >
              <option value="" disabled>
                Select an occupation
              </option>
              {occupations.map((occupation, index) => (
                <option value={occupation} key={index}>
                  {occupation}
                </option>
              ))}
            </select>
          </div>

          {/* Search by Skill */}
          <div className="mb-4">
            <h3 className="font-semibold text-white">Search by Skill</h3>
            <input
              type="text"
              placeholder="Enter skill"
              className="border w-full p-2 mt-2 rounded-lg"
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
            />
          </div>

          {/* Search by Name */}
          <div className="mb-4">
            <h3 className="font-semibold text-white">Search by Name</h3>
            <input
              type="text"
              placeholder="Enter name"
              className="border w-full p-2 mt-2 rounded-lg"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <Button
            variant="secondary"
            className="bg-red-500 mx-4 text-white"
            onClick={handleClear}
          >
            Clear
          </Button>
          <Button variant="outline" onClick={applyFilters}>
            Apply
          </Button>
        </div>

        <div className="w-4/5 p-4">
          <h2 className="font-bold text-4xl mb-4">Talents</h2>
          {isLoading || loader ? (
            <Loader width="500" height="280" />
          ) : (
            <HoverEffect items={filteredProjects} />
          )}

          <div className="pagination">
            <Button
              className={`mx-4 text-white ${
                currentPage === 1 || paginationLoading ? "disabled-button" : ""
              }`}
              variant="outline"
              onClick={prevPage}
              disabled={currentPage === 1 || paginationLoading} // Disable button if loading
            >
              &larr; Previous
            </Button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <Button
              className={`mx-4 text-white ${
                currentPage === totalPages || paginationLoading
                  ? "disabled-button"
                  : ""
              }`}
              variant="outline"
              onClick={nextPage}
              disabled={currentPage === totalPages || paginationLoading} // Disable button if loading
            >
              Next &rarr;
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

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

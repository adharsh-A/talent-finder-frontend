import { useEffect, useState } from "react";
import { HoverEffect } from "../components/ui/card-hover-effect";
import "./talents.css";
import { useGetAllUsersQuery } from "@/redux/userApi";
import { Button } from "../components/ui/button";

export function Talents() {
  const handleClear = () => {
    setExperience("");
    setSelectedOccupation("");
    setSkill("");
    setName("");
    setFilteredProjects(projects);
  };


  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage] = useState(3); // You can adjust the number of items per page


  // State for the filters
  const { data, isLoading } = useGetAllUsersQuery({ page: currentPage, limit: projectsPerPage });
  const projects = data?.users || [];
  console.log(projects);
  const totalPages = data?.totalPages || 1;



  const [filteredProjects, setFilteredProjects] = useState([]);
  const [experience, setExperience] = useState("");
  const [selectedOccupation, setSelectedOccupation] = useState("");
  const [skill, setSkill] = useState("");
  const [name, setName] = useState("");


  // Sync filteredProjects whenever the API data (projects) change
  useEffect(() => {
    setFilteredProjects(projects);
  }, [projects]);

  // Filtering function
  const applyFilters = () => {
    let updatedProjects = projects;

    if (experience) {
      updatedProjects = updatedProjects.filter((project) =>
        project.data.experience.includes(experience)
      );
    }

    if (selectedOccupation) {
      updatedProjects = updatedProjects.filter(
        (project) =>
          project.data.occupation.toLowerCase() ===
          selectedOccupation.toLowerCase()
      );
    }

    if (skill) {
      updatedProjects = updatedProjects.filter((project) =>
        project.data.skills.includes(skill)
      );
    }

    if (name) {
      updatedProjects = updatedProjects.filter((project) =>
        project.name.toLowerCase().includes(name.toLowerCase())
      );
    }

    setFilteredProjects(updatedProjects);
    setCurrentPage(1); // Reset to the first page after applying filters
  };

  // Logic for pagination


  // const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
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
            <input
              list="occupations"
              className="border w-full p-2 mt-2 rounded-lg"
              placeholder="Search Occupation"
              value={selectedOccupation}
              onChange={(e) => setSelectedOccupation(e.target.value)}
            />
            <datalist id="occupations">
              {occupations.map((occupation, index) => (
                <option key={index} value={occupation} />
              ))}
            </datalist>
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

        {/* Main Content - HoverEffect */}
      <div className="w-4/5 p-4">
          <h2 className="font-bold text-4xl mb-4">Talents</h2>
          <HoverEffect items={filteredProjects} />

          {/* Pagination Controls */}
          <div className="pagination">
            <Button
            className=" mx-4 text-white"
            variant="outline"
              onClick={prevPage}
              disabled={currentPage === 1}
            >
             &larr; Previous
            </Button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <Button
                        className=" mx-4 text-white"

            variant="outline"
              onClick={nextPage}
              disabled={currentPage === totalPages}
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
  "Software Engineer", "Web Developer", "Data Scientist", "Product Manager", "Project Manager",
  "UI/UX Designer", "Graphic Designer", "Network Administrator", "System Analyst", "Database Administrator",
  "Mobile App Developer", "DevOps Engineer", "Cloud Architect", "Cybersecurity Specialist", "Full Stack Developer",
  "Frontend Developer", "Backend Developer", "Quality Assurance Engineer", "Technical Support Specialist", "Business Analyst",
  "IT Consultant", "Data Analyst", "Machine Learning Engineer", "AI Specialist", "Game Developer",
  "Blockchain Developer", "SEO Specialist", "Digital Marketing Manager", "Content Writer", "Copywriter",
  "Video Editor", "3D Animator", "Photographer", "Videographer", "Social Media Manager",
  "Salesforce Administrator", "IT Project Coordinator", "Information Security Analyst", "Cloud Engineer", "Site Reliability Engineer",
  "Solutions Architect", "Infrastructure Engineer", "Network Engineer", "Hardware Engineer", "Embedded Systems Engineer",
  "Technical Writer", "Security Consultant", "Application Developer", "Big Data Engineer", "Data Engineer",
  "IT Auditor", "Software Tester", "Automation Engineer", "SAP Consultant", "ERP Specialist",
  "CRM Developer", "AI Researcher", "Digital Strategist", "Business Intelligence Analyst", "E-commerce Manager",
  "Operations Manager", "Logistics Coordinator", "Supply Chain Manager", "Financial Analyst", "Accountant",
  "Human Resources Specialist", "Recruitment Specialist", "Training and Development Manager", "Legal Consultant", "Compliance Officer",
  "Market Research Analyst", "Brand Manager", "Public Relations Specialist", "Event Planner", "Customer Service Manager",
  "Customer Success Manager", "Technical Recruiter", "Operations Analyst", "Quality Control Specialist", "Environmental Consultant",
  "Health and Safety Officer", "Mechanical Engineer", "Electrical Engineer", "Civil Engineer", "Chemical Engineer",
  "Industrial Engineer", "Manufacturing Engineer", "Biomedical Engineer", "Aerospace Engineer", "Marine Engineer",
  "Architect", "Interior Designer", "Urban Planner", "Construction Manager", "Surveyor",
  "Real Estate Agent", "Property Manager", "Retail Manager", "Store Manager", "Fashion Designer",
  "Chef", "Hotel Manager", "Travel Agent", "Tour Guide", "Event Manager"
];

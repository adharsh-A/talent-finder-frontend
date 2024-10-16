import { useState, useEffect } from "react"; // Import useEffect to handle side effects
import { Button } from "@/components/ui/button"; // Adjust the import according to your project structure
import { Input } from "@/components/ui/input"; // Adjust the import according to your project structure
import { Label } from "@/components/ui/label"; // Adjust the import according to your project structure
import { BorderBeam } from "@components/ui/border-beam"; // Adjust the import according to your project structure
import { BackgroundBeams } from "@/components/ui/background-beams"; // Adjust the import according to your project structure
import { toast } from "react-toastify"; // Import toast for notifications
import { useUpdateClientMutation, useGetClientQuery } from "@/redux/clientApi";
import { useSelector } from "react-redux";
import Loader from "../components/ui/Loader.jsx";

const ClientProfile = () => {
  const id = useSelector((state) => state.auth.id);
  const { data: clientData, isLoading: isClientLoading } = useGetClientQuery(Number(id));
  const [updateClient, { isLoading }] = useUpdateClientMutation();
  
  // Initialize form data state
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    clientCompany: "",
    companyLocation: "",
    clientContactEmail: "",
    clientWebsite: "",
    clientContactPhone: "",
  });

  // Update form data when clientData is fetched
  useEffect(() => {
    if (clientData) {
      setFormData({
        userId: Number(id),
        name: clientData.name || "",
        username: clientData.username || "",
        clientCompany: clientData.data.clientCompany || "",
        companyLocation: clientData.data.companyLocation || "",
        clientContactEmail: clientData.data.clientContactEmail || "",
        clientWebsite: clientData.data.clientWebsite || "",
        clientContactPhone: clientData.data.clientContactPhone || "",
      });
    }
  }, [clientData, id]);

  // Handle input change
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await updateClient(formData ).unwrap();
      console.log("Update response:", response);

      toast.success("Profile saved successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Error updating profile");
    }
  };

  return (
    <>
    <div className="min-h-screen flex justify-center items-center">
{isClientLoading?<Loader/>:(<div className="overflow-hidden relative z-10 bg-zinc-900/[0.7] w-full mt-[6rem] py-8 px-12 rounded-2xl lg:w-3/4 h-fit md:w-1/4">
        <BorderBeam size={200} duration={8} delay={1} />
        <h1 className="text-3xl font-bold mb-6 text-center text-slate-50">My Profile</h1>
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
            <h1>{typeof(id)}</h1>
          <Label htmlFor="username">Username</Label>
          <Input
            label="Username"
            id="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
          />
          <Label htmlFor="clientCompany">Client Company</Label>
          <Input
            label="Client Company"
            id="clientCompany"
            value={formData.clientCompany}
            onChange={handleChange}
            placeholder="Enter your client company"
          />
          <Label htmlFor="companyLocation">Company Location</Label>
          <Input
            label="Company Location"
            id="companyLocation"
            value={formData.companyLocation}
            onChange={handleChange}
            placeholder="Enter your company location"
          />
          <Label htmlFor="clientContactEmail">Email</Label>
          <Input
            label="Email"
            id="clientContactEmail"
            type="email"
            value={formData.clientContactEmail}
            onChange={handleChange}
            placeholder="Enter your email"
          />
          <Label htmlFor="clientWebsite">Website</Label>
          <Input
            label="Website"
            id="clientWebsite"
            value={formData.clientWebsite}
            onChange={handleChange}
            placeholder="Enter your website URL"
          />
          <Label htmlFor="clientContactPhone">Phone</Label>
          <Input
            label="Phone"
            id="clientContactPhone"
            value={formData.clientContactPhone}
            onChange={handleChange}
            placeholder="Enter your phone number"
          />

          <div className="flex justify-end mt-4">
            <button
              type="button"
              className="cursor-pointer hover:bg-white/[0.10] px-3 mr-2 py-1 bg-white/[0.2] text-white rounded-lg transform text-sm transition duration-400"
              onClick={() => {
                // Optionally handle cancel action
              }}
            >
              Cancel
            </button>
            <Button
              type="submit"
              className="cursor-pointer relative inline-flex h-10 overflow-hidden rounded-lg p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
              disabled={isLoading} // Disable button when loading
            >
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              <span className="font-bold text-lg inline-flex h-full w-full items-center justify-center rounded-lg bg-slate-950 px-6 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                {isLoading ? 'Saving...' : 'Save'}
              </span>
            </Button>
          </div>
        </form>
      </div>)}
      <BackgroundBeams size={1} duration={15} />
      </div>
      </>
  );
};

export default ClientProfile;

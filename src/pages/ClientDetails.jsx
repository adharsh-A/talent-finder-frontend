import React, { useEffect, useState } from "react";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router";
import { useUpdateUserProfileMutation } from "@/redux/userApi";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export function ClientDetailsForm() {
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
    clientCompany: "",
    companyLocation: "",
    clientContactEmail: "",
    clientWebsite: "",
    clientContactPhone: "",
  });

  // State for validation errors
  const [errors, setErrors] = useState({});

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]: "", // Clear the error for the changed field
    }));
  };

  // Function to validate form data
  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex
    const phoneRegex = /^\+?\d{1,3}?[-. ]?\(?\d{1,4}?\)?[-. ]?\d{1,4}[-. ]?\d{1,9}$/; // Basic phone regex

    if (!formData.clientCompany) {
      newErrors.clientCompany = "Company Name is required";
    }

    if (!formData.companyLocation) {
      newErrors.companyLocation = "Company Location is required";
    }

    if (!formData.clientContactEmail || !emailRegex.test(formData.clientContactEmail)) {
      newErrors.clientContactEmail = "Valid Contact Email is required";
    }

    if (formData.clientWebsite && !formData.clientWebsite.startsWith("http")) {
      newErrors.clientWebsite = "Client Website must start with 'http'";
    }

    if (formData.clientContactPhone && !phoneRegex.test(formData.clientContactPhone)) {
      newErrors.clientContactPhone = "Valid Contact Phone Number is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fix the errors before submitting.", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    try {
      const response = await updateUserProfile(formData).unwrap();
      console.log("Update response:", response);

    toast.success("Profile updated successfully");
    navigate("/");
    } catch (err) {
      console.log(err);
      toast.error("Failed: Try Again", {
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
        Fill in your professional and client details
      </p>
      <form className="my-8" onSubmit={handleSubmit}>
        {/* Client Details */}
        <LabelInputContainer className="mb-4">
          <Label htmlFor="clientCompany">Company Name</Label>
          <Input
            id="clientCompany"
            placeholder="e.g., ABC Corp."
            type="text"
            value={formData.clientCompany}
            onChange={handleInputChange}
          />
          {errors.clientCompany && <span className="text-red-500 text-sm">{errors.clientCompany}</span>}
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="companyLocation">Company Location</Label>
          <Input
            id="companyLocation"
            placeholder="e.g., New York, NY"
            type="text"
            value={formData.companyLocation}
            onChange={handleInputChange}
          />
          {errors.companyLocation && <span className="text-red-500 text-sm">{errors.companyLocation}</span>}
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="clientContactEmail">Contact Email</Label>
          <Input
            id="clientContactEmail"
            placeholder="e.g., client@example.com"
            type="email"
            required
            value={formData.clientContactEmail}
            onChange={handleInputChange}
          />
          {errors.clientContactEmail && <span className="text-red-500 text-sm">{errors.clientContactEmail}</span>}
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="clientWebsite">Client Website</Label>
          <Input
            id="clientWebsite"
            placeholder="e.g., https://www.abccorp.com"
            type="url"
            value={formData.clientWebsite}
            onChange={handleInputChange}
          />
          {errors.clientWebsite && <span className="text-red-500 text-sm">{errors.clientWebsite}</span>}
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="clientContactPhone">Contact Phone Number</Label>
          <Input
            id="clientContactPhone"
            placeholder="e.g., +1 555-555-5555"
            type="tel"
            value={formData.clientContactPhone}
            onChange={handleInputChange}
          />
          {errors.clientContactPhone && <span className="text-red-500 text-sm">{errors.clientContactPhone}</span>}
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

import Footer from "@/components/Footer";
import React from "react";
import { useParams } from "react-router";
import { useGetUserQuery } from "@/redux/userApi";

const ProfileView = () => {
  const { id } = useParams();
  const { data: talent = {} } = useGetUserQuery(id);

  return (
    <>
<div className="flex justify-center items-center min-h-screen">
  <div className="bg-slate-950 border drop-shadow-2xl shadow-lg rounded-lg p-6 w-xl max-w-2xl mt-20">
    <h1 className="text-3xl font-bold mb-6 text-center text-slate-50">Profile View</h1>
    <div className="flex justify-center mb-4">
      <div className="w-24 h-24 rounded-full overflow-hidden">
        <img src="https://via.placeholder.com/100" alt="Profile Picture" className="w-full h-full object-cover" />
      </div>
    </div>
    <div className="space-y-4 text-justify mr-40">
      <h2 className="text-lg">
        <span className="font-semibold text-slate-50">Name:</span> {talent?.name || "N/A"}
      </h2>
      <h2 className="text-lg">
        <span className="font-semibold text-slate-50">Username:</span> {talent?.username || "N/A"}
      </h2>
      <h2 className="text-lg">
        <span className="font-semibold text-slate-50">Role:</span> {talent?.role || "N/A"}
      </h2>
      <h2 className="text-lg">
        <span className="font-semibold text-slate-50">Occupation:</span> {talent?.data?.occupation || "Occupation not found"}
      </h2>
      <h2 className="text-lg">
        <span className="font-semibold text-slate-50">Experience:</span> {talent?.data?.experience || "Experience not found"}
      </h2>
      <h2 className="text-lg">
        <span className="font-semibold text-slate-50">Portfolio:</span>{" "}
        {talent?.data?.portfolio ? (
          <a href={talent?.data?.portfolio} target="_blank" rel="noopener noreferrer" className="text-blue-500">
            {talent?.data?.portfolio}
          </a>
        ) : (
          "N/A"
        )}
      </h2>
      <h2 className="text-lg">
        <span className="font-semibold text-slate-50">Additional Info:</span> {talent?.data?.additionalInfo || "N/A"}
      </h2>
    </div>
  </div>
</div>

    </>
  );
};

export default ProfileView;

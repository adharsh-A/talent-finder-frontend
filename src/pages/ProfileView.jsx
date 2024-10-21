import React from "react";
import { useParams } from "react-router";
import { useGetUserQuery } from "@/redux/userApi";
import Loader from "@/components/ui/Loader";
import { BackgroundBeams } from "@/components/ui/background-beams";

const ProfileView = () => {
  const { id } = useParams();
  const { data: talent = {}, isLoading } = useGetUserQuery(id);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex justify-center items-center min-h-screen md:mt-6">
          <div className="bg-slate-950 border drop-shadow-2xl shadow-lg rounded-lg p-6 w-xl max-w-2xl mt-20">
            <h1 className="text-3xl font-bold mb-6 text-center text-slate-50">Profile View</h1>
            <div className="flex justify-center mb-4">
              <div className="w-24 h-24 rounded-full overflow-hidden">
                <img
                  src={
                    talent?.image ||
                    "https://tabler.io/_next/image?url=%2Favatars%2Fdefault%2F78529e2ec8eb4a2eb2fb961e04915b0a.png&w=400&q=75"
                  }
                  alt="Profile Picture"
                  className="w-full h-full object-cover"
                />
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
                <span className="font-semibold text-slate-50">Occupation:</span>{" "}
                {talent?.data?.occupation || "Occupation not found"}
                </h2>
                <h2 className="text-lg">
                <span className="font-semibold text-slate-50">Skills:</span>{" "}
                {talent?.data?.skills ? (
                  <div className="inline-flex gap-2 mt-2">
                    {talent.data.skills.split(',').map((skill, index) => (
                      <span
                        key={index}
                        className="bg-slate-700 text-slate-50 px-2 py-1 rounded-md text-sm"
                      >
                        {skill.trim()}
                      </span>
                    ))}
                  </div>
                ) : (
                  "No skills listed"
                )}
              </h2>
              <h2 className="text-lg">
                <span className="font-semibold text-slate-50">Experience:</span>{" "}
                {talent?.data?.experience || "Experience not found"}
              </h2>
              <h2 className="text-lg">
                <span className="font-semibold text-slate-50">Portfolio:</span>{" "}
                {talent?.data?.portfolio ? (
                  <a
                    href={talent?.data?.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500"
                  >
                    {talent?.data?.portfolio}
                  </a>
                ) : (
                  "N/A"
                )}
              </h2>
              <h2 className="text-lg">
                <span className="font-semibold text-slate-50">Additional Info:</span>{" "}
                {talent?.data?.additionalInfo || "N/A"}
              </h2>

            </div>
          </div>
        </div>
      )}
      <BackgroundBeams/>
    </>
  );
};

export default ProfileView;
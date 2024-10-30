import React,{ useEffect } from "react";
import { useParams } from "react-router";
import { useGetUserQuery } from "@/redux/userApi";
import Loader from "@/components/ui/Loader";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { X } from "lucide-react";

const ProfileView = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  },[])
  const { id } = useParams();
  const { data: talent = {}, isLoading } = useGetUserQuery(id);

  if (isLoading) {
    return <Loader />;
  }

  if (!talent || !talent.data) {
    return (
      <div className="flex items-center justify-center min-h-screen ">
        <div className="text-center bg-gray-800/50  border border-gray-700/30 p-20 rounded-lg">
          <X className="mx-auto h-12 w-12 text-red-500" />
          <h1 className="text-3xl font-bold mb-6">No data found</h1>
          <p className="text-lg">We couldn't find any data for this user</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-center items-center min-h-screen md:mt-6">
        <div className="bg-slate-950 border drop-shadow-2xl shadow-lg rounded-lg p-6 w-xl md:max-w-2xl w-11/12 mt-20">
          <h1 className="md:text-3xl text-xl font-bold mb-6 text-center text-slate-50">Profile View</h1>
          <div className="flex justify-center mb-4">
            <div className="md:w-24 md:h-24 w-36 h-36 rounded-full overflow-hidden relative">
              <img
                src={
                  talent?.image ||
                  "https://tabler.io/_next/image?url=%2Favatars%2Fdefault%2F78529e2ec8eb4a2eb2fb961e04915b0a.png&w=400&q=75"
                }
                alt="Profile Picture"
                className="md:w-full md:h-full object-cover"
              />
            </div>
          </div>
          <div className="md:space-y-4 space-y-2  text-justify ">
            <h2 className="md:text-lg text-base">
              <span className="font-semibold text-slate-50">Name:</span> {talent?.name || "N/A"}
            </h2>
            <h2 className="md:text-lg text-md">
              <span className="font-semibold text-slate-50">Username:</span> {talent?.username || "N/A"}
            </h2>
            <h2 className="md:text-lg text-md">
              <span className="font-semibold text-slate-50">Role:</span> {talent?.role || "N/A"}
            </h2>
            <h2 className="md:text-lg text-md">
              <span className="font-semibold text-slate-50">Occupation:</span>{" "}
              {talent?.data?.occupation || "Occupation not found"}
            </h2>
            <h2 className="md:text-lg text-md">
              <span className="font-semibold text-slate-50">Skills:</span>{" "}
              {talent?.data?.skills ? (
                <div className="inline-flex gap-2 mt-2">
                  {talent.data.skills.split(',').map((skill, index) => (
                    <span
                      key={index}
                      className="bg-slate-700 text-slate-50 px-2 py-1 rounded-md md:text-sm text-xs"
                    >
                      {skill.trim()}
                    </span>
                  ))}
                </div>
              ) : (
                "No skills listed"
              )}
            </h2>
            <h2 className="md:text-lg text-md">
              <span className="font-semibold text-slate-50">Experience:</span>{" "}
              {talent?.data?.experience || "Experience not found"}
            </h2>
            <h2 className="md:text-lg text-md">
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
            <h2 className="md:text-lg text-md">
              <span className="font-semibold text-slate-50">Additional Info:</span>{" "}
              {talent?.data?.additionalInfo || "N/A"}
            </h2>

          </div>
        </div>
      </div>
      <div className="md:block hidden">

      <BackgroundBeams/>
      </div>
    </>
  );
};

export default ProfileView;


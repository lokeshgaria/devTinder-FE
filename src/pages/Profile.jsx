import React, { useEffect, useState } from "react";
import {
  User,
  Edit2,
  Save,
  X,
  Camera,
  Briefcase,
  Music,
  ChevronLeft,
  Plus,
  Link,
} from "lucide-react";
import { useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import AXIOS_API from "../utils/axios";
import { showError } from "../utils/notifications";

const ProfilePage = () => {
  const USER_DETAILS = useSelector((store) => store.user);
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState({});
  const [showUrlInput, setShowUrlInput] = useState(false);

 

  // Initial profile data with only the specified fields
  const [profile, setProfile] = useState({
    photoUrl: USER_DETAILS?.photoUrl,
    about: USER_DETAILS?.about,
    firstName: USER_DETAILS?.firstName,
    lastName: USER_DETAILS?.lastName,
    age: USER_DETAILS?.age,
    gender: USER_DETAILS?.gender,
    skills: USER_DETAILS?.skills || [],
  });

  const [formData, setFormData] = useState({ ...profile });
  const [newSkill, setNewSkill] = useState("");
  const [tempPhotoUrl, setTempPhotoUrl] = useState("");

 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (Object.keys(USER_DETAILS).length > 2) {
      setFormData({ ...USER_DETAILS });
      setProfile({ ...USER_DETAILS });
      setTempPhotoUrl(USER_DETAILS?.photoUrl || "");
    }
  }, [USER_DETAILS]);

  const handleSave = async () => {
    try {
      setLoading(true);
      const { firstName, lastName, age, about, photoUrl, gender, skills } =
        formData;
      const EDIT_PAYLOAD = {
        firstName,
        lastName,
        age,
        about,
        photoUrl,
        gender,
        skills,
      };
      const { data } = await AXIOS_API.patch("/profile/edit", EDIT_PAYLOAD);
      if (data.success) {
        setProfile(formData);
        setIsEditing(false);
        setShowUrlInput(false);
      }
    } catch (error) {
      setError({ apiError: error.message });
      showError(error.message )
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({ ...profile });
    setIsEditing(false);
    setShowUrlInput(false);
    setTempPhotoUrl(profile.photoUrl || "");
  };

  const handlePhotoUrlChange = (e) => {
    const value = e.target.value;
    setTempPhotoUrl(value);
    // Update formData only when we confirm
  };

  const handleApplyPhotoUrl = () => {
    if (tempPhotoUrl.trim()) {
      setFormData((prev) => ({
        ...prev,
        photoUrl: tempPhotoUrl.trim(),
      }));
      setShowUrlInput(false);
    }
  };

  const handleCancelPhotoUrl = () => {
    setTempPhotoUrl(formData.photoUrl || "");
    setShowUrlInput(false);
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }));
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddSkill();
    }
  };

  const skillColors = [
    "bg-gradient-to-r from-blue-500 to-purple-600",
    "bg-gradient-to-r from-green-500 to-teal-600",
    "bg-gradient-to-r from-yellow-500 to-orange-600",
    "bg-gradient-to-r from-pink-500 to-rose-600",
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-4">
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => navigate(-1)}
              className="btn btn-ghost hover:bg-gray-800/50 rounded-full"
            >
              <ChevronLeft className="w-5 h-5" />
              Back
            </button>

            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {isEditing ? "Edit Profile" : "Profile"}
            </h1>

            <div>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="btn btn-primary btn-sm rounded-full"
                >
                  <Edit2 className="w-4 h-4 mr-2" />
                  Edit
                </button>
              ) : (
                <div className="flex space-x-2">
                  <button
                    onClick={handleCancel}
                    className="btn btn-ghost btn-sm rounded-full"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </button>
                  <button
                    disabled={loading}
                    onClick={handleSave}
                    className="btn btn-primary btn-sm rounded-full"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {loading ? "Saving..." : "Save"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Profile Picture & Basic Info */}
            <div className="lg:col-span-1">
              <div className="card bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden p-6">
                {/* Profile Picture */}
                <div className="flex flex-col items-center mb-6">
                  <div className="relative mb-4">
                    <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-gray-700">
                      <img
                        src={isEditing ? formData.photoUrl : profile.photoUrl}
                        alt="Profile"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/200x200?text=No+Image";
                        }}
                      />
                    </div>

                    {isEditing && !showUrlInput && (
                      <button
                        onClick={() => setShowUrlInput(true)}
                        className="absolute bottom-4 right-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full p-3 cursor-pointer hover:scale-105 transition-transform shadow-lg"
                      >
                        <Link className="w-5 h-5" />
                      </button>
                    )}

                    {isEditing && showUrlInput && (
                      <div className="absolute bottom-4 left-0 right-0 bg-gray-800/90 backdrop-blur-sm p-3 rounded-lg mx-4">
                        <input
                          type="text"
                          value={tempPhotoUrl}
                          onChange={handlePhotoUrlChange}
                          placeholder="Enter image URL..."
                          className="input input-bordered w-full bg-gray-700 border-gray-600 mb-2"
                        />
                        <div className="flex space-x-2">
                          <button
                            onClick={handleApplyPhotoUrl}
                            className="btn btn-success btn-xs flex-1"
                          >
                            Apply
                          </button>
                          <button
                            onClick={handleCancelPhotoUrl}
                            className="btn btn-ghost btn-xs"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Name */}
                  <div className="text-center mb-4">
                    {isEditing ? (
                      <div className="space-y-3">
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="text-2xl font-bold bg-transparent border-b border-gray-600 text-center focus:outline-none focus:border-blue-500 w-full"
                          placeholder="First Name"
                        />
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="text-2xl font-bold bg-transparent border-b border-gray-600 text-center focus:outline-none focus:border-blue-500 w-full"
                          placeholder="Last Name"
                        />
                      </div>
                    ) : (
                      <h2 className="text-2xl font-bold">
                        {profile.firstName} {profile.lastName}
                      </h2>
                    )}
                  </div>

                  {/* Age & Gender */}
                  <div className="flex space-x-4 mb-6">
                    {isEditing ? (
                      <>
                        <div className="text-center">
                          <div className="text-sm text-gray-400 mb-1">Age</div>
                          <input
                            type="number"
                            name="age"
                            value={formData.age}
                            onChange={handleInputChange}
                            className="text-lg font-medium bg-transparent border-b border-gray-600 text-center focus:outline-none focus:border-blue-500 w-16"
                          />
                        </div>

                        <div className="text-center">
                          <div className="text-sm text-gray-400 mb-1">
                            Gender
                          </div>
                          <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleInputChange}
                            className="text-lg text-gray-400 font-medium bg-transparent border-b border-gray-600 text-center focus:outline-none focus:border-blue-500"
                          >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                            <option value="prefer-not-to-say">
                              Prefer not to say
                            </option>
                          </select>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="text-center">
                          <div className="text-sm text-gray-400">Age</div>
                          <div className="text-lg font-medium">
                            {profile.age}
                          </div>
                        </div>

                        <div className="text-center">
                          <div className="text-sm text-gray-400">Gender</div>
                          <div className="text-lg font-medium capitalize">
                            {profile.gender}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - About & Skills */}
            <div className="lg:col-span-2 space-y-6">
              {/* About Section */}
              <div className="card bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <User className="w-5 h-5 mr-2 text-blue-400" />
                  About
                </h3>

                {isEditing ? (
                  <textarea
                    name="about"
                    value={formData.about}
                    onChange={handleInputChange}
                    rows="6"
                    className="textarea textarea-bordered w-full bg-gray-800/30 border-gray-600 focus:border-blue-500 resize-none"
                    placeholder="Tell about yourself..."
                  />
                ) : (
                  <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                    {profile.about}
                  </p>
                )}
              </div>

              {/* Skills Section */}
              <div className="card bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold flex items-center">
                    <Briefcase className="w-5 h-5 mr-2 text-purple-400" />
                    Skills
                  </h3>
                  {isEditing && (
                    <div className="badge badge-outline">
                      {formData.skills.length} skills
                    </div>
                  )}
                </div>

                {isEditing ? (
                  <div className="space-y-4">
                    {/* Add Skill Input */}
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Add a new skill..."
                        className="input input-bordered flex-1 bg-gray-800/30 border-gray-600 focus:border-blue-500"
                      />
                      <button
                        onClick={handleAddSkill}
                        className="btn btn-primary"
                        disabled={!newSkill.trim()}
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Current Skills */}
                    <div className="flex flex-wrap gap-2">
                      {formData.skills.map((skill, index) => (
                        <div
                          key={index}
                          className={`${
                            skillColors[index % skillColors.length]
                          } text-white px-4 py-2 rounded-full flex items-center space-x-2`}
                        >
                          <span>{skill}</span>
                          <button
                            onClick={() => handleRemoveSkill(skill)}
                            className="hover:opacity-80 ml-2"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}

                      {formData.skills.length === 0 && (
                        <div className="text-gray-500 italic">
                          No skills added yet. Add your first skill above.
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-3">
                    {profile.skills.map((skill, index) => (
                      <div
                        key={index}
                        className={`${
                          skillColors[index % skillColors.length]
                        } text-white px-4 py-2 rounded-full flex items-center space-x-2`}
                      >
                        {skill === "guitarist" ? (
                          <Music className="w-4 h-4" />
                        ) : (
                          <Briefcase className="w-4 h-4" />
                        )}
                        <span className="capitalize">{skill}</span>
                      </div>
                    ))}

                    {profile.skills.length === 0 && (
                      <div className="text-gray-500 italic">
                        No skills added yet.
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Error Display */}
          {error?.apiError && (
            <div className="mt-6 p-4 bg-red-900/30 border border-red-700/50 rounded-lg">
              <div className="flex items-center">
                <div className="animate-pulse mr-2">•</div>
                <p className="text-red-300 text-sm">{error?.apiError}</p>
              </div>
            </div>
          )}
        </div>

        {/* Edit Mode Indicator */}
        {isEditing && (
          <div className="fixed bottom-4 right-4 z-50">
            <div className="alert alert-info bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg rounded-full px-4 py-2">
              <div className="flex items-center">
                <div className="animate-pulse mr-2">•</div>
                <span className="text-sm">Editing Mode</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProfilePage;

import React, { useState, useEffect } from "react";
import {
  UserPlus,
  CheckCircle,
  XCircle,
  ChevronLeft,
  Check,
  X,
  UserCheck,
  UserX,
  User,
  Clock,
  Mail,
  Briefcase,
} from "lucide-react";
import { useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import { CONNECTION_REQUESTS } from "../utils/constants";
import useRequest from "../hooks/useRequest";

const RequestsPage = () => {
  const {
    loading: apiLoading,
    requestList,
    handleRequestAction,
  } = useRequest();
  const navigate = useNavigate();
  const [requests, setRequests] = useState([
    {
      _id: "6950b8bb0bdeceee389a890c",
      firstName: "sdsd",
      lastName: "hello",
      email: "tw1i1tty@gmail.com",
      photoUrl:
        "https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg?semt=ais_hybrid&w=740&q=80",
      about: "this is a default url here",
      skills: [],
    },
    {
      _id: "6950b8bb0bdeceee389a891d",
      firstName: "Alex",
      lastName: "Morgan",
      email: "alex.morgan@example.com",
      photoUrl:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=774&q=80",
      about: "Senior Frontend Engineer with expertise in React and TypeScript",
      skills: ["React", "TypeScript", "Next.js"],
    },
    {
      _id: "6950b8bb0bdeceee389a892e",
      firstName: "Taylor",
      lastName: "Chen",
      email: "taylor.chen@example.com",
      photoUrl:
        "https://images.unsplash.com/photo-1494790108755-2616b786d4d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=774&q=80",
      about:
        "Product Designer passionate about creating beautiful digital experiences",
      skills: ["Figma", "UI Design", "Prototyping"],
    },
    {
      _id: "6950b8bb0bdeceee389a893f",
      firstName: "Jordan",
      lastName: "Lee",
      email: "jordan.lee@example.com",
      photoUrl:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=774&q=80",
      about: "Data Scientist specializing in Machine Learning and AI",
      skills: ["Python", "Machine Learning", "Data Science"],
    },
  ]);

  const [loading, setLoading] = useState({});
  const [processedRequests, setProcessedRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  console.log("filteredRequests", filteredRequests);
  // Filter out processed requests
  //   useEffect(() => {
  //     const pendingRequests = requests.filter(req => !processedRequests.includes(req._id));
  //     setFilteredRequests(pendingRequests);
  //   }, [requests, processedRequests]);

  useEffect(() => {
    if (requestList.length > 0 && !apiLoading) {
      setFilteredRequests(requestList);
    }
  }, [apiLoading, requestList]);

  const handleAccept = async (requestId) => {
    setLoading((prev) => ({ ...prev, [requestId]: "accepting" }));

    handleRequestAction(
      { status: CONNECTION_REQUESTS.ACCEPTED, requestId },
      setProcessedRequests,
      setLoading
    );
  };

  const handleReject = async (requestId) => {
    // setLoading(prev => ({ ...prev, [requestId]: "rejecting" }));

    setLoading((prev) => ({ ...prev, [requestId]: "accepting" }));

    handleRequestAction(
      { status: CONNECTION_REQUESTS.REJECTED, requestId },
      setProcessedRequests,
      setLoading
    );
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
            <div className="text-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-green-500 to-blue-400 bg-clip-text text-transparent flex items-center justify-center">
                <UserPlus className="w-6 h-6 mr-2" />
                Connection Requests
              </h1>
              <p className="text-gray-400 mt-1">
                {filteredRequests.length} pending request
                {filteredRequests.length !== 1 ? "s" : ""}
              </p>
            </div>
            <div className="w-20"></div> {/* Spacer for alignment */}
          </div>
        </div>

        {/* Requests List */}
        <div className="max-w-4xl mx-auto">
          {filteredRequests.length === 0 ? (
            <div className="text-center py-16">
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                All requests processed!
              </h3>
              <p className="text-gray-400">No pending connection requests.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredRequests.map((request) => (
                <div
                  key={request.fromUserId?._id}
                  className="card bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden hover:border-green-500/30 transition-all duration-300"
                >
                  {/* Request Card Content */}
                  <div className="p-6">
                    {/* User Info */}
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="relative">
                        {/* <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-green-500/30">
                          <img
                            src={request?.fromUserId?.photoUrl}
                            alt={`${request?.fromUserId?.firstName} ${request?.fromUserId?.lastName}`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src =
                                "https://via.placeholder.com/100x100?text=No+Image";
                            }}
                          />
                        </div> */}
                         <div className="w-16 h-16 items-center flex justify-center rounded-full overflow-hidden border-2 border-pink-500/30">
                            {/* <img
                              src={connection.photoUrl}
                              alt={`${connection.firstName} ${connection.lastName}`}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.src = "https://via.placeholder.com/100x100?text=No+Image";
                              }}
                            /> */}
                            <User />
                          </div>
                        <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center border-2 border-gray-900">
                          <UserPlus className="w-3 h-3" />
                        </div>
                      </div>

                      <div className="flex-1">
                        <h3 className="text-xl font-bold">
                          {request?.fromUserId.firstName}{" "}
                          {request?.fromUserId?.lastName}
                        </h3>
                        <div className="flex items-center space-x-2 mt-1 text-sm text-gray-400">
                          <Mail className="w-4 h-4" />
                          <span className="truncate">
                            {request?.fromUserId.email}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* About */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-400 mb-2">
                        About
                      </h4>
                      <p className="text-gray-300 text-sm">
                        {request?.fromUserId.about}
                      </p>
                    </div>

                    {/* Skills */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-400 mb-2">
                        Skills
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {request?.fromUserId.skills.length === 0 ? (
                          <span className="text-gray-500 italic text-sm">
                            No skills added
                          </span>
                        ) : (
                          request?.fromUserId?.skills.map((skill, index) => (
                            <span
                              key={index}
                              className={`${
                                skillColors[index % skillColors.length]
                              } text-white px-3 py-1 rounded-full text-xs`}
                            >
                              {skill}
                            </span>
                          ))
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleAccept(request?._id)}
                        disabled={loading[request?.fromUserId._id]}
                        className="btn btn-success flex-1 rounded-full"
                      >
                        {loading[request?.fromUserId.id] === "accepting" ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                            Accepting...
                          </>
                        ) : (
                          <>
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Accept
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => handleReject(request?._id)}
                        disabled={loading[request?.fromUserId?._id]}
                        className="btn btn-error flex-1 rounded-full"
                      >
                        {loading[request._id] === "rejecting" ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                            Rejecting...
                          </>
                        ) : (
                          <>
                            <XCircle className="w-4 h-4 mr-2" />
                            Reject
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default RequestsPage;

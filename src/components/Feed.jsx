import React, { useState, useEffect, useRef } from "react";
import {
  Heart,
  X,
  User,
  Flame,
  Settings,
  Mail,
  MapPin,
  Zap,
  Star,
  RefreshCw,
  Eye,
  GraduationCap,
  Briefcase,
  Code2,
  ArrowRight,
  ArrowLeft,
  MessageCircle,
  Sparkles,
  Coffee,
  Camera,
  Mountain,
  Music,
  BookOpen,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import "../App.css";
// import {users} from "../utils/mockData"
import useFeed from "../hooks/useFeed";
const App = () => {
  const { feedList: users, loading } = useFeed();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showLike, setShowLike] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showMatch, setShowMatch] = useState(false);
  const [matchName, setMatchName] = useState("");
  const [swipeDirection, setSwipeDirection] = useState(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [activeTab, setActiveTab] = useState("skills");

  const cardRef = useRef(null);
  const startX = useRef(0);

  const currentUser = users[currentIndex];
  const nextUser = users[(currentIndex + 1) % users.length];

  
  const handleLike = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setShowLike(true);
    setSwipeDirection("right");

    setTimeout(() => {
      // Random chance of match (30%)
      if (Math.random() < 0.3) {
        setMatchName(currentUser.name);
        setShowMatch(true);
      }

      setCurrentIndex((prev) => (prev + 1) % users.length);
      setIsAnimating(false);
      setShowLike(false);
      setSwipeDirection(null);
    }, 500);
  };

  const handlePass = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setShowPass(true);
    setSwipeDirection("left");

    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % users.length);
      setIsAnimating(false);
      setShowPass(false);
      setSwipeDirection(null);
    }, 500);
  };

  const handleProfileClick = () => {
    setShowProfile(true);
  };

  const handleCloseProfile = () => {
    setShowProfile(false);
  };

  const handleCloseMatch = () => {
    setShowMatch(false);
  };

  const handleUndo = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleSuperLike = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setMatchName(currentUser.name);
    setShowMatch(true);

    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % users.length);
      setIsAnimating(false);
    }, 500);
  };

  // Drag functionality
  const handleMouseDown = (e) => {
    setIsDragging(true);
    startX.current = e.clientX || e.touches[0].clientX;
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const currentX = e.clientX || e.touches[0].clientX;
    const offset = currentX - startX.current;
    setDragOffset(offset);

    if (offset > 50) {
      setShowLike(true);
      setShowPass(false);
    } else if (offset < -50) {
      setShowPass(true);
      setShowLike(false);
    } else {
      setShowLike(false);
      setShowPass(false);
    }
  };

  const handleMouseUp = () => {
    if (!isDragging) return;

    setIsDragging(false);

    if (dragOffset > 100) {
      handleLike();
    } else if (dragOffset < -100) {
      handlePass();
    }

    setDragOffset(0);
    setShowLike(false);
    setShowPass(false);
  };

  // Add event listeners for drag
  useEffect(() => {
    const card = cardRef.current;
    if (card) {
      card.addEventListener("mousedown", handleMouseDown);
      card.addEventListener("touchstart", handleMouseDown);
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("touchmove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("touchend", handleMouseUp);
    }

    return () => {
      if (card) {
        card.removeEventListener("mousedown", handleMouseDown);
        card.removeEventListener("touchstart", handleMouseDown);
      }
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("touchmove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isAnimating) return;

      switch (e.key) {
        case "ArrowRight":
        case "d":
          handleLike();
          break;
        case "ArrowLeft":
        case "a":
          handlePass();
          break;
        case " ":
          handleProfileClick();
          break;
        case "Escape":
          setShowProfile(false);
          setShowMatch(false);
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isAnimating]);

  // Skill tag colors
  const skillColors = [
    "bg-gradient-to-r from-blue-500 to-purple-600",
    "bg-gradient-to-r from-green-500 to-teal-600",
    "bg-gradient-to-r from-yellow-500 to-orange-600",
    "bg-gradient-to-r from-pink-500 to-rose-600",
    "bg-gradient-to-r from-purple-500 to-indigo-600",
    "bg-gradient-to-r from-cyan-500 to-blue-600",
  ];

  // Interest icons mapping
  const interestIcons = {
    Hiking: <Mountain className="w-4 h-4" />,
    Photography: <Camera className="w-4 h-4" />,
    Coffee: <Coffee className="w-4 h-4" />,
    "Tech Talks": <MessageCircle className="w-4 h-4" />,
    Reading: <BookOpen className="w-4 h-4" />,
    Yoga: <Sparkles className="w-4 h-4" />,
    "Art Galleries": <Eye className="w-4 h-4" />,
    Minimalism: <Sparkles className="w-4 h-4" />,
    Chess: <Briefcase className="w-4 h-4" />,
    "AI Research": <Code2 className="w-4 h-4" />,
    Podcasts: <MessageCircle className="w-4 h-4" />,
    "Board Games": <Briefcase className="w-4 h-4" />,
    "Mountain Biking": <Mountain className="w-4 h-4" />,
    "Coffee Roasting": <Coffee className="w-4 h-4" />,
    "Tech Blogging": <Code2 className="w-4 h-4" />,
    "Open Source": <Zap className="w-4 h-4" />,
  };

  loading && <p>Loading...</p>;
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-black text-white overflow-hidden">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 max-w-lg">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 flex items-center justify-center">
              <Flame className="w-6 h-6" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">
              DevMatch
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <button className="btn btn-ghost btn-circle">
              <Settings className="w-5 h-5 text-gray-400" />
            </button>
            <button className="btn btn-ghost btn-circle relative">
              <Mail className="w-5 h-5 text-gray-400" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 max-w-lg relative">
        {/* Card Container */}
        <div className="relative h-[550px] mb-8">
          {/* Current User Card */}
          <div
            ref={cardRef}
            className={`absolute w-full h-full transition-all duration-300 ${
              isDragging ? "cursor-grabbing" : "cursor-grab"
            }`}
            style={{
              transform: `translateX(${dragOffset}px) rotate(${
                dragOffset * 0.1
              }deg)`,
              zIndex: 10,
            }}
          >
            <div className="card bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-sm border border-gray-700/50 rounded-3xl overflow-hidden h-full shadow-2xl shadow-black/50">
              {/* Profile Image */}
              <div className="h-2/3 relative overflow-hidden">
                <img
                  src={currentUser?.photoUrl || "url"}
                  alt={currentUser?.firstName || "abc"}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>

                {/* User Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex justify-between items-end">
                    <div>
                      <h2 className="text-3xl font-bold">
                        {currentUser?.firstName + " " + currentUser?.lastName ||
                          "name"}
                      </h2>
                      <p className="text-xl">
                        {currentUser?.age || "NA"} •{" "}
                        {currentUser?.profession ?? "dev"}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2 bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-700/50">
                      <MapPin className="w-4 h-4 text-pink-400" />
                      <span>{currentUser?.distance || "8km"}</span>
                    </div>
                  </div>
                </div>

                {/* Swipe Indicators */}
                {showLike && (
                  <div className="absolute top-6 left-6 bg-green-500/90 backdrop-blur-sm text-white font-bold px-6 py-2 rounded-full animate-pulse border border-green-400/50">
                    <Heart
                      className="inline w-4 h-4 mr-2"
                      fill="currentColor"
                    />{" "}
                    LIKE
                  </div>
                )}
                {showPass && (
                  <div className="absolute top-6 right-6 bg-red-500/90 backdrop-blur-sm text-white font-bold px-6 py-2 rounded-full animate-pulse border border-red-400/50">
                    <X className="inline w-4 h-4 mr-2" /> PASS
                  </div>
                )}
              </div>

              {/* User Details */}
              <div className="p-6 h-1/3 overflow-y-auto hide-scrollbar">
                {/* Tabs */}
                <div className="flex mb-4 border-b border-gray-700">
                  <button
                    className={`px-4 py-2 font-medium transition-all ${
                      activeTab === "skills"
                        ? "text-pink-400 border-b-2 border-pink-500"
                        : "text-gray-400"
                    }`}
                    onClick={() => setActiveTab("skills")}
                  >
                    Skills
                  </button>
                  {/* <button
                    className={`px-4 py-2 font-medium transition-all ${
                      activeTab === "interests"
                        ? "text-pink-400 border-b-2 border-pink-500"
                        : "text-gray-400"
                    }`}
                    onClick={() => setActiveTab("interests")}
                  >
                    Interests
                  </button> */}
                  <button
                    className={`px-4 py-2 font-medium transition-all ${
                      activeTab === "bio"
                        ? "text-pink-400 border-b-2 border-pink-500"
                        : "text-gray-400"
                    }`}
                    onClick={() => setActiveTab("bio")}
                  >
                    Bio
                  </button>
                </div>

                {/* Tab Content */}
                {activeTab === "skills" && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      Skills & Expertise
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {currentUser?.skills?.map((skill, index) => (
                        <span
                          key={index}
                          className={`${
                            skillColors[index % skillColors.length]
                          } text-white px-3 py-1.5 rounded-full text-sm transition-transform hover:scale-105 cursor-pointer`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {/* 
                {activeTab === "interests" && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      Interests & Hobbies
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {currentUser.interests.map((interest, index) => (
                        <span
                          key={index}
                          className="bg-gray-800/50 backdrop-blur-sm text-gray-300 px-3 py-2 rounded-xl text-sm transition-all hover:bg-gray-700/50 hover:text-white flex items-center space-x-2 border border-gray-700/50"
                        >
                          {interestIcons[interest] || (
                            <Sparkles className="w-3 h-3" />
                          )}
                          <span>{interest}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                )} */}

                {activeTab === "bio" && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">About Me</h3>
                    <p className="text-gray-300 leading-relaxed">
                      {currentUser.about}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Next User Preview */}
          <div className="absolute w-full h-full top-4 opacity-30 scale-95 -z-10">
            <div className="card bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-3xl overflow-hidden h-full">
              <div className="h-2/3 relative">
                <img
                  src={nextUser?.image}
                  alt={nextUser?.name}
                  className="w-full h-full object-cover blur-sm"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
              </div>
              <div className="p-6 h-1/3">
                <div className="h-4 bg-gray-700 rounded w-3/4 mb-4"></div>
                <div className="flex flex-wrap gap-2">
                  <div className="h-6 bg-gray-700 rounded-full w-16"></div>
                  <div className="h-6 bg-gray-700 rounded-full w-20"></div>
                  <div className="h-6 bg-gray-700 rounded-full w-24"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center items-center space-x-8 mb-8">
          {/* Pass Button */}
          <button
            onClick={handlePass}
            disabled={isAnimating}
            className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50 hover:border-red-500/50 group"
          >
            <X className="w-8 h-8 text-red-500 group-hover:scale-110 transition-transform" />
          </button>

          {/* Profile Button */}
          <button
            onClick={handleProfileClick}
            disabled={isAnimating}
            className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all hover:border-blue-500/50 group"
          >
            <User className="w-6 h-6 text-blue-500 group-hover:scale-110 transition-transform" />
          </button>

          {/* Like Button */}
          <button
            onClick={handleLike}
            disabled={isAnimating}
            className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50 hover:border-green-500/50 group"
          >
            <Heart className="w-8 h-8 text-green-500 group-hover:scale-110 transition-transform" />
          </button>
        </div>

        {/* Additional Actions */}
        <div className="flex justify-center items-center space-x-6 mb-8">
          <button
            onClick={handleUndo}
            disabled={currentIndex === 0 || isAnimating}
            className="btn btn-ghost btn-circle hover:bg-gray-800/50"
          >
            <RefreshCw className="w-5 h-5 text-gray-400" />
          </button>
          <button
            onClick={handleSuperLike}
            disabled={isAnimating}
            className="btn btn-ghost btn-circle hover:bg-gray-800/50"
          >
            <Star className="w-5 h-5 text-yellow-500" />
          </button>
          <button className="btn btn-ghost btn-circle hover:bg-gray-800/50">
            <Zap className="w-5 h-5 text-purple-500" />
          </button>
        </div>

        {/* Stats Bar */}
        <div className="flex justify-between items-center text-gray-400 text-sm bg-gray-800/30 backdrop-blur-sm rounded-2xl p-4 border border-gray-700/50">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-full bg-green-500/20">
              <Heart className="w-4 h-4 text-green-500" fill="currentColor" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Likes</p>
              <p className="font-semibold">24</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-full bg-blue-500/20">
              <Eye className="w-4 h-4 text-blue-500" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Views</p>
              <p className="font-semibold">156</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-full bg-orange-500/20">
              <Flame className="w-4 h-4 text-orange-500" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Matches</p>
              <p className="font-semibold">8</p>
            </div>
          </div>
        </div>
      </main>

      {/* Profile Modal */}
      {showProfile && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-gradient-to-br from-gray-800/95 to-gray-900/95 backdrop-blur-md border border-gray-700/50 rounded-3xl max-w-md w-full p-6 shadow-2xl shadow-black/50">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">Profile Details</h3>
              <button
                onClick={handleCloseProfile}
                className="btn btn-ghost btn-circle hover:bg-gray-800/50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-pink-500/30">
                    <img
                      src={currentUser.image}
                      alt={currentUser.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 flex items-center justify-center border-2 border-gray-900">
                    <User className="w-3 h-3" />
                  </div>
                </div>
                <div>
                  <h4 className="text-2xl font-bold">{currentUser.name}</h4>
                  <p className="text-gray-300">
                    {currentUser.profession} • {currentUser.age}
                  </p>
                  <div className="flex items-center mt-2 text-sm">
                    <MapPin className="w-4 h-4 text-pink-400 mr-2" />
                    <span>{currentUser.location}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/30 rounded-2xl p-4 border border-gray-700/50">
                <h4 className="text-lg font-semibold mb-2">Bio</h4>
                <p className="text-gray-300 leading-relaxed">
                  {currentUser.bio}
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-3">Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-xl border border-gray-700/50 hover:bg-gray-800/70 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <Briefcase className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Company</p>
                      <p className="font-medium">{currentUser.company}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-xl border border-gray-700/50 hover:bg-gray-800/70 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                      <GraduationCap className="w-5 h-5 text-green-500" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Education</p>
                      <p className="font-medium">{currentUser.education}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-xl border border-gray-700/50 hover:bg-gray-800/70 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                      <Code2 className="w-5 h-5 text-purple-500" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Experience</p>
                      <p className="font-medium">{currentUser.experience}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-xl border border-gray-700/50 hover:bg-gray-800/70 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-pink-500/20 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-pink-500" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Distance</p>
                      <p className="font-medium">{currentUser.distance}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-2">Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {currentUser.skills.map((skill, index) => (
                    <span
                      key={index}
                      className={`${
                        skillColors[index % skillColors.length]
                      } text-white px-3 py-1.5 rounded-full text-sm`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  onClick={handlePass}
                  className="btn btn-outline btn-error flex-1 hover:bg-red-500/10"
                >
                  <X className="w-4 h-4 mr-2" /> Pass
                </button>
                <button
                  onClick={handleLike}
                  className="btn bg-gradient-to-r from-green-500 to-emerald-600 border-none flex-1 hover:opacity-90"
                >
                  <Heart className="w-4 h-4 mr-2" fill="white" /> Like
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Match Modal */}
      {showMatch && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-gradient-to-br from-pink-500 via-pink-600 to-orange-500 rounded-3xl max-w-md w-full p-8 text-center shadow-2xl shadow-pink-500/30">
            <div className="animate-pulse">
              <Heart
                className="w-20 h-20 text-white mx-auto mb-6"
                fill="currentColor"
              />
            </div>
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-white/10 blur-xl rounded-full"></div>
              <h2 className="text-4xl font-bold mb-4 relative">
                It's a Match!
              </h2>
            </div>
            <p className="text-xl mb-8">
              You and <span className="font-bold">{matchName}</span> liked each
              other!
            </p>
            <div className="flex space-x-4">
              <button
                onClick={handleCloseMatch}
                className="btn bg-white/20 backdrop-blur-sm border-white/30 text-white flex-1 hover:bg-white/30"
              >
                Keep Swiping
              </button>
              <button className="btn bg-white text-pink-600 flex-1 hover:bg-gray-100">
                <MessageCircle className="w-4 h-4 mr-2" />
                Send Message
              </button>
            </div>
            <p className="text-white/70 text-sm mt-6">
              This could be the beginning of something amazing! ✨
            </p>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="fixed bottom-4 left-4 text-sm text-gray-500 hidden md:block bg-gray-900/50 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-700/50">
        <p className="flex items-center space-x-2">
          <span>💡 Use</span>
          <kbd className="px-2 py-1 bg-gray-800 rounded text-xs flex items-center">
            <ArrowLeft className="w-3 h-3 mr-1" /> A
          </kbd>
          <span>and</span>
          <kbd className="px-2 py-1 bg-gray-800 rounded text-xs flex items-center">
            <ArrowRight className="w-3 h-3 mr-1" /> D
          </kbd>
          <span>to swipe •</span>
          <kbd className="px-2 py-1 bg-gray-800 rounded text-xs">Space</kbd>
          <span>for profile</span>
        </p>
      </div>
    </div>
  );
};

export default App;

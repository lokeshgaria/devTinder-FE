import React, { useState, useEffect } from "react";
import { 
  Users, 
  Search, 
  Filter, 
  MessageCircle, 
  UserCheck, 
  UserX, 
  MoreVertical,
  ChevronLeft,
  Check,
  X,
  Phone,
  Video,
  Mail,
  Music,
  Heart,
  Sparkles,
  Coffee,
  Camera,
  Mountain,
  BookOpen,
  Code2,
  Star,
  Zap
} from "lucide-react";
import { useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import useConnections from "../hooks/useConnections";

const ConnectionsPage = () => {

    const {connectionList,loading} = useConnections()
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [connections, setConnections] = useState([
    {
      "_id": "6950b8bb0bdeceee389a890c",
      "firstName": "sdsd",
      "lastName": "hello",
      "photoUrl": "https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg?semt=ais_hybrid&w=740&q=80",
      "about": "this is a default url here",
      "skills": [],
      "status": "online",
      "lastActive": "2 minutes ago",
      "interests": ["Music", "Gaming", "Photography"],
      "mutualConnections": 3,
      "matchDate": "2024-03-15",
      "messages": 12
    },
  
  ]);

  const [filteredConnections, setFilteredConnections] = useState(connections);
  const [selectedConnection, setSelectedConnection] = useState(null);

  useEffect(() => {
    if(!loading && connectionList.length>0){
setFilteredConnections(connectionList)
    }else{
      setFilteredConnections([])
    }
  },[loading])
  // Filter connections based on search and filter
  useEffect(() => {
    let result = connections;

    // Search filter
    if (searchQuery) {
      result = result.filter(conn =>
        `${conn.firstName} ${conn.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
        conn.about.toLowerCase().includes(searchQuery.toLowerCase()) ||
        conn.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Status filter
    if (activeFilter !== "all") {
      result = result.filter(conn => conn.status === activeFilter);
    }

    setFilteredConnections(result);
  }, [searchQuery, activeFilter, connections]);

  const handleRemoveConnection = (id) => {
    if (window.confirm("Are you sure you want to remove this connection?")) {
      setConnections(prev => prev.filter(conn => conn._id !== id));
    }
  };

  const handleSendMessage = (connection) => {
    // Navigate to chat or open chat modal
    console.log("Open chat with:", connection.firstName);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case "online": return "bg-green-500";
      case "away": return "bg-yellow-500";
      case "offline": return "bg-gray-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case "online": return "Online";
      case "away": return "Away";
      case "offline": return "Offline";
      default: return "Offline";
    }
  };

  const skillColors = [
    "bg-gradient-to-r from-blue-500 to-purple-600",
    "bg-gradient-to-r from-green-500 to-teal-600",
    "bg-gradient-to-r from-yellow-500 to-orange-600",
    "bg-gradient-to-r from-pink-500 to-rose-600",
  ];

  const interestIcons = {
    "Music": <Music className="w-4 h-4" />,
    "Gaming": <Sparkles className="w-4 h-4" />,
    "Photography": <Camera className="w-4 h-4" />,
    "Coding": <Code2 className="w-4 h-4" />,
    "Hiking": <Mountain className="w-4 h-4" />,
    "Coffee": <Coffee className="w-4 h-4" />,
    "Design": <Sparkles className="w-4 h-4" />,
    "Yoga": <Sparkles className="w-4 h-4" />,
    "Art": <Camera className="w-4 h-4" />,
    "AI": <Zap className="w-4 h-4" />,
    "Chess": <BookOpen className="w-4 h-4" />,
    "Podcasts": <Music className="w-4 h-4" />,
    "Blogging": <BookOpen className="w-4 h-4" />,
    "Open Source": <Code2 className="w-4 h-4" />,
    "Tech Talks": <MessageCircle className="w-4 h-4" />,
    "Cloud": <Zap className="w-4 h-4" />,
    "Automation": <Zap className="w-4 h-4" />,
    "Linux": <Code2 className="w-4 h-4" />
  };

  return (
    <>
      <Navbar />
      {
        loading ? "Loading.." : (  <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-4">
        {/* Header */}
        <div className="max-w-6xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => navigate(-1)}
              className="btn btn-ghost hover:bg-gray-800/50 rounded-full"
            >
              <ChevronLeft className="w-5 h-5" />
              Back
            </button>

            <div className="text-center">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-orange-400 bg-clip-text text-transparent flex items-center justify-center">
                <Users className="w-8 h-8 mr-3" />
                Connections
              </h1>
              <p className="text-gray-400 mt-2">
                {filteredConnections.length} people in your network
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <div className="badge badge-primary badge-lg">
                <Heart className="w-3 h-3 mr-1" fill="currentColor" />
                {filteredConnections.length} matches
              </div>
            </div>
          </div>

          {/* Search and Filter Bar */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search Input */}
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search connections by name, skills, or interests..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input input-bordered w-full pl-12 bg-gray-800/50 border-gray-700 focus:border-pink-500"
                />
              </div>

              {/* Filter Buttons */}
              <div className="flex gap-2 overflow-x-auto">
                <button
                  onClick={() => setActiveFilter("all")}
                  className={`btn btn-sm rounded-full ${activeFilter === "all" ? "btn-primary" : "btn-ghost"}`}
                >
                  <Filter className="w-4 h-4 mr-2" />
                  All ({connections.length})
                </button>
                <button
                  onClick={() => setActiveFilter("online")}
                  className={`btn btn-sm rounded-full ${activeFilter === "online" ? "btn-success" : "btn-ghost"}`}
                >
                  <div className={`w-2 h-2 rounded-full ${getStatusColor("online")} mr-2`} />
                  Online ({connections.filter(c => c.status === "online").length})
                </button>
                <button
                  onClick={() => setActiveFilter("recent")}
                  className="btn btn-sm btn-ghost rounded-full"
                >
                  <Star className="w-4 h-4 mr-2" />
                  Recent
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Connections Grid */}
        <div className="max-w-6xl mx-auto">
          {filteredConnections.length === 0 ? (
            <div className="text-center py-16">
              <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No connections found</h3>
              <p className="text-gray-400">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredConnections.map((connection) => (
                <div
                  key={connection._id}
                  className="card bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden hover:border-pink-500/30 transition-all duration-300 hover:scale-[1.02]"
                >
                  {/* Connection Header */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-pink-500/30">
                            <img
                              src={connection.photoUrl}
                              alt={`${connection.firstName} ${connection.lastName}`}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.src = "https://via.placeholder.com/100x100?text=No+Image";
                              }}
                            />
                          </div>
                          <div className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-gray-900 ${getStatusColor(connection.status)}`} />
                        </div>
                        
                        <div>
                          <h3 className="text-xl font-bold">
                            {connection.firstName} {connection.lastName}
                          </h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className={`text-xs ${connection.status === "online" ? "text-green-400" : "text-gray-400"}`}>
                              {getStatusText(connection.status)}
                            </span>
                            <span className="text-gray-500">•</span>
                            <span className="text-xs text-gray-400">
                              {connection.lastActive}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* <div className="dropdown dropdown-end">
                        <button className="btn btn-ghost btn-sm btn-circle">
                          <MoreVertical className="w-5 h-5" />
                        </button>
                        <ul className="dropdown-content menu p-2 shadow bg-gray-800 rounded-box w-52">
                          <li>
                            <button onClick={() => handleSendMessage(connection)}>
                              <MessageCircle className="w-4 h-4" />
                              Message
                            </button>
                          </li>
                          <li>
                            <button>
                              <Phone className="w-4 h-4" />
                              Call
                            </button>
                          </li>
                          <li>
                            <button>
                              <Video className="w-4 h-4" />
                              Video Call
                            </button>
                          </li>
                          <li className="divider my-1"></li>
                          <li>
                            <button onClick={() => handleRemoveConnection(connection._id)} className="text-red-400">
                              <UserX className="w-4 h-4" />
                              Remove Connection
                            </button>
                          </li>
                        </ul>
                      </div> */}
                    </div>

                    {/* About */}
                    <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                      {connection.about}
                    </p>

                    {/* Mutual Connections */}
                    {connection.mutualConnections > 0 && (
                      <div className="flex items-center text-sm text-gray-400 mb-4">
                        <UserCheck className="w-4 h-4 mr-2" />
                        <span>{connection.mutualConnections} mutual connections</span>
                      </div>
                    )}

                    {/* Skills */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-gray-400">Skills</span>
                        {connection.skills.length === 0 && (
                          <span className="text-xs text-gray-500 italic">No skills added</span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {connection.skills.map((skill, index) => (
                          <span
                            key={index}
                            className={`${skillColors[index % skillColors.length]} text-white px-3 py-1 rounded-full text-xs`}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Interests */}
                    {connection.interests && connection.interests.length > 0 && (
                      <div className="mb-4">
                        <span className="text-sm font-semibold text-gray-400 mb-2 block">Interests</span>
                        <div className="flex flex-wrap gap-2">
                          {connection.interests.map((interest, index) => (
                            <span
                              key={index}
                              className="bg-gray-800/50 backdrop-blur-sm text-gray-300 px-3 py-1 rounded-full text-xs flex items-center space-x-1 border border-gray-700/50"
                            >
                              {interestIcons[interest] || <Star className="w-3 h-3" />}
                              <span>{interest}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Stats */}
                    <div className="flex items-center justify-between text-sm text-gray-400 pt-4 border-t border-gray-700/50">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <MessageCircle className="w-4 h-4 mr-1" />
                          <span>{connection.email}  </span>
                        </div>
                        {/* <div className="flex items-center">
                          <Heart className="w-4 h-4 mr-1" />
                          <span>Matched {new Date(connection.matchDate).toLocaleDateString()}</span>
                        </div> */}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  {/* <div className="p-4 bg-gray-900/30 border-t border-gray-700/50">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleSendMessage(connection)}
                        className="btn btn-primary btn-sm flex-1 rounded-full"
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Message
                      </button>
                      <button className="btn btn-outline btn-sm rounded-full">
                        <Phone className="w-4 h-4" />
                      </button>
                      <button className="btn btn-outline btn-sm rounded-full">
                        <Video className="w-4 h-4" />
                      </button>
                    </div>
                  </div> */}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Stats Footer */}
        {/* <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-gray-700/50">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-gray-800/30 rounded-2xl border border-gray-700/50">
              <div className="text-2xl font-bold text-pink-400">{connections.length}</div>
              <div className="text-sm text-gray-400">Total Connections</div>
            </div>
            <div className="text-center p-4 bg-gray-800/30 rounded-2xl border border-gray-700/50">
              <div className="text-2xl font-bold text-green-400">
                {connections.filter(c => c.status === "online").length}
              </div>
              <div className="text-sm text-gray-400">Online Now</div>
            </div>
            <div className="text-center p-4 bg-gray-800/30 rounded-2xl border border-gray-700/50">
              <div className="text-2xl font-bold text-blue-400">
                {connections.reduce((acc, conn) => acc + conn.messages, 0)}
              </div>
              <div className="text-sm text-gray-400">Total Messages</div>
            </div>
            <div className="text-center p-4 bg-gray-800/30 rounded-2xl border border-gray-700/50">
              <div className="text-2xl font-bold text-purple-400">
                {connections.reduce((acc, conn) => acc + conn.mutualConnections, 0)}
              </div>
              <div className="text-sm text-gray-400">Mutual Connections</div>
            </div>
          </div>
        </div> */}
      </div>)
      }
    

       
    </>
  );
};

export default ConnectionsPage;
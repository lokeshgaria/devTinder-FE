import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  MoreVertical,
  Phone,
  Video,
  Search,
  Check,
  CheckCheck,
  Clock,
  User,
  Image,
  File,
  X,
  ChevronLeft,
} from "lucide-react";
import Navbar from "../components/Navbar";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import AXIOS_API from "../utils/axios";
import { FullPageLoader } from "../components/Loader";

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [showAttachments, setShowAttachments] = useState(false);
  const [loading, setLoading] = useState(null);
  const [receiver, setReceiver] = useState(null);
  const messagesEndRef = useRef(null);
  const socketRef = useRef(null);
  const USER_DETAILS = useSelector((store) => store.user);
console.log('loading',loading)
  const { slugId } = useParams();

  // Auto-scroll to bottom
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  console.log('receiver',receiver)
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Fetch chat history and receiver info
  useEffect(() => {
    const fetchChatHistory = async () => {
      if (!slugId || !USER_DETAILS?._id) return;
      
      try {
        setLoading(true);
        const { data } = await AXIOS_API.get(`/chat/${slugId}`);
        
        console.log("Chat API response:", data);
        
        let receiverInfo = null;
        
        // First, try to get receiver from participants (most reliable)
        // After backend fix, participants will be populated objects
        if (data?.data?.participants && data.data.participants.length > 0) {
          // Check if participants are populated objects or just IDs
          const isPopulated = typeof data.data.participants[0] === "object";
          
          if (isPopulated) {
            const otherParticipant = data.data.participants.find(
              (p) => p._id !== USER_DETAILS._id
            );
            console.log("otherParticipant:", otherParticipant);
            if (otherParticipant) {
              receiverInfo = {
                _id: otherParticipant._id,
                name: `${otherParticipant.firstName || ""} ${otherParticipant.lastName || ""}`.trim() || "User",
                firstName: otherParticipant.firstName,
                lastName: otherParticipant.lastName,
                avatar: otherParticipant.photoUrl,
                status: "online",
              };
            }
          }
        }
        
        // Fallback: try to get receiver info from messages
        if (!receiverInfo && data?.data?.messages && data.data.messages.length > 0) {
          const otherUser = data.data.messages.find(
            (msg) => msg.senderId?._id !== USER_DETAILS._id
          )?.senderId;
          
          if (otherUser) {
            receiverInfo = {
              _id: otherUser._id,
              name: `${otherUser.firstName || ""} ${otherUser.lastName || ""}`.trim() || "User",
              firstName: otherUser.firstName,
              lastName: otherUser.lastName,
              avatar: otherUser.photoUrl,
              status: "online",
            };
          }
        }
        
        if (receiverInfo) {
          setReceiver(receiverInfo);
        }
        
        // Map messages to the format needed for display
        if (data?.data?.messages && data.data.messages.length > 0) {
          const mappedMessages = data.data.messages.map((msg) => ({
            _id: msg._id,
            text: msg.text,
            senderId: msg.senderId,
            isCurrentUser: msg.senderId?._id === USER_DETAILS._id,
            timestamp: msg.createdAt,
            status: "read",
          }));
          
          setMessages(mappedMessages);
        }
      } catch (error) {
        console.error("Error fetching chat history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChatHistory();
  }, [slugId, USER_DETAILS?._id]);

  const handleSendMessage = () => {
    if (!inputText.trim() || !socketRef.current) return;

    socketRef.current.emit("sendMessage", {
      senderName: USER_DETAILS?.firstName,
      loggedInUserId: USER_DETAILS?._id,
      targetUserId: slugId,
      message: inputText,
    });
    setInputText("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileUpload = (type) => {
    alert(`Upload ${type} functionality would be implemented here`);
    setShowAttachments(false);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "sent":
        return <Clock className="w-3 h-3 text-gray-400" />;
      case "delivered":
        return <Check className="w-3 h-3 text-gray-400" />;
      case "read":
        return <CheckCheck className="w-3 h-3 text-blue-500" />;
      default:
        return null;
    }
  };

  // Format timestamp for display
  const formatTime = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Socket connection for real-time messages
  useEffect(() => {
    if (!USER_DETAILS?._id) return;

    const socket = createSocketConnection();
    socketRef.current = socket;

    socket.emit("join-room", {
      userName: USER_DETAILS?.firstName,
      targetUserId: slugId,
      loggedInUserId: USER_DETAILS?._id,
    });

    socket.on("receiveMessage", (messageData) => {
      console.log("receiveMessage", messageData);
      
      // Determine if the message is from the current user
      const isFromCurrentUser = messageData.sender === USER_DETAILS?.firstName;
      
      const newMessage = {
        _id: messageData.id,
        text: messageData.text,
        senderId: {
          _id: isFromCurrentUser ? USER_DETAILS._id : slugId,
          firstName: messageData.sender,
          photoUrl: isFromCurrentUser ? USER_DETAILS.photoUrl : receiver?.avatar,
        },
        isCurrentUser: isFromCurrentUser,
        timestamp: messageData.timestamp,
        status: messageData.status,
      };

      setMessages((prev) => [...prev, newMessage]);
      scrollToBottom();
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [USER_DETAILS?._id, slugId, receiver]);

  if(loading){
    return <FullPageLoader isLoading={loading} />
  }
  return (
    <div className="min-h-screen ">
      <Navbar />

       <div className="max-w-6xl mx-auto p-5">
        {/* Header */}

        <div className="bg-slate-500 rounded-2xl shadow-xl overflow-hidden mb-3">
          <div className="p-2 md:p-2 border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button className="btn btn-circle btn-ghost md:hidden">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="avatar">
                      <div className="w-12 h-12 rounded-full ring ring-primary ring-offset-2">
                        {receiver?.avatar ? (
                          <img src={receiver.avatar} alt={receiver.name} />
                        ) : (
                          <div className="bg-gray-300 w-full h-full flex items-center justify-center">
                            <User className="w-6 h-6 text-gray-500" />
                          </div>
                        )}
                      </div>
                    </div>
                    <div
                      className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ring-2 ring-white ${
                        receiver?.status === "online"
                          ? "bg-green-500"
                          : "bg-gray-400"
                      }`}
                    />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">
                      {receiver?.name || "Loading..."}
                    </h2>
                    <p className="text-sm flex items-center">
                      <span className="w-2 h-2 rounded-full bg-green-500 text-white mr-2"></span>
                      {receiver?.status || "offline"}
                    </p>
                  </div>
                </div>
              </div>

               
            </div>
          </div>

          {/* Chat Messages */}
          <div className="h-[calc(100vh-300px)] overflow-y-auto p-4 md:p-6 bg-gradient-to-b from-base-100 to-base-200">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <span className="loading loading-spinner loading-lg"></span>
              </div>
            ) : messages.length === 0 ? (
              <div className="flex items-center justify-center h-full text-gray-500">
                <p>No messages yet. Start the conversation!</p>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message._id}
                  className={`chat ${
                    message.isCurrentUser ? "chat-end" : "chat-start"
                  } mb-6`}
                >
               

                  <div className="chat-header mb-1">
                    
                    <time className="text-xs opacity-50">
                      {formatTime(message.timestamp)}
                    </time>
                  </div>

                  <div
                    className={`chat-bubble ${
                      message.isCurrentUser ? "chat-bubble-primary" : ""
                    } 
                    ${
                      !message.isCurrentUser
                        ? "bg-gray-100 text-gray-800"
                        : ""
                    } 
                    max-w-xs md:max-w-md lg:max-w-lg break-words`}
                  >
                    {message.text}
                  </div>

                   
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <div className="border-t p-2 md:p-3 bg-slate-500">
            {showAttachments && (
              <div className="mb-4 p-4 bg-base-100 rounded-xl shadow-inner">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold">Attach File</h3>
                  <button
                    onClick={() => setShowAttachments(false)}
                    className="btn btn-circle btn-ghost btn-sm"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid grid-cols-4 gap-3">
                  <button
                    onClick={() => handleFileUpload("image")}
                    className="flex flex-col items-center p-3 hover:bg-base-200 rounded-lg transition-colors"
                  >
                    <Image className="w-8 h-8 text-primary mb-2" />
                    <span className="text-sm">Photo</span>
                  </button>
                  <button
                    onClick={() => handleFileUpload("video")}
                    className="flex flex-col items-center p-3 hover:bg-base-200 rounded-lg transition-colors"
                  >
                    <Video className="w-8 h-8 text-primary mb-2" />
                    <span className="text-sm">Video</span>
                  </button>
                  <button
                    onClick={() => handleFileUpload("document")}
                    className="flex flex-col items-center p-3 hover:bg-base-200 rounded-lg transition-colors"
                  >
                    <File className="w-8 h-8 text-primary mb-2" />
                    <span className="text-sm">Document</span>
                  </button>
                  <button
                    onClick={() => handleFileUpload("contact")}
                    className="flex flex-col items-center p-3 hover:bg-base-200 rounded-lg transition-colors"
                  >
                    <User className="w-8 h-8 text-primary mb-2" />
                    <span className="text-sm">Contact</span>
                  </button>
                </div>
              </div>
            )}

            <div className="flex items-center space-x-3">
              <div className="dropdown dropdown-top">
                {/* <div tabIndex={0} role="button" className="btn btn-circle btn-ghost">
                  <Paperclip className="w-5 h-5" />
                </div> */}
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                >
                  <li>
                    <a onClick={() => setShowAttachments(true)}>
                      <Image className="w-4 h-4" /> Photo & Video
                    </a>
                  </li>
                  <li>
                    <a onClick={() => handleFileUpload("document")}>
                      <File className="w-4 h-4" /> Document
                    </a>
                  </li>
                  <li>
                    <a onClick={() => handleFileUpload("contact")}>
                      <User className="w-4 h-4" /> Contact
                    </a>
                  </li>
                  <li>
                    <a onClick={() => handleFileUpload("location")}>
                      <User className="w-4 h-4" /> Location
                    </a>
                  </li>
                </ul>
              </div>

              <div className="relative flex-1">
                <textarea
                  className="textarea textarea-bordered w-full resize-none pr-12"
                  placeholder="Type your message..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={handleKeyPress}
                  rows={1}
                  style={{ minHeight: "56px" }}
                />
                {/* <button
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className="absolute right-3 top-3 btn btn-circle btn-ghost btn-sm"
                >
                  <Smile className="w-5 h-5" />
                </button> */}
              </div>

              <div className="flex items-center space-x-2">
                {/* <button className="btn btn-circle btn-ghost">
                  <Mic className="w-5 h-5" />
                </button> */}
                <button
                  onClick={handleSendMessage}
                  className={`btn btn-circle ${
                    inputText.trim() ? "btn-primary" : "btn-ghost"
                  }`}
                  disabled={!inputText.trim()}
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Typing Indicator */}
        {/* <div className="flex items-center justify-center space-x-2 mb-4">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
          <span className="text-sm text-gray-500">{receiver.name} is typing...</span>
        </div> */}
      </div>
       
     
    </div>
  );
};

export default ChatWindow;

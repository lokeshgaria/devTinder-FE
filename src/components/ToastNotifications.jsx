import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  X,
  CheckCircle,
  AlertCircle,
  Info,
  AlertTriangle,
  Bell,
  Loader2,
} from "lucide-react";
import { removeNotification } from "../utils/redux/feature/notificationSlice";

const NotificationToast = () => {
  const dispatch = useDispatch();
  const { notifications } = useSelector((state) => state.notification);
  const [position, setPosition] = useState("top-right");

  const getIcon = (type) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-5 h-5" />;
      case "error":
        return <AlertCircle className="w-5 h-5" />;
      case "warning":
        return <AlertTriangle className="w-5 h-5" />;
      case "info":
        return <Info className="w-5 h-5" />;
      case "loading":
        return <Loader2 className="w-5 h-5 animate-spin" />;
      default:
        return <Bell className="w-5 h-5" />;
    }
  };

  const getBgColor = (type) => {
    switch (type) {
      case "success":
        return "bg-gradient-to-r from-green-600 to-emerald-700";
      case "error":
        return "bg-gradient-to-r from-red-600 to-rose-700";
      case "warning":
        return "bg-gradient-to-r from-yellow-600 to-amber-700";
      case "info":
        return "bg-gradient-to-r from-blue-600 to-indigo-700";
      case "loading":
        return "bg-gradient-to-r from-purple-600 to-violet-700";
      default:
        return "bg-gradient-to-r from-gray-700 to-gray-800";
    }
  };

  const getBorderColor = (type) => {
    switch (type) {
      case "success":
        return "border-green-500/30";
      case "error":
        return "border-red-500/30";
      case "warning":
        return "border-yellow-500/30";
      case "info":
        return "border-blue-500/30";
      case "loading":
        return "border-purple-500/30";
      default:
        return "border-gray-600/30";
    }
  };

  const handleDismiss = (id) => {
    dispatch(removeNotification(id));
  };

  // Group notifications by position
  const notificationsByPosition = {
    "top-right": notifications.filter((n) => n.position === "top-right"),
    "top-left": notifications.filter((n) => n.position === "top-left"),
    "bottom-right": notifications.filter((n) => n.position === "bottom-right"),
    "bottom-left": notifications.filter((n) => n.position === "bottom-left"),
  };

  return (
    <>
      {/* Render notifications for each position */}
      {Object.entries(notificationsByPosition).map(([pos, notifications]) => (
        notifications.length > 0 && (
          <div
            key={pos}
            className={`fixed z-50 ${pos.includes('top') ? 'top-4' : 'bottom-4'} ${pos.includes('right') ? 'right-4' : 'left-4'} flex flex-col gap-3 w-96 max-w-full p-4`}
          >
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`${getBgColor(notification.type)} backdrop-blur-sm border ${getBorderColor(
                  notification.type
                )} rounded-2xl shadow-2xl transform transition-all duration-300 animate-slideIn`}
              >
                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className="mt-0.5">
                        <div className="text-white">
                          {getIcon(notification.type)}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-white capitalize">
                          {notification.type}
                        </h4>
                        <p className="text-sm text-white/90 mt-1">
                          {notification.message}
                        </p>
                        {notification.description && (
                          <p className="text-xs text-white/70 mt-2">
                            {notification.description}
                          </p>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => handleDismiss(notification.id)}
                      className="btn btn-ghost btn-xs btn-circle hover:bg-white/20 text-white/70 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  
                  {/* Progress bar for auto-dismiss */}
                  {notification.duration > 0 && (
                    <div className="mt-3 h-1 bg-black/20 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${
                          notification.type === "success"
                            ? "bg-green-400"
                            : notification.type === "error"
                            ? "bg-red-400"
                            : notification.type === "warning"
                            ? "bg-yellow-400"
                            : notification.type === "info"
                            ? "bg-blue-400"
                            : "bg-white"
                        } animate-progress`}
                        style={{
                          animationDuration: `${notification.duration}ms`,
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )
      ))}
      
      {/* Style for animations */}
      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(${position.includes('right') ? '100%' : '-100%'});
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes progress {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }
        
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
        
        .animate-progress {
          animation: progress linear forwards;
        }
      `}</style>
    </>
  );
};

export default NotificationToast;
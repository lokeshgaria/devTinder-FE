import React, { useEffect } from "react";

import { API_END_POINTS } from "../utils/constants";
import AXIOS_API from "../utils/axios";
import { Link } from "react-router";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/redux/feature/userSlice";
import Logo from "./Logo";
import { showError, showSuccess } from "../utils/notifications";
 
import { Crown, Zap } from "lucide-react";

const Navbar = () => {
  const USER_DETAILS = useSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      if (!USER_DETAILS?.firstName) {
        try {
          const { data } = await AXIOS_API.get(`${API_END_POINTS.USER}/profile`, {
            withCredentials: true,
          });

          if (data.success) {
            dispatch(addUser(data.data));
          }
        } catch (error) {
          if (error.status == 401) {
            navigate("/login");
          }
          showError(error.message);
          console.log("error", error);
        }
      }
    };

    fetchUser();
  }, []);

  const navigate = useNavigate();
  const HandleLogout = async () => {
    try {
      const { data, status } = await AXIOS_API.post(
        `${API_END_POINTS.AUTH}/logout`,
        {},
        {
          withCredentials: true,
        }
      );

      if (status >= 200 && status <= 300) {
        navigate("/login");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="flex-1 flex items-center gap-2">
        <Link to="/" className="    text-xl">
            <div className="flex items-center   space-x-3">
       <Logo />
          <h1 className="text-lg font-bold bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">
            LovnTi
          </h1>

          
        </div>
        
        </Link>
       <div>
          {/* PREMIUM BADGE */}
          <div className="flex items-center">
            {USER_DETAILS?.isPremium ? (
              // STATE: PREMIUM USER
              <div className="flex items-center bg-amber-400/10 text-amber-500 px-2 py-1 rounded-full gap-1.5 border border-amber-400/20 shadow-sm">
                <Crown
                  size={12}
                  fill="currentColor"
                  className="animate-pulse"
                />
                <span className="text-[10px] font-bold tracking-tighter uppercase">
                  {USER_DETAILS?.membershipType}
                </span>
              </div>
            ) : (
              // STATE: FREE USER (Flashy Upgrade Button)
              <Link to="/upgrade">
                <button className="group relative btn btn-sm h-10 border-none bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 text-black font-bold hover:shadow-[0_0_20px_rgba(251,191,36,0.8)] transition-all duration-300">
                  {/* Flashy Crown Icon with Hover Animation */}
                  <Crown
                    size={18}
                    className="mr-2 group-hover:rotate-12 group-hover:scale-125 transition-transform duration-200"
                  />
                  <span>UPGRADE</span>

                  {/* Subtle Sparkle Icon */}
                  <Zap
                    size={12}
                    className="absolute -top-1 -right-1 text-white animate-ping"
                  />
                </button>
              </Link>
            )}
          </div>
       </div>
      </div>

      <div className="flex gap-2 items-center">
        {USER_DETAILS && USER_DETAILS?.firstName && (
          <p>Hi {USER_DETAILS?.firstName}</p>
        )}
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src={
                  USER_DETAILS?.photoUrl ||
                  "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                }
              />
            </div>
          </div>
          <ul
            tabIndex="-1"
            
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            style={{zIndex: 999}}
          >
            <li>
              <Link className="justify-between" to="/profile">
                Profile
                <span className="badge">New</span>
              </Link>
            </li>
            <li>
              <Link className="justify-between" to="/connections">
                Connections
              </Link>
            </li>
            <li>
              <Link className="justify-between" to="/requests">
                Requests
              </Link>
            </li>
            {/* <li>
              <Link className="justify-between" to="/upgrade">
                Upgrade
              </Link>
            </li> */}
            <li>
              <button onClick={HandleLogout}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

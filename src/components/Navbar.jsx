import React, { useEffect } from "react";
 
import { BASE_URL } from "../utils/constants";
import AXIOS_API from "../utils/axios";
import { Link } from "react-router";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/redux/feature/userSlice";

const Navbar = () => {
  const USER_DETAILS = useSelector((store) => store.user);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUser = async () => {
      if (!USER_DETAILS?.firstName) {
        try {
          const { data } = await AXIOS_API.get(`/profile`, {
            withCredentials: true,
          });

          if (data.success) {
            dispatch(addUser(data.data));
          }
        } catch (error) {
          if (error.status == 401) {
            navigate("/login");
          }

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
        `/logout`,
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
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">🧌 DevTinder</a>
      </div>
      <div className="flex gap-2 items-center">
        {USER_DETAILS && USER_DETAILS?.firstName && (
          <p>Welcome {USER_DETAILS?.firstName}</p>
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
                <span className="badge">New</span>
              </Link>
            </li>
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

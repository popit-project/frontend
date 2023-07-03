import { useRecoilValue } from "recoil";
import { QuantityItem } from "../recoilAtom/cart.ts";
import { Link } from "react-router-dom";
import { AiOutlineUser } from "react-icons/Ai";
import { useEffect, useState } from "react";
import logo from "../assets/images/logo.png";
import axios from "axios";

export default function MainNav() {
  const totalQuantityValue = useRecoilValue(QuantityItem);
  const [notificationArray, setNotificationArray] = useState<
    { id: number; message: string }[]
  >([]);

  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    const fetchNotificationCount = async () => {
      try {
        const response = await axios.get(
          "http://3.34.149.107:8082/api/seller/notifications/count",
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        setNotificationCount(response.data);
      } catch (error) {
        console.error("Error fetching notification count:", error);
      }
    };

    fetchNotificationCount();
  }, []);

  useEffect(() => {
    const fetchNotification = async () => {
      try {
        const response = await axios.get(
          "http://3.34.149.107:8082/api/seller/notifications",
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        console.log(response.data);
        setNotificationArray(response.data);
      } catch (error) {
        console.error("Error fetching notification count:", error);
      }
    };

    fetchNotification();
  }, []);

  const deleteNoti = (id: number) => {
    axios
      .delete(`http://3.34.149.107:8082/api/seller/notifications/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then(() => {
        setNotificationArray((prevArray) =>
          prevArray.filter((item) => item.id !== id)
        );
        setNotificationCount((prevCount) => prevCount - 1);
      })
      .catch((error) => {
        console.error("Error deleting notification:", error);
      });
  };

  return (
    <div className="w-full">
      <div className="navbar bg-base-100 border-b">
        <div className="navbar-start">
          <Link to="/">
            <div className="btn btn-ghost normal-case text-xl flex items-center justify-center">
              <img src={logo} alt="" className="w-[96px] sm:w-[130px]" />
            </div>
          </Link>
        </div>
        <div className="navbar-end">
          <div className="dropdown">
            <Link to="/cart">
              <label tabIndex={0} className="btn btn-ghost btn-circle">
                <div className="indicator text-current">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span className="badge badge-sm indicator-item">
                    {totalQuantityValue}
                  </span>
                </div>
              </label>
            </Link>
          </div>
          <button className="btn btn-ghost btn-circle focus:outline-none cursor-pointer">
            <div className="dropdown dropdown-end">
              <label tabIndex={0}>
                <div className="indicator cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                  <span className="badge badge-xs badge-primary indicator-item">
                    {notificationCount}
                  </span>
                </div>
              </label>
              {notificationArray.length > 0 && (
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-[99999] p-2 shadow bg-base-100 rounded-box hover:z-[99999] focus:z-[99999]"
                >
                  {[...notificationArray].reverse().map((item) => (
                    <li
                      key={item.id}
                      className="group flex items-center justify-between flex-row active:text-white"
                      onClick={() => deleteNoti(item.id)}
                    >
                      <a className="grow">
                        {item.message}
                        <span className="text-indigo-300 group-active:text-white">
                          X
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </button>
          <Link
            to="/profile"
            className="w-12 h-12 flex items-center justify-center rounded-[50%] hover:bg-zinc-300 transition-colors"
          >
            <AiOutlineUser size="20" />
          </Link>
        </div>
      </div>
    </div>
  );
}

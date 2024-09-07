import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaUserCircle } from 'react-icons/fa'; 
import { IoLogOut } from 'react-icons/io5';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../../components/header/Header"
import { UserContext } from '../../contexts/UserContext'; // Ensure this import is correct

const ExplorePage = () => {
  const { user, setUser } = useContext(UserContext); // Correctly destructure the context value
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
        const fetchUserInfo = async () => {
            try {
                const response = await axios.get('https://server-t4sa.onrender.com/api/userInfo', {
                    withCredentials: true,
                });

                if (response.data.success) {
                    setUser(response.data.data);
                    navigate('/'); // Redirect to home if user info is fetched
                }
            } catch (error) {
                setUser(null); // Clear user if fetch fails
            }
        };

        fetchUserInfo();
    }
}, [user, setUser, navigate]);


  const handleLogout = async () => {
    try {
        const response = await axios.post('https://server-t4sa.onrender.com/api/logout', {}, {
            withCredentials: true,
        });
        if (response.data.success) {
            toast.success("Logged out successfully!", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
            });
            setUser(null); // Clear user state
            navigate('/explore/login'); // Redirect to login page
        }
    } catch (error) {
        toast.error('Error logging out!', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }
};

  if (!user) {
    return (
        <li className="menuItem"
          onClick={() => navigate('/explore/login')}
          // style={{ cursor: 'pointer', padding: '10px' }}
        >
          Log In
        </li>
    );
  }

  return (
    <>
    <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
          />
    <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px' }}>
      <div style={{ position: 'relative', cursor: 'pointer', display: "flex",
        flexDirection: "row", justifyContent: "center", alignItems: "center", gap: "10px" }}>
        {user.imageUrl ? (
          <img
            src={user.imageUrl}
            alt={user.userName}
            style={{ width: '40px', height: '40px', borderRadius: '50%' }}
          />
        ) : (
          <FaUserCircle size={40} />
        )}
        <div className='useremail' style={{
          color: "white"
        }}><strong>{user.email}</strong></div>
        <li className="menuItem" style={{
          color : "white"
        }} onClick={handleLogout}><IoLogOut /></li>
      </div>
    </div>
    </>
  );
};

export default ExplorePage;

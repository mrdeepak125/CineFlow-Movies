import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaUserCircle } from 'react-icons/fa'; 
import { IoLogOut } from 'react-icons/io5';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./loading.css";

const ExplorePage = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [avatar, setAvatar] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchUserData = useCallback(async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setLoading(false);
            setUsername('');
            setAvatar('');
            return;
        }

        setLoading(true);
        try {
            const response = await axios.get('https://cineflow-server-lada.onrender.com/api/user', {
                headers: { Authorization: `Bearer ${token}` }
            });

            setUsername(response.data.username);
            setAvatar(response.data.avatar);
        } catch (err) {
            console.error('Error fetching user data:', err);
            toast.error('Failed to load user data. Please try again.');
            localStorage.removeItem('token');
            setUsername('');
            setAvatar('');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchUserData();
    }, [fetchUserData]);

    useEffect(() => {
        const handleStorageChange = (e) => {
            if (e.key === 'token') {
                fetchUserData();
            }
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [fetchUserData]);

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.post('https://cineflow-server-lada.onrender.com/api/logout', {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            localStorage.removeItem('token');
            setUsername('');
            setAvatar('');
            toast.success('Logged out successfully');
            navigate('/explore/login');
        } catch (error) {
            console.error('Logout error:', error);
            toast.error('Failed to logout. Please try again.');
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loader"></span>
            </div>
        );
    }

    if (!username) {
        return (
            <>
                <li className="menuItem" onClick={() => navigate('/explore/login')}>
                    Log In
                </li>
                <ToastContainer position="top-center" autoClose={5000} />
            </>
        );
    }

    return (
        <>
            <div  className='login' >
                <div style={{ position: 'relative', cursor: 'pointer', display: "flex",
                    flexDirection: "row", justifyContent: "center", alignItems: "center", gap: "10px" }}>
                    {avatar ? (
                        <img
                            src={avatar}
                            alt={username}
                            style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                        />
                    ) : (
                        <FaUserCircle color='white' size={30} />
                    )}
                    <div className='useremail' style={{
                        color: "white",
                        overflow: "hidden",
                        maxWidth: "200px",
                        textOverflow: "ellipsis",
                    }}><strong>{username}</strong></div>
                    <li className="logout" style={{
                        color : "white"
                    }} onClick={handleLogout}><IoLogOut /></li>
                </div>
            </div>
            <ToastContainer position="top-center" autoClose={5000} />
        </>
    );
};

export default ExplorePage;
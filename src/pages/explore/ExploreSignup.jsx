import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

export default function ExploreSignup({ setUser }) {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      userName,
      email,
      password,
    };

    try {
      const response = await axios.post("https://server-t4sa.onrender.com/api/signup", 
        { userName, email, password },
        { withCredentials: true }
      );
      if (response.data.success) {
      toast.success("SignUp successful!", {
        position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
      });
      setTimeout(() => {
        setUser(response.data.data);
        navigate('/explore/login');
      }, 500);
    } else {
      toast.info(response.data.message || "Signup failed!", {
        position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
      });
    }
  } catch (error) { 
    toast.error(error.response?.data?.message || "Network error: Please check your connection and try again.", {
      position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
    });
  } finally {
    setLoading(false);
  }
};

  return (
    <>
      <div
        className="showcase-card rounded"
        style={{
          boxSizing: "border-box",
          minHeight: "100vh",
          padding: "0.5rem",
          backgroundColor: "rgb(4, 21, 45)",
          backgroundImage:
            "radial-gradient(at 47% 33%, rgb(23, 61, 120) 0px, transparent 59%), radial-gradient(at 82% 65%, rgb(17, 25, 39) 0px, transparent 55%)",
          borderRadius: "4px",
        }}
      >
        <div
          className="card p-lg-3"
          style={{
            boxSizing: "border-box",
            overflowWrap: "break-word",
            display: "flex",
            flexDirection: "column",
            minWidth: "0px",
            position: "relative",
            border: "1px solid rgba(255, 255, 255, 0.125)",
            color: "rgb(255, 255, 255)",
            background: "rgba(17, 25, 40, 0.75)",
            borderRadius: "12px",
            backdropFilter: "blur(16px) saturate(180%)",
            backgroundClip: "initial",
            backgroundColor: "rgba(17, 25, 40, 0.75)",
            padding: "1rem",
            top: "100px",
          }}
        >
          <div
            className="card-header bg-transparent border-0 pb-0 mb-3"
            style={{
              boxSizing: "border-box",
              padding: "1.25rem 1.5rem",
              borderRadius: "3px 3px 0px 0px",
              background: "transparent",
              borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
              border: "0px",
              borderWidth: "0px",
              marginBottom: "1rem",
              paddingBottom: "0px",
              backgroundColor: "transparent",
            }}
          >
            <h2
              className="h4"
              style={{
                boxSizing: "border-box",
                lineHeight: 1.3,
                marginBottom: "0.5rem",
                marginTop: "0px",
                fontSize: "1.5rem",
                fontFamily: "Inter, sans-serif",
                fontWeight: 500,
                color: "rgb(255, 255, 255)",
              }}
            >
              Sign up to our platform Cine-Flow
            </h2>
            <span
              className="text-muted"
              style={{ boxSizing: "border-box", color: "rgb(156, 163, 175)" }}
            >
              Signup here using your username and password
            </span>
          </div>
          <div
            className="card-body"
            style={{
              boxSizing: "border-box",
              flex: "1 1 auto",
              padding: "1.25rem 1.5rem",
            }}
          >
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
            <form action="" style={{ boxSizing: "border-box" }}>
              <div
                className="mb-4"
                style={{ boxSizing: "border-box", marginBottom: "1.5rem" }}
              >
                <label
                  className="mb-2"
                  htmlFor="UsernameInputCard1"
                  style={{
                    boxSizing: "border-box",
                    display: "inline-block",
                    marginBottom: "0.5rem",
                  }}
                >
                  Your Username
                </label>
                <div
                  className="input-group"
                  style={{
                    boxSizing: "border-box",
                    alignItems: "stretch",
                    display: "flex",
                    flexWrap: "wrap",
                    position: "relative",
                    width: "100%",
                  }}
                >
                  <span
                    id="basic-addon1"
                    className="input-group-text"
                    style={{
                      boxSizing: "border-box",
                      borderRadius: "4px",
                      padding: "0.5rem 1rem",
                      whiteSpace: "nowrap",
                      alignItems: "center",
                      display: "flex",
                      fontSize: "1rem",
                      fontWeight: 400,
                      lineHeight: 1.5,
                      textAlign: "center",
                      border: "1px solid rgb(75, 86, 99)",
                      backgroundColor: "rgb(31, 42, 55)",
                      color: "rgb(255, 255, 255)",
                      borderBottomRightRadius: "0px",
                      borderTopRightRadius: "0px",
                    }}
                  >
                    <svg
                      className="bi bi-person"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{
                        boxSizing: "border-box",
                        verticalAlign: "middle",
                        height: "1rem",
                      }}
                    >
                      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                    </svg>
                  </span>
                  <input
                    id="UsernameInputCard1"
                    className="form-control"
                    type="text"
                    required
                    placeholder="@User name"
                    value={userName} onChange={(e) => setUserName(e.target.value)}
                    style={{
                      boxSizing: "border-box",
                      margin: "0px",
                      fontFamily: "inherit",
                      borderRadius: "4px",
                      padding: "0.5rem 1rem",
                      appearance: "none",
                      backgroundClip: "padding-box",
                      display: "block",
                      fontSize: "1rem",
                      fontWeight: 400,
                      lineHeight: 1.5,
                      flex: "1 1 auto",
                      minWidth: "0px",
                      position: "relative",
                      width: "1%",
                      border: "1px solid rgb(75, 86, 99)",
                      backgroundColor: "rgb(31, 42, 55)",
                      color: "rgb(255, 255, 255)",
                      borderBottomLeftRadius: "0px",
                      borderTopLeftRadius: "0px",
                      marginLeft: "-1px",
                    }}
                  />
                </div>
              </div>
              <div
                className="mb-4"
                style={{ boxSizing: "border-box", marginBottom: "1.5rem" }}
              >
                <label
                  className="mb-2"
                  htmlFor="exampleInputEmailCard1"
                  style={{
                    boxSizing: "border-box",
                    display: "inline-block",
                    marginBottom: "0.5rem",
                  }}
                >
                  Your Email
                </label>
                <div
                  className="input-group"
                  style={{
                    boxSizing: "border-box",
                    alignItems: "stretch",
                    display: "flex",
                    flexWrap: "wrap",
                    position: "relative",
                    width: "100%",
                  }}
                >
                  <span
                    id="basic-addon2"
                    className="input-group-text"
                    style={{
                      boxSizing: "border-box",
                      borderRadius: "4px",
                      padding: "0.5rem 1rem",
                      whiteSpace: "nowrap",
                      alignItems: "center",
                      display: "flex",
                      fontSize: "1rem",
                      fontWeight: 400,
                      lineHeight: 1.5,
                      textAlign: "center",
                      border: "1px solid rgb(75, 86, 99)",
                      backgroundColor: "rgb(31, 42, 55)",
                      color: "rgb(255, 255, 255)",
                      borderBottomRightRadius: "0px",
                      borderTopRightRadius: "0px",
                    }}
                  >
                    <svg
                      className="bi bi-envelope"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{
                        boxSizing: "border-box",
                        verticalAlign: "middle",
                        height: "1rem",
                      }}
                    >
                      <path d="M10 11L4 6h12l-6 5zm7-7H3c-.56 0-1 .44-1 1v8c0 .56.44 1 1 1h14c.56 0 1-.44 1-1V5c0-.56-.44-1-1-1z" />
                    </svg>
                  </span>
                  <input
                    id="exampleInputEmailCard1"
                    className="form-control"
                    type="email"
                    required
                    placeholder="Email Address"
                    value={email} onChange={(e) => setEmail(e.target.value)} 
                    style={{
                      boxSizing: "border-box",
                      margin: "0px",
                      fontFamily: "inherit",
                      borderRadius: "4px",
                      padding: "0.5rem 1rem",
                      appearance: "none",
                      backgroundClip: "padding-box",
                      display: "block",
                      fontSize: "1rem",
                      fontWeight: 400,
                      lineHeight: 1.5,
                      flex: "1 1 auto",
                      minWidth: "0px",
                      position: "relative",
                      width: "1%",
                      border: "1px solid rgb(75, 86, 99)",
                      backgroundColor: "rgb(31, 42, 55)",
                      color: "rgb(255, 255, 255)",
                      borderBottomLeftRadius: "0px",
                      borderTopLeftRadius: "0px",
                      marginLeft: "-1px",
                    }}
                  />
                </div>
              </div>
              <div
                className="mb-4"
                style={{ boxSizing: "border-box", marginBottom: "1.5rem" }}
              >
                <label
                  className="mb-2"
                  htmlFor="exampleInputPasswordCard1"
                  style={{
                    boxSizing: "border-box",
                    display: "inline-block",
                    marginBottom: "0.5rem",
                  }}
                >
                  Your Password
                </label>
                <div
                  className="input-group"
                  style={{
                    boxSizing: "border-box",
                    alignItems: "stretch",
                    display: "flex",
                    flexWrap: "wrap",
                    position: "relative",
                    width: "100%",
                  }}
                >
                  <span
                    id="basic-addon3"
                    className="input-group-text"
                    style={{
                      boxSizing: "border-box",
                      borderRadius: "4px",
                      padding: "0.5rem 1rem",
                      whiteSpace: "nowrap",
                      alignItems: "center",
                      display: "flex",
                      fontSize: "1rem",
                      fontWeight: 400,
                      lineHeight: 1.5,
                      textAlign: "center",
                      border: "1px solid rgb(75, 86, 99)",
                      backgroundColor: "rgb(31, 42, 55)",
                      color: "rgb(255, 255, 255)",
                      borderBottomRightRadius: "0px",
                      borderTopRightRadius: "0px",
                    }}
                  >
                    <svg
                      className="bi bi-lock"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{
                        boxSizing: "border-box",
                        verticalAlign: "middle",
                        height: "1rem",
                      }}
                    >
                      <path d="M13.2 8H6.8A.8.8 0 0 0 6 8.8v5.4c0 .44.36.8.8.8h6.4a.8.8 0 0 0 .8-.8V8.8a.8.8 0 0 0-.8-.8zm-.7-1v-.5a2.5 2.5 0 0 0-5 0V7h5z" />
                    </svg>
                  </span>
                  <input
                    id="exampleInputPasswordCard1"
                    className="form-control"
                    type="password"
                    required
                    placeholder="Password"
                    value={password} onChange={(e) => setPassword(e.target.value)} 
                    style={{
                      boxSizing: "border-box",
                      margin: "0px",
                      fontFamily: "inherit",
                      borderRadius: "4px",
                      padding: "0.5rem 1rem",
                      appearance: "none",
                      backgroundClip: "padding-box",
                      display: "block",
                      fontSize: "1rem",
                      fontWeight: 400,
                      lineHeight: 1.5,
                      flex: "1 1 auto",
                      minWidth: "0px",
                      position: "relative",
                      width: "1%",
                      border: "1px solid rgb(75, 86, 99)",
                      backgroundColor: "rgb(31, 42, 55)",
                      color: "rgb(255, 255, 255)",
                      borderBottomLeftRadius: "0px",
                      borderTopLeftRadius: "0px",
                      marginLeft: "-1px",
                    }}
                  />
                </div>
              </div>
              <div
                className="mb-4"
                style={{ boxSizing: "border-box", marginBottom: "1.5rem" }}
              >
                <button
                  type="submit"
                  onClick={handleOnSubmit}
                  className="btn btn-primary w-100 py-2"
                  style={{
                    boxSizing: "border-box",
                    color: "rgb(255, 255, 255)",
                    backgroundColor: "rgb(0, 95, 204)",
                    borderColor: "rgb(0, 95, 204)",
                    padding: "0.5rem 1rem",
                    fontSize: "1.25rem",
                    fontWeight: 400,
                    lineHeight: 1.5,
                    textAlign: "center",
                    borderRadius: "0.3rem",
                    width: "100%",
                    display: "inline-block",
                  }}
                >
                  {loading ? "Loading..." : "Sign Up"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

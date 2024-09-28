import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { token } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }
    setIsLoading(true);
    try {
      await axios.post("https://cineflow-server-lada.onrender.com/api/reset-password", {
        token,
        password,
      });
      toast.success("Password reset successfully");
      navigate("/explore/login");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setIsLoading(false);
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
              Reset Password
            </h2>
            <span
              className="text-muted"
              style={{ boxSizing: "border-box", color: "rgb(156, 163, 175)" }}
            ></span>
          </div>
          <div
            className="card-body"
            style={{
              boxSizing: "border-box",
              flex: "1 1 auto",
              padding: "1.25rem 1.5rem",
            }}
          >
            <form onSubmit={handleSubmit} style={{ boxSizing: "border-box" }}>
              <div
                className="mb-4"
                style={{ boxSizing: "border-box", marginBottom: "1.5rem" }}
              >
                <label
                  className="mb-2"
                  htmlFor="password"
                  style={{
                    boxSizing: "border-box",
                    display: "inline-block",
                    marginBottom: "0.5rem",
                  }}
                >
                  New Password
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
                      xmlns="http://www.w3.org/2000/svg"
                      class="bi bi-person-fill-lock"
                      fill="white"
                      viewBox="0 0 16 16"
                      style={{
                        boxSizing: "border-box",
                        verticalAlign: "middle",
                        height: "1rem",
                      }}
                    >
                      <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-9 8c0 1 1 1 1 1h5v-1a2 2 0 0 1 .01-.2 4.49 4.49 0 0 1 1.534-3.693Q8.844 9.002 8 9c-5 0-6 3-6 4m7 0a1 1 0 0 1 1-1v-1a2 2 0 1 1 4 0v1a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1zm3-3a1 1 0 0 0-1 1v1h2v-1a1 1 0 0 0-1-1" />
                    </svg>
                  </span>
                  <input
                    className="form-control"
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Enter New Password"
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
                  htmlFor="confirmPassword"
                  style={{
                    boxSizing: "border-box",
                    display: "inline-block",
                    marginBottom: "0.5rem",
                  }}
                >
                  Confirm New Password
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
                      xmlns="http://www.w3.org/2000/svg"
                      class="bi bi-person-fill-lock"
                      fill="white"
                      viewBox="0 0 16 16"
                      style={{
                        boxSizing: "border-box",
                        verticalAlign: "middle",
                        height: "1rem",
                      }}
                    >
                      <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-9 8c0 1 1 1 1 1h5v-1a2 2 0 0 1 .01-.2 4.49 4.49 0 0 1 1.534-3.693Q8.844 9.002 8 9c-5 0-6 3-6 4m7 0a1 1 0 0 1 1-1v-1a2 2 0 1 1 4 0v1a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1zm3-3a1 1 0 0 0-1 1v1h2v-1a1 1 0 0 0-1-1" />
                    </svg>
                  </span>
                  <input
                    className="form-control"
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    placeholder="Confirm New Password"
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
                className="d-grid"
                style={{ boxSizing: "border-box", display: "grid" }}
              >
                <button
                  // onClick={handleLogin}
                  type="submit"
                  className="btn btn-primary"
                  disabled={isLoading}
                  style={{
                    boxSizing: "border-box",
                    margin: "0px",
                    fontFamily: "inherit",
                    textTransform: "none",
                    appearance: "button",
                    border: "1px solid transparent",
                    borderRadius: "4px",
                    padding: "0.5rem 1rem",
                    display: "inline-block",
                    fontSize: "1rem",
                    fontWeight: 500,
                    lineHeight: "1.5rem",
                    textAlign: "center",
                    userSelect: "none",
                    verticalAlign: "middle",
                    borderColor: "rgb(46, 164, 79)",
                    backgroundColor: "rgb(46, 164, 79)",
                    backgroundImage:
                      "linear-gradient(180deg,hsla(0,0%,100%,.15),hsla(0,0%,100%,0))",
                    boxShadow: "rgba(18, 21, 26, 0.075) 0px 1px 1px",
                    color: "rgb(255, 255, 255)",
                    cursor: "pointer",
                  }}
                >
                  {isLoading ? "Resetting..." : "Reset Password"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <style
        dangerouslySetInnerHTML={{
          __html: `
html {
  box-sizing: border-box;
  scroll-behavior: smooth;
}

body {
  box-sizing: border-box;
  margin: 0px;
  text-size-adjust: 100%;
  -webkit-tap-highlight-color: rgba(18, 21, 26, 0);
  font-family: "Inter",sans-serif;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  background-color: rgb(17, 25, 39);
  color: rgb(156, 163, 175);
}
`,
        }}
      />
    </>
  );
}

import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function ExploreLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await res.json();

      if (result.success) {
        // Store the token in localStorage or a cookie if needed
        localStorage.setItem("token", result.data.token);
        // Redirect to the home page or another protected route
        window.location.href = "/";
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
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
            position: "relative",
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
              Login to our platform Cine-Flow
            </h2>
            <span
              className="text-muted"
              style={{ boxSizing: "border-box", color: "rgb(156, 163, 175)" }}
            >
              Login here using your username and password
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
            <form onSubmit={handleSubmit} style={{ boxSizing: "border-box" }}>
            {error && (
                <div
                  style={{
                    color: "red",
                    marginBottom: "1rem",
                  }}
                >
                  {error}
                </div>
              )}
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
                      className="icon icon-xs"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{
                        boxSizing: "border-box",
                        verticalAlign: "middle",
                        height: "1rem",
                      }}
                    >
                      <path
                        d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"
                        style={{ boxSizing: "border-box" }}
                      />
                      <path
                        d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"
                        style={{ boxSizing: "border-box" }}
                      />
                    </svg>
                  </span>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="example@company.com"
                    id="exampleInputEmailCard1"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                      className="icon icon-xs"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{
                        boxSizing: "border-box",
                        verticalAlign: "middle",
                        height: "1rem",
                      }}
                    >
                      <path
                        clipRule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        fillRule="evenodd"
                        style={{ boxSizing: "border-box" }}
                      />
                    </svg>
                  </span>
                  <input
                    type="password"
                    placeholder="Password"
                    id="exampleInputPasswordCard1"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
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
                className="d-block d-sm-flex justify-content-between align-items-center mb-4"
                style={{
                  boxSizing: "border-box",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "1.5rem",
                  display: "flex",
                }}
              >
                <div
                  className="form-check mb-0"
                  style={{
                    boxSizing: "border-box",
                    display: "block",
                    minHeight: "1.5rem",
                    paddingLeft: "1.625em",
                    marginBottom: "0px",
                  }}
                >
                  <input
                    id="defaultCheck5"
                    className="form-check-input"
                    type="checkbox"
                    style={{
                      boxSizing: "border-box",
                      margin: "0px",
                      fontFamily: "inherit",
                      fontSize: "inherit",
                      lineHeight: "inherit",
                      backgroundPosition: "50% center",
                      appearance: "none",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "contain",
                      height: "1.125em",
                      marginTop: "0.1875em",
                      WebkitPrintColorAdjust: "exact",
                      verticalAlign: "top",
                      width: "1.125em",
                      cssFloat: "left",
                      marginLeft: "-1.625em",
                      borderRadius: "0.25em",
                      border: "1px solid rgb(75, 86, 99)",
                      backgroundColor: "rgb(31, 42, 55)",
                      cursor: "pointer",
                    }}
                  />
                  <label
                    className="form-check-label mb-0"
                    htmlFor="defaultCheck5"
                    style={{
                      boxSizing: "border-box",
                      display: "inline-block",
                      marginBottom: "0px",
                    }}
                  >
                    Remember me
                  </label>
                </div>
                <div style={{ boxSizing: "border-box" }}>
                  <a
                    className="small text-right"
                    href="#"
                    style={{
                      boxSizing: "border-box",
                      textDecoration: "none",
                      transition: "none",
                      color: "rgb(0, 170, 255)",
                      fontWeight: 500,
                      fontSize: "0.875em",
                    }}
                  >
                    Lost password?
                  </a>
                </div>
              </div>
              <div
                className="d-grid"
                style={{ boxSizing: "border-box", display: "grid" }}
              >
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
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
                  }}
                >
                  {loading ? "Loading..." : "Sign In"}
                </button>
              </div>
            </form>
            <div
              className="d-block d-sm-flex align-items-center mt-4"
              style={{
                boxSizing: "border-box",
                alignItems: "center",
                marginTop: "1.5rem",
                display: "flex",
              }}
            >
              <span
                className="fw-normal small"
                onClick={() => navigate("/explore/signup")}
                style={{
                  boxSizing: "border-box",
                  fontSize: "0.875em",
                  fontWeight: 400,
                }}
              >
                Not registered?
                <a
                  className="fw-bold ms-2"
                  // href="/explore/signup"
                  style={{
                    boxSizing: "border-box",
                    textDecoration: "none",
                    transition: "none",
                    color: "rgb(0, 170, 255)",
                    marginLeft: "0.5rem",
                    fontWeight: 500,
                    cursor: "pointer"
                  }}
                >
                  Create account
                </a>
              </span>
            </div>
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

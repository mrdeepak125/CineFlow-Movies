import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import ContentWrapper from "../contentWrapper/ContentWrapper";

import "./style.scss";

const Footer = () => {
    const navigate = useNavigate();

    const navigationHandler = (type) => {
      if (type === "dcma") {
          navigate("/dmca");
      }
    }
  return (
    <footer className="footer">
      <ContentWrapper>
        <ul className="menuItems">
          <li className="menuItem" onClick={() => navigationHandler("dcma")}>DMCA</li>
          {/* <li className="menuItem">Privacy-Policy</li>
          <li className="menuItem">About</li>
          <li className="menuItem">Blog</li>
          <li className="menuItem">FAQ</li> */}
        </ul>
        <div className="infoText">
          cineflow does not host any files on it’s servers. All files or
          contents hosted on third party websites. cineflow does not accept
          responsibility for contents hosted on third party websites. cineflow
          just index those links which are already available in internet
        </div>
        <div className="socialIcons">
          <span className="icon">
            <FaFacebookF />
          </span>
          <span className="icon">
            <FaInstagram />
          </span>
          <span className="icon">
            <FaTwitter />
          </span>
          <span className="icon">
            <FaLinkedin />
          </span>
        </div>
      </ContentWrapper>
    </footer>
  );
};

export default Footer;

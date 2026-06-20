import { FaSpinner } from "react-icons/fa";
import "./FullPageLoader.scss";

const FullPageLoader = ({ text = "Loading..." }) => {
  return (
    <div className="loader-overlay">
      <div className="loader-box">
        <FaSpinner className="spinner" />
        <p className="loader-text">{text}</p>
      </div>
    </div>
  );
};

export default FullPageLoader;
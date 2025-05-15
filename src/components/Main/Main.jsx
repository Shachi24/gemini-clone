import React, { useContext, useEffect, useState, useRef } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/context";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const Main = () => {
  const {
    onSent,
    recentprompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
    activeSection,
    setActiveSection,
    prevPrompts,
  } = useContext(Context);
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current.click(); // open file dialog
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file)); // preview URL
      // You can also upload or process the file here
    }
  };

  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  const handleMicClick = () => {
    SpeechRecognition.startListening({ continuous: true });
  };

  useEffect(() => {
    if (listening) {
      setInput(transcript);
    }
  }, [transcript]);
  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="" />
      </div>
      <div className="main-container">
        {activeSection === "help" ? (
          <div className="section">
            <h2>Help</h2>
            <p>
              This is the help section. You can add FAQs or instructions here.
            </p>
          </div>
        ) : activeSection === "activity" ? (
          <div className="section">
            <h2>Activity</h2>
            <ul>
              {prevPrompts.map((prompt, i) => (
                <li key={i}>{prompt}</li>
              ))}
            </ul>
          </div>
        ) : activeSection === "settings" ? (
          <div className="section">
            <h2>Settings</h2>
            <p>
              Settings section goes here. You can add toggles, preferences, etc.
            </p>
          </div>
        ) : !showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello, Dev.</span>
              </p>
              <p>How can I help you today?</p>
            </div>
            <div className="cards">
              <div className="card">
                <p>Suggest beautiful places to see on an upcoming road trip</p>
                <img src={assets.compass_icon} alt="" />
              </div>
              <div className="card">
                <p>Briefly summarize this concept: urban planning</p>
                <img src={assets.bulb_icon} alt="" />
              </div>
              <div className="card">
                <p>Brainstorm team bonding activities for our work treat</p>
                <img src={assets.message_icon} alt="" />
              </div>
              <div className="card">
                <p>Improve the readability of the following code</p>
                <img src={assets.code_icon} alt="" />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="" />
              <p>{recentprompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              type="text"
              placeholder="Enter a prompt here"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <div>
              <img
                src={assets.gallery_icon}
                alt="Upload"
                onClick={handleImageClick}
                style={{ cursor: "pointer" }}
              />
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                ref={fileInputRef}
                onChange={handleImageChange}
              />
              <img src={assets.mic_icon} alt="" onClick={handleMicClick} />
              {input ? (
                <img onClick={() => onSent()} src={assets.send_icon} alt="" />
              ) : null}
              {selectedImage && (
                <div>
                  <p>Preview:</p>
                  <img
                    src={selectedImage}
                    alt="Preview"
                    style={{ maxWidth: "200px", marginTop: "10px" }}
                  />
                </div>
              )}
            </div>
          </div>
          <p className="bottom-info">
            Gemini may produce inaccurate info, including about people, so
            double check its responses. Your privacy and Gemini Apps.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;

import { useEffect, useRef, useState } from "react";

import "@/styles/style.css";

import LoadingSpinner from "./LoadingSpinner";

const Modal = ({
  isVisible,
  setIsVisible,
  column,
  twitterUsers,
  reqStatus,
  isLoading
}) => {
  const [isClosing, setIsClosing] = useState(false);
  const modalRef = useRef(null);

  // Hook to hide the modal when the user presses the "Escape" key & modal is actually visible
  useEffect(() => {
    const handleHideModal = (e) => {
      if (e.key === "Escape" && isVisible) {
        setIsClosing(true);
      }
    };
    window.addEventListener("keyup", handleHideModal);

    return () => {
      window.removeEventListener("keyup", handleHideModal);
    };
  }, [isVisible]);

  // This allows you to scroll down on the modal rather than just scrolling the twitter page (DOM events propogate up or smth)
  useEffect(() => {
    const handleScroll = (e) => {
      e.stopPropagation();
    };

    if (modalRef.current) {
      modalRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (modalRef.current) {
        modalRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [isVisible, isClosing]);

  // Creates the closing animation for the modal
  useEffect(() => {
    if (isClosing) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setIsClosing(false);
        if (column) column.style.display = "";
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isClosing, setIsVisible, column]);

  return isVisible ? (
    <div
      ref={modalRef}
      className={`fixed top-0 right-0 w-1/4 h-full pt-8 shadow-2xl bg-slate-900 ${
        isClosing ? "transition-slide-out" : "transition-slide-in"
      }`}>
      {isLoading ? (
        // Loading Spinner
        <div className="flex justify-center items-center mt-32">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="flex flex-col h-full">
          {/* Header Container (title & close button) */}
          <div className="flex justify-between items-center px-8">
            <h1 className="text-xl font-bold text-center flex-1 text-slate-300">
              Twitter Intro
            </h1>
            <button
              className="px-4 py-2 bg-slate-600 text-white rounded hover:bg-slate-500 transition-all cursor-pointer"
              onClick={() => setIsClosing(true)}>
              X
            </button>
          </div>

          {reqStatus === "success" ? (
            <div className="flex-1 overflow-auto mt-4 mb-24">
              <h3 className="ml-4 text-slate-400 text-lg">
                Total: {twitterUsers.length} People
              </h3>

              {/* List of Twitter Users */}
              <ul>
                {twitterUsers.map((user) => {
                  return (
                    <li
                      key={user.id}
                      className="py-5 border-b border-b-slate-700 hover:bg-slate-800 transition-all px-4 cursor-pointer">
                      <a
                        href={`https://twitter.com/${user.username}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-4">
                        <img
                          src={user.profile_image_url}
                          alt={user.name}
                          className="w-12 h-12 rounded-full"
                        />
                        <div className="flex flex-col justify-between">
                          <span className="font-bold text-slate-300">
                            {user.name}
                          </span>
                          <span className="text-sm text-slate-500">
                            {user.description}
                          </span>
                        </div>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : (
            // Error Message
            <div className="mt-8 text-center mx-4 text-slate-400 text-lg">
              Error Occurred. You prob got rate limited <br />
              Wait up to 15 min to try again
            </div>
          )}
        </div>
      )}
    </div>
  ) : null;
};

export default Modal;

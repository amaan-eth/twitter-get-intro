import Modal from "@/components/Modal";
import cssText from "data-text:@/styles/style.css";
import type { PlasmoCSConfig, PlasmoGetInlineAnchor } from "plasmo";
import { useState } from "react";

import { sendToBackground } from "@plasmohq/messaging";

// Allows your browser to only run on twitter pages
export const config: PlasmoCSConfig = {
  matches: ["https://twitter.com/*"]
};

// Need this to render your styles normally
export const getStyle = () => {
  const style = document.createElement("style");
  style.textContent = cssText;
  return style;
};

// This is an anchor element you use to attach your component to. For twitter, i'm using the follower/following row as my anchor
export const getInlineAnchor: PlasmoGetInlineAnchor = async () =>
  document.querySelector(
    "div.css-1dbjc4n.r-13awgt0.r-18u37iz.r-1w6e6rj > div.css-1dbjc4n:nth-of-type(2)"
  );

/* ======================================
              Main Component
======================================= */
const GetIntroButton = () => {
  // Modal state vars you pass as props
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalLoading, setIsModalLoading] = useState(false);
  const [column, setColumn] = useState(null);
  const [twitterUsers, setTwitterUsers] = useState([]);
  const [reqStatus, setReqStatus] = useState(null);

  /* 
  Handles the "get intro" button click
  - You first grab the right twitter column & hide it
  - Then you show the modal & set the loading state
  - Then you send a message to the background script which executes the twitter logic to grab followers/following
  - Then you return it & set the modal state
  */
  const handleClick = async () => {
    const columnElement = document.querySelector(
      "div.css-1dbjc4n.r-aqfbo4.r-zso239.r-1hycxz"
    );
    if (columnElement instanceof HTMLElement) {
      columnElement.style.display = "none";
      setColumn(columnElement); // Add this line
    }
    setIsModalVisible(true);
    setIsModalLoading(true);
    const res = await sendToBackground({
      name: "grabUsers",
      body: { currentPageUrl: window.location.href }
    });
    setReqStatus(res.status);
    setTwitterUsers(res.commonTwitterUsers);
    setIsModalLoading(false);
  };

  return (
    <>
      {/* Get Intro Button */}
      <button
        className="px-3 py-1 ml-3 rounded-sm bg-slate-600 text-slate-300 font-sans text-sm hover:bg-slate-500 transition-all focus:outline-none"
        onClick={handleClick}>
        Get Intro
      </button>

      {/* Followers Modal */}
      <Modal
        isVisible={isModalVisible}
        isLoading={isModalLoading}
        setIsVisible={setIsModalVisible}
        column={column}
        twitterUsers={twitterUsers}
        reqStatus={reqStatus}
      />
    </>
  );
};

export default GetIntroButton;

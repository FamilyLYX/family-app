import React, { useEffect, useState } from "react";
import Avatar from "./Avatar";
import Messages from "./Messages";

export default function Chat() {
  const [name, setName] = useState("Ninja and James");
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      message:
        "Hi, would it be possible to wait for the transfer to be completed?",
      sender: "user",
      timestamp: new Date(),
    },
    {
      id: 2,
      message:
        "hi, just sent, it will take from 1 to 3 business days to arrive",
      sender: "receiver",
      timestamp: new Date(),
    },

    {
      id: 4,
      message: "probably tomorrow",
      sender: "user",
      timestamp: new Date(),
    },
    {
      id: 2,
      message: "Ok",
      sender: "user",
      timestamp: new Date(),
    },
  ]);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1023);
  const [imageWidth, setImageWidth] = useState(calculateImageWidth());

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1023);
      setImageWidth(calculateImageWidth());
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function calculateImageWidth() {
    const screenWidth = window.innerWidth;

    if (screenWidth >= 320 && screenWidth < 400) {
      return 320;
    } else {
      return 400;
    }
  }

  const handleSendMessage = () => {
    if (inputMessage.trim() !== "") {
      const newMessage = {
        id: messages.length + 1,
        message: inputMessage,
        sender: "user",
        timestamp: new Date(),
      };

      setMessages([...messages, newMessage]);
      setInputMessage("");
    }
  };

  return (
    <div
      style={{ background: "rgba(0, 0, 0, 0.04)", position: "relative" }}
      className="flex flex-col h-[690px] px-5 overflow-scroll w-[390px] rounded-[28px]"
    >
      <div className="flex flex-col gap-4">
        <div className="flex mt-10 flex-row gap-2">
          <Avatar imageUrl="src/assets/escrow/user.svg" initials={name} />
          <div className="flex flex-col gap-1">
            <span className="text-black/30 text-[13px] font-medium">
              Chat with:
            </span>
            <p className="text-[14px] leading-[13.5px] font-bold">{name}</p>
          </div>
        </div>

        <div
          style={{
            borderTop: "1px solid rgba(0, 0, 0, 0.25)",
            justifyContent: "center",
            alignItems: "center",
          }}
        ></div>
      </div>
      <br />
      <div className="gap-4">
        <Messages messages={messages} />
      </div>

      <div
        style={{
          borderRadius: "100px",
          background: "rgba(0, 0, 0, 0.05)",
          display: "flex",
          height: "40px",
          padding: "12px 16px",
          justifyContent: "space-between",
          alignItems: "center",
          alignSelf: "stretch",
          maxWidth: "380px",
          position: "sticky",

          top: messages.length > 0 ? "90%" : "0",
          bottom: messages.length > 0 ? "0" : "80%",
        }}
        className="p-4"
      >
        <input
          type="text"
          style={{
            borderRadius: "100px",
            width: "100%",
            height: "30px",
            outline: "none",
          }}
          placeholder="Write your message"
          className="flex-1 p-2 border-none bg-transparent rounded-l"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <button
          onClick={handleSendMessage}
          style={{ height: "100%", borderRadius: "100px", marginLeft: "-1px" }}
          className="text-white px-4 rounded-r w-16"
        >
          <img src="src/assets/escrow/send.svg" alt="send" />
        </button>
      </div>
    </div>
  );
}

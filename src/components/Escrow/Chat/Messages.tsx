import { Avatar } from "@mui/material";
import React from "react";
import { hooks } from "../../../connectors/default";

interface Message {
  id: number;
  message: string;
  sender: string;
  timestamp: Date;
}

interface MessagesProps {
  messages: Message[];
}

const Messages: React.FC<MessagesProps> = ({ messages }) => {
  const account = hooks.useAccount();
  return (
    <div className="flex flex-col gap-4">
      {messages?.map((message, index) => (
        <div
          key={message?.id}
          className={`${
            message?.sender === account ? "self-end" : "self-start"
          } max-w-[70%]`}
        >
          <div className="flex items-center justify-center">
            <span className="text-xs font-bold text-gray-500">
              {new Date(message?.timestamp?.seconds * 1000).toUTCString()}
            </span>
          </div>

          <div className="flex flex-col gap-2">
            {/* {message.sender === "receiver" && (
              <Avatar
                src="./src/assets/escrow/avatarimg.svg"
                style={{ borderRadius: "100%" }}
              />
            )} */}

            <div
              className="p-3"
              style={{
                background:
                  message?.sender === account ? "black" : "rgba(0, 0, 0, 0.07)",
                borderRadius:
                  message?.sender === account
                    ? "12px 0px 12px 12px"
                    : "12px 12px 12px 0",

                color: message?.sender === account ? "black" : "white",
              }}
            >
              <div className="flex flex-row gap-2">
                <p
                  style={{
                    color: message?.sender === account ? "white" : "black",
                    whiteSpace: "pre-wrap", // Allow text to wrap
                    overflowX: "auto", // Enable horizontal scrollbar if needed
                    maxHeight: "100%", // Set a maximum height if needed
                  }}
                >
                  {message?.message}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Messages;

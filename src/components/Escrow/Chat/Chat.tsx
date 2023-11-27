import React, { useEffect, useState } from "react";
import Avatar from "./Avatar";
import Messages from "./Messages";
import sendImg from "../../../assets/escrow/send.svg";
import {
  DocumentData,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { useQuery } from "@tanstack/react-query";
import { hooks } from "../../../connectors/default";
// import { orderBy } from "lodash";

export default function Chat({ data }: { data: any }) {
  const account = hooks.useAccount();
  const [name, setName] = useState("Ninja and James");
  const [messages, setMessages] = useState<DocumentData[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const docRef = doc(getFirestore(), `chat`, data?.id ?? "id");
  const collectionRef = collection(getFirestore(), `chat`);
  const chatRef = doc(collectionRef, data?.id ?? "id");
  const chatCollection = collection(chatRef, "messages");
  const sortedQuery = query(chatCollection, orderBy("timestamp", "asc"));
  const fetchDocument = async () => {
    const docSnap = await getDoc(doc(collectionRef, data?.id));
    if ((docSnap as any).exists()) {
      console.log("Document data:", docSnap?.data?.());
    } else {
      // docSnap.data() will be undefined in this case
      setDoc(chatRef, {
        seller: data?.seller,
        buyer: data?.buyer,
        // messages: [],
      });
      setDoc(chatRef, chatCollection);
    }
    return docSnap; // or return { docSnap }; if you want to keep the full snapshot
  };
  const fetchMessages = async () => {
    const docSnap = await getDocs(sortedQuery);
    console.log(docSnap);
    if (docSnap.empty || !docSnap) {
      return [];
    } else {
      const result = docSnap.docs?.map((doc) => doc.data());
      setMessages(result);
      return result;
    }
    // then((querySnapshot) => {
    //   console.log
    //   if (querySnapshot.empty) {
    //     return [];
    //   } else {
    //     return querySnapshot.forEach((doc) => doc.data());
    //   }
    // });
    // return docSnap; // or return { docSnap }; if you want to keep the full snapshot
  };

  const { data: docSnap } = useQuery({
    queryKey: ["document", "id"],
    queryFn: fetchDocument,
  });

  const { data: messages1 } = useQuery({
    queryKey: ["messages", "id"],
    queryFn: fetchMessages,
  });

  useEffect(() => {
    onSnapshot(sortedQuery, (snap) => {
      const data: any = snap.docs?.map((doc) => doc.data());
      console.log(data);
      setMessages(data);
    });
  }, []);

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

  const handleSendMessage = async () => {
    if (inputMessage.trim() !== "") {
      // const docSnap = await getDoc(doc(collectionRef, data?.id))
      await addDoc(chatCollection, {
        message: inputMessage,
        sender: account,
        timestamp: new Date(),
      });
      const newMessage = {
        id: messages?.length + 1,
        message: inputMessage,
        sender: "user",
        timestamp: new Date(),
      };

      // setMessages([...messages, newMessage]);
      console.log("clicked");
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

          top: messages?.length > 0 ? "90%" : "0",
          bottom: messages?.length > 0 ? "0" : "80%",
        }}
        className="p-4 mt-5"
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
          <img src={sendImg} alt="send" />
        </button>
      </div>
    </div>
  );
}

import React, { useEffect, useRef, useState } from "react";
import { ICONS } from "./assets/Icons/icons";
import styled from "styled-components";
import ChatForm from "./components/ChatForm";
import ChatMsg from "./components/ChatMsg";

const apiKey = process.env.GEMINI_API_KEY;

const App = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [showchatBot, setShowchatBot] = useState(false);
  const chatBodyRef = useRef();

  const generateBotResponse = async (history) => {
    const updateHistory = (text) => {
      setChatHistory((prev) => [
        ...prev.filter((msg) => msg.text !== "Thinking..."),
        { role: "model", text: text },
      ]);
    };
    //format chat history for API request
    history = history.map(({ role, text }) => ({ role, parts: [{ text }] }));

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: history,
      }),
    };
    try {
      //make the API call to get the response
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        requestOptions
      );

      if (!response.ok) {
        const errorData = await response.text(); // Capture the raw response for debugging
        throw new Error(`API Error: ${errorData || response.status}`);
      }

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error.message || "Something went wrong !!");

      const apiResponse = data.candidates[0].content.parts[0].text
        .replace(/\*\*(.*?)\*\*/g, "$1")
        .trim();

      updateHistory(apiResponse);
    } catch (error) {
      console.error("Error generating bot response:", error);
      updateHistory("Error: Unable to process your request at this time.");
    }
  };

  useEffect(() => {
    // auto scroll whenever chat History updates
    chatBodyRef.current.scrollTo({
      top: chatBodyRef.current.scrollHeight,
      behavour: "smooth",
    });
  }, [chatHistory]);

  return (
    <>
      <Wrapper
        className={`container bg-gradient-to-r from-[#f4f0ff,#dacdff] w-full min-h-[100vh]`}
      >
        <button
          id="chat-bot-toggler"
          onClick={() => setShowchatBot((prev) => !prev)}
          className="fixed bottom-[20px] sm:bottom-[30px] right-[20px] sm:right-[35px] border-none w-14 h-14 cursor-pointer rounded-full flex items-center justify-center bg-[#6d4fc2]"
        >
          {showchatBot ? (
            <span className="absolute text-[#fff]">
              <ICONS.CLOSE size={30} />
            </span>
          ) : (
            <span className="absolute text-[#fff]">
              <ICONS.MSG size={30} />
            </span>
          )}
        </button>
        <div
          className={`chatbot-popup fixed overflow-hidden bg-[#fff] sm:w-[420px] rounded-lg shadow sm:bottom-[100px] w-full bottom-0 right-0 sm:right-[60px] h-full sm:h-auto ${
            showchatBot
              ? "opacity-100 translate-y-0 scale-[1] pointer-events-auto"
              : "opacity-0 translate-y-5 scale-[0.2] pointer-events-none transition-all origin-bottom-right"
          }`}
        >
          {/* CHAT HEADER */}
          <div className="chat-header flex bg-[#6D4FC2] items-center justify-between px-5 py-4">
            <div className="flex items-center gap-3 header-info">
              <ICONS.CHAT_BOT className="w-8 h-8 p-1 bg-white rounded-lg fill-[#6d4fc2]" />
              <h2 className="logo-text text-[#fff] text-[1.1rem]">Chatbot</h2>
            </div>
            <button
              onClick={() => setShowchatBot((prev) => !prev)}
              className="h-[40px] rounded-xl w-[40px] border-none outline-none text-[#fff] text-[1.9rem] pt-[2px] bg-none mr-[-10px] cursor-pointer flex items-center justify-center hover:bg-[#593bab] transition-all"
            >
              <ICONS.DOWN_ARROW />
            </button>
          </div>
          {/* CHAT BODY */}
          <div
            ref={chatBodyRef}
            className="chat-body p-[25px] h-[460px] overflow-y-auto flex flex-col gap-5 mb-[80px]"
          >
            <div className="flex items-start gap-3 message bot-msg">
              <span className="w-8 h-8 p-1 bg-[#6d4fc2] rounded-lg">
                <ICONS.CHAT_BOT className="fill-[#fff] w-full h-full" />
              </span>
              <p className="msg-text bg-[#f6f2ff] py-3 px-4 max-w-[75%] rounded-[13px] rounded-bl-[0px] text-wrap whitespace-pre-line text-[0.9rem]">
                Hey there <br />
                How can I help you ? Today
              </p>
            </div>
            {chatHistory.map((chat, index) => {
              return <ChatMsg key={index} chat={chat} />;
            })}
          </div>
          {/* CHAT FORM */}
          <div className="chat-footer absolute bottom-0 w-full bg-white pt-[15px] px-[22px] pb-[20px]">
            <ChatForm
              setChatHistory={setChatHistory}
              chatHistory={chatHistory}
              generateBotResponse={generateBotResponse}
            />
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default App;

const Wrapper = styled.section`
  .chat-body {
    scrollbar-width: thin;
    scrollbar-color: #fff transparent;
  }

  .chat-body .bot-msg span {
    align-self: flex-end;
  }

  .chat-body .bot-msg {
    display: flex;
    flex-direction: row;
  }

  .chat-body .bot-msg .msg-text {
    color: black;
    background-color: #f6f2ff;
    border-radius: 13px 13px 13px 3px;
  }

  .chat-form .msg-text:valid ~ button {
    display: block;
  }
`;

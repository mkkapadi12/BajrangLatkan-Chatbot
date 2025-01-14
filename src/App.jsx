import React from "react";
import { ICONS } from "./assets/Icons/icons";
import styled from "styled-components";
import ChatForm from "./components/ChatForm";

const App = () => {
  return (
    <>
      <Wrapper className="container bg-gradient-to-r from-[#f4f0ff,#dacdff] w-full min-h-[100vh] flex items-center justify-center">
        <div className="relative chatbot-popup overflow-hidden bg-[#fff] w-[420px] rounded-lg shadow">
          {/* CHAT HEADER */}
          <div className="chat-header flex bg-[#6D4FC2] items-center justify-between px-5 py-4">
            <div className="flex items-center gap-3 header-info">
              <ICONS.CHAT_BOT className="w-8 h-8 p-1 bg-white rounded-lg fill-[#6d4fc2]" />
              <h2 className="logo-text text-[#fff] text-[1.1rem]">Chatbot</h2>
            </div>
            <button className="h-[40px] rounded-xl w-[40px] border-none outline-none text-[#fff] text-[1.9rem] pt-[2px] bg-none mr-[-10px] cursor-pointer flex items-center justify-center hover:bg-[#593bab] transition-all">
              <ICONS.DOWN_ARROW />
            </button>
          </div>
          {/* CHAT BODY */}
          <div className="chat-body p-[25px] h-[460px] overflow-y-auto flex flex-col gap-5 mb-[80px]">
            <div className="flex items-end gap-3 message bot-msg">
              <ICONS.CHAT_BOT className="w-8 h-8 p-1 bg-[#6d4fc2] rounded-lg fill-[#fff]" />
              <p className="msg-text bg-[#f6f2ff] py-3 px-4 max-w-[75%] rounded-[13px] rounded-bl-[0px] text-wrap whitespace-pre-line text-[0.9rem]">
                Hey there <br />
                How can I help you ?
              </p>
            </div>
            <div className="flex flex-col items-end gap-3 message user-msg">
              <p className="msg-text py-3 px-4 max-w-[75%] bg-[#6d4fc2] text-white rounded-[13px] rounded-br-[0px] text-wrap whitespace-pre-line text-[0.9rem]">
                Lorem ipsum dolor sit amet consectetur adipisicing.
              </p>
            </div>
          </div>
          {/* CHAT FORM */}
          <div className="chat-footer absolute bottom-0 w-full bg-white pt-[15px] px-[22px] pb-[20px]">
            <ChatForm />
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default App;

const Wrapper = styled.section`
  .chat-form .msg-text:valid ~ button {
    display: block;
  }
`;

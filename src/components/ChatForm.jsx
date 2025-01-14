import React, { useRef } from "react";
import { ICONS } from "../assets/Icons/icons";

const ChatForm = ({ chatHistory, setChatHistory, generateBotResponse }) => {
  const inputRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const userMsg = inputRef.current.value.trim();
    if (!userMsg) {
      return;
    }
    inputRef.current.value = "";
    //set user side message :
    setChatHistory((history) => [
      ...history,
      {
        role: "user",
        text: userMsg,
      },
    ]);

    //set thinking... msg from bot side
    setTimeout(() => {
      setChatHistory((history) => [
        ...history,
        {
          role: "model",
          text: "Thinking...",
        },
      ]);
      //call the function to generate bot's response
      generateBotResponse([...chatHistory, { role: "user", text: userMsg }]);
    }, 600);
  };

  return (
    <form
      action="#"
      onSubmit={handleSubmit}
      className="chat-form flex items-center bg-[#fff] outline outline-1 outline-[#cccce5] rounded-[32px] focus-within:outline focus-within:outline-2 focus-within:outline-[#6d4fc2]"
    >
      <input
        type="text"
        ref={inputRef}
        className="w-full  py-0 px-4 border-none outline-none text-[0.95rem] msg-text bg-none h-[47px]"
        placeholder="Message..."
        required
      />
      <button className="send hidden h-[35px] w-[35px] outline-none border-none text-[#fff] bg-[#6d4fc2] rounded-full mr-[6px] text-[1.15rem] flex-shrink-0 hover:bg-[#593bab] transition-all">
        <ICONS.SEND size={30} />
      </button>
    </form>
  );
};

export default ChatForm;

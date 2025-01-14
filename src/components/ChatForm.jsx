import React from "react";
import { ICONS } from "../assets/Icons/icons";

const ChatForm = () => {
  return (
    <form
      action="#"
      className="chat-form flex items-center bg-[#fff] outline outline-1 outline-[#cccce5] rounded-[32px] focus-within:outline focus-within:outline-2 focus-within:outline-[#6d4fc2]"
    >
      <input
        type="text"
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

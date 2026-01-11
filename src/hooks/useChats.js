import React, { useState } from "react";

const useChats = () => {
  const [chatsMessages, setChatMessages] = useState([]);
  return {
    chatsMessages,
  };
};

export default useChats;

import React, { createContext, useState, useContext } from "react";

const TimeContext = createContext();

export const useTime = () => useContext(TimeContext);

export const TimeProvider = ({ children }) => {
  const [selectedTime, setSelectedTime] = useState(new Date());

  return (
    <TimeContext.Provider value={{ selectedTime, setSelectedTime }}>
      {children}
    </TimeContext.Provider>
  );
};

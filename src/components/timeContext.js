import React, { createContext, useState, useContext } from "react";

const TimeContext = createContext();

export const useTime = () => useContext(TimeContext);

export const TimeProvider = ({ children }) => {
  const [selectedTime, setSelectedTime] = useState(new Date());

  const setTime = (time) => {
    setSelectedTime(time);
  };

  return (
    <TimeContext.Provider value={{ selectedTime, setTime }}>
      {children}
    </TimeContext.Provider>
  );
};

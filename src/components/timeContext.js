import React, { createContext, useState, useContext } from "react";

const TimeContext = createContext();

export const useTime = () => useContext(TimeContext);

export const TimeProvider = ({ children }) => {
  const [selectedTime, setSelectedTime] = useState(new Date());

  const setTime = (newTime) => {
    if (newTime instanceof Date && !isNaN(newTime.getTime())) {
      setSelectedTime(newTime);
    } else {
      console.error("Attempted to set invalid time:", newTime);
    }
  };

  return (
    <TimeContext.Provider value={{ selectedTime, setTime }}>
      {children}
    </TimeContext.Provider>
  );
};

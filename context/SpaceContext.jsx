import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

const SpaceContext = createContext();

export const useSpace = () => useContext(SpaceContext);

export const SpaceProvider = ({ children }) => {
  const [spaces, setSpaces] = useState([]);

  useEffect(() => {
    const fetchSpaces = async () => {
      const { data, error } = await supabase.from("spaces").select();

      if (error) {
        console.error("Error fetching spaces:", error);
      } else {
        setSpaces(data);
      }
    };

    fetchSpaces();
  }, []);

  const addSpace = (space) => {
    const newSpaces = [...spaces, space];
    setSpaces(newSpaces);
  };

  const updateSpace = (spaceId, updatedSpace) => {
    const newSpaces = spaces.map((space) =>
      space.id === spaceId ? { ...space, ...updatedSpace } : space
    );
    setSpaces(newSpaces);
  };

  const removeSpace = (spaceId) => {
    const newSpaces = spaces.filter((space) => space.id !== spaceId);
    setSpaces(newSpaces);
  };

  return (
    <SpaceContext.Provider
      value={{
        spaces,
        setSpaces,
        addSpace,
        updateSpace,
        removeSpace,
      }}
    >
      {children}
    </SpaceContext.Provider>
  );
};

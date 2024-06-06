import React, { createContext, useContext, useState } from "react";

const SpaceContext = createContext();

export const useSpace = () => useContext(SpaceContext);

export const SpaceProvider = ({ children }) => {
  const [spaces, setSpaces] = useState([]);

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

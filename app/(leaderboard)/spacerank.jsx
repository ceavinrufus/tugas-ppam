import React from "react";
import { View, ScrollView } from "react-native";
import SpaceRank from "../../components/Space/SpaceRank";  // Adjust the import path as necessary

const sampleSpaces = [
  {
    id: 1,
    name: "Space Alpha",
    image: "https://via.placeholder.com/150",
    sessions: 5,
    members: ["Alice", "Bob", "Charlie"],
  },
  {
    id: 2,
    name: "Space Beta",
    image: "https://via.placeholder.com/150",
    sessions: 3,
    members: ["David", "Eve"],
  },
  {
    id: 3,
    name: "Space Gamma",
    image: "https://via.placeholder.com/150",
    sessions: 8,
    members: ["Frank"],
  },
  {
    id: 4,
    name: "Space Delta",
    image: "https://via.placeholder.com/150",
    sessions: 2,
    members: ["Grace", "Heidi", "Ivan"],
  },
];

const Spacerank = () => {
  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      {sampleSpaces.map((space, index) => (
        <SpaceRank
          key={space.id}
          rank={index + 1}
          space={{
            ...space,
            members: space.members.length,
          }}
          canEdit={true}  // Adjust based on whether you want to allow edit options
        />
      ))}
    </ScrollView>
  );
};

export default Spacerank;
import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { PieChart } from "react-native-gifted-charts";

export default function CustomPieChart({ data }) {
  const [selectedSection, setSelectedSection] = useState(null);
  // Calculate total value
  const totalValue = data.reduce((acc, item) => acc + item.value, 0);

  const renderLegend = (text, color) => {
    return (
      <View className="flex-row">
        <View
          style={{
            height: 18,
            width: 18,
            marginRight: 10,
            borderRadius: 4,
            backgroundColor: color,
          }}
        />
        <Text className="font-ProximaNova text-xs color-[#222222]">
          {text || ""}
        </Text>
      </View>
    );
  };

  const convertSecondsToReadableTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const hoursDisplay =
      hours > 0 ? `${hours} hour${hours !== 1 ? "s" : ""}` : "";
    const minutesDisplay =
      minutes > 0 ? `${minutes} min${minutes !== 1 ? "s" : ""}` : "";
    const secondsDisplay =
      seconds > 0 ? `${seconds} sec${seconds !== 1 ? "s" : ""}` : "";

    return [hoursDisplay, minutesDisplay, secondsDisplay]
      .filter(Boolean)
      .join(" ");
  };

  return (
    <>
      <PieChart
        donut
        innerRadius={50}
        radius={90}
        textColor="black"
        isAnimated
        data={data}
        innerCircleBorderWidth={10}
        innerCircleBorderColor={"white"}
        toggleFocusOnPress={false}
        focusOnPress
        labelsPosition="onBorder"
        centerLabelComponent={() => {
          const percentage = selectedSection
            ? (selectedSection.value / totalValue) * 100
            : (data[0].value / totalValue) * 100;

          const formattedPercentage =
            percentage !== null
              ? percentage % 1 === 0
                ? percentage.toFixed(0) // If the percentage is a whole number, round to 0 decimal places
                : percentage.toFixed(1) // If not, round to 1 decimal place
              : "";

          return (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text
                style={{ fontSize: 22, color: "black", fontWeight: "bold" }}
              >
                {formattedPercentage + "%"}
              </Text>
              <Text className="font-ProximaNovaReg text-center text-xs">
                {selectedSection ? selectedSection.text : "Focus"}
              </Text>
            </View>
          );
        }}
        onPress={(section) => {
          setSelectedSection(section);
        }}
      />
      <View className="justify-center gap-2">
        {renderLegend(
          `Focus: ${convertSecondsToReadableTime(data[0].value)}`,
          "#C2D9FF"
        )}
        {renderLegend(
          `Break: ${convertSecondsToReadableTime(data[1].value)}`,
          "#190482"
        )}
        {renderLegend(
          `Not Focus: ${convertSecondsToReadableTime(data[2].value)}`,
          "#FACC2D"
        )}
      </View>
    </>
  );
}

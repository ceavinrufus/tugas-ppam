import { Text } from "react-native";
import React from "react";
import { BarChart } from "react-native-gifted-charts";

export default function CustomBarChart({ data }) {
  return (
    <BarChart
      renderTooltip={(item, index) => (
        <Text className="text-center w-full">{item.value}</Text>
      )}
      leftShiftForTooltip={-12}
      leftShiftForLastIndexTooltip={-12}
      noOfSections={4}
      barBorderTopLeftRadius={4}
      barBorderTopRightRadius={4}
      maxValue={16}
      data={data}
      isAnimated
      frontColor={"#C2D9FF"}
      height={120}
      barWidth={32}
      spacing={4}
    />
  );
}

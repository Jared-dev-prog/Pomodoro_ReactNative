import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const options = ["Pomodoro", "Short Break", "Long Break"];

const Header = ({ setTime, currentTime, setCurrentTime }) => {
  const handlePress = (index) => {
    const newTime = index === 0 ? 25 : index === 1 ? 5 : 15;
    setCurrentTime(index);
    setTime(newTime * 60);
  };

  return (
    <View style={{ flexDirection: "row" }}>
      {options.map((option, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handlePress(index)}
          style={[styles.itemStyle, currentTime !== index && { borderColor: "transparent" }]}>
          <Text style={{ fontWeight: "bold" }}>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  itemStyle: {
    borderWidth: 3,
    padding: 5,
    width: "33.3%",
    borderColor: "white",
    marginVertical: 20,
    borderRadius: 10,
    alignItems: "center",
  },
});

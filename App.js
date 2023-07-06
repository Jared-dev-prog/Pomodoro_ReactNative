import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView, Platform, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import Header from "./src/components/Header";
import Timer from "./src/components/Timer";
import { Audio } from "expo-av";

const colors = ["#f7dc6f", "#a2d9ce", "#d7bde2"];

export default function App() {
  const [isWorking, setIsWorking] = useState(false);
  const [time, setTime] = useState(25 * 60);
  const [currentTime, setCurrentTime] = useState("POMO" | "SHORT" | "BREAK");
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isActive) {
      // run timer
      interval = setInterval(() => {
        setTime(time - 1);
      }, 10);
    } else {
      //cleart timer
      clearInterval(interval);
    }

    if (time === 0) {
      setIsActive(false);
      setIsWorking((prev) => !prev);
      setTime(isWorking ? 300 : 1500);
    }

    return () => clearInterval(interval);
  }, [isActive, time]);

  function handleStartStop() {
    playSound();
    setIsActive(!isActive);
  }

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(require("./assets/click.wav"));
    await sound.playAsync();
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors[currentTime] }]}>
      <View
        style={{
          paddingHorizontal: 15,
          flex: 1,
          paddingTop: Platform.OS === "android" && 30,
        }}>
        <Text style={styles.text}>Pomodoro</Text>
        <Header setTime={setTime} currentTime={currentTime} setCurrentTime={setCurrentTime} />
        <Timer time={time} />
        <TouchableOpacity style={styles.button} onPress={handleStartStop}>
          <Text style={{ color: "white", fontWeight: "bold" }}>{isActive ? "STOP" : "START "}</Text>
        </TouchableOpacity>
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 32,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#333333",
    padding: 15,
    marginTop: 15,
    borderRadius: 15,
    alignItems: "center",
  },
});

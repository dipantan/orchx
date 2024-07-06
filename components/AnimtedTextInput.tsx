import React, { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, TextInput, View } from "react-native";

type Props = {
  placeholderTexts: string[];
};

const AnimatedPlaceholderInput = ({ placeholderTexts }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const translateY1 = useRef(new Animated.Value(0)).current;
  const translateY2 = useRef(new Animated.Value(20)).current;
  const opacity1 = useRef(new Animated.Value(1)).current;
  const opacity2 = useRef(new Animated.Value(0)).current;
  const [currentText, setCurrentText] = useState(placeholderTexts[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % placeholderTexts.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [placeholderTexts.length]);

  useEffect(() => {
    setCurrentText(placeholderTexts[currentIndex]);

    opacity1.setValue(1);
    translateY1.setValue(0);
    opacity2.setValue(0);
    translateY2.setValue(20);

    Animated.parallel([
      Animated.timing(opacity1, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(translateY1, {
        toValue: -20,
        duration: 900,
        useNativeDriver: true,
      }),
      Animated.timing(opacity2, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(translateY2, {
        toValue: 0,
        duration: 900,
        useNativeDriver: true,
      }),
    ]).start();
  }, [
    currentIndex,
    opacity1,
    translateY1,
    opacity2,
    translateY2,
    placeholderTexts,
  ]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder=""
        placeholderTextColor="transparent"
      />

      <Animated.View
        style={[
          styles.placeholderContainer,
          { opacity: opacity1, transform: [{ translateY: translateY1 }] },
        ]}
      >
        <Animated.Text style={styles.placeholder}>
          {
            placeholderTexts[
              (currentIndex - 1 + placeholderTexts.length) %
                placeholderTexts.length
            ]
          }
        </Animated.Text>
      </Animated.View>
      <Animated.View
        style={[
          styles.placeholderContainer,
          { opacity: opacity2, transform: [{ translateY: translateY2 }] },
        ]}
      >
        <Animated.Text style={styles.placeholder}>{currentText}</Animated.Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingLeft: 10,
  },
  placeholderContainer: {
    position: "absolute",
    top: 8,
    left: 15,
  },
  placeholder: {
    color: "gray",
  },
});

export default AnimatedPlaceholderInput;

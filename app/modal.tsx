import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ImageViewer from "@/components/ImageViewer";
import { StatusBar } from "expo-status-bar";

const Modal = () => {
  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor="rgba(0,0,0,0.5)" />
      <View style={styles.imageContainer}>
        <ImageViewer
          source={{
            uri: "https://kinsta.com/wp-content/uploads/2020/08/tiger-jpg.jpg",
          }}
          style={styles.image}
        />
      </View>
    </View>
  );
};

export default Modal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 16,
  },
  imageContainer: {
    width: "100%",
    height: "60%", // Adjust the height as needed
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

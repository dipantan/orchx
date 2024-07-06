import {
  ActivityIndicator,
  Button,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import BottomSheet from "@/components/BottomSheet";
import { router } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import AnimatedPlaceholderInput from "@/components/AnimtedTextInput";

const Index = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [likes, setLikes] = useState(0);
  const interval = useRef<NodeJS.Timeout | null>(null);

  const placeholderTexts = [
    "Search for restaurants",
    "Search for dishes",
    "Search for cuisines",
  ];

  const [isTrialLoading, setIsTrialLoading] = useState(false);

  const incrementLikes = () => {
    setLikes((prevLikes) => prevLikes + 1);
  };

  // refs
  const bottomSheetModalRef = useRef<BottomSheetModal>(null); //for likes counter
  const bottomSheetModalRef2 = useRef<BottomSheetModal>(null); //for free trial

  useEffect(() => {
    if (modalVisible) {
      interval.current = setInterval(incrementLikes, 30000);
    } else {
      if (interval.current) clearInterval(interval.current);
    }
    return () => {
      if (interval.current) clearInterval(interval.current);
    };
  }, [modalVisible]);

  const handleSheetChanges = (index: number) => {
    if (index === 0) {
      setModalVisible(true);
    } else {
      setModalVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Animated placeholder input */}
      <View
        style={{
          position: "absolute",
          top: 16,
          width: "90%",
        }}
      >
        <AnimatedPlaceholderInput placeholderTexts={placeholderTexts} />
      </View>

      {/* Image viewer */}
      <Button title="Image Viewer" onPress={() => router.push("/modal")} />

      {/* Like counter */}
      <Button
        title="Open Bottom Sheet"
        onPress={() => bottomSheetModalRef.current?.present()}
      />
      <BottomSheet
        bottomSheetModalRef={bottomSheetModalRef}
        handleSheetChanges={handleSheetChanges}
        onDismiss={() => {
          if (interval.current) clearInterval(interval.current);
        }}
        snapPoints={["75%"]}
      >
        <View style={styles.rowContainer}>
          <Text style={styles.title}>Description</Text>
          <Pressable onPress={() => bottomSheetModalRef.current?.dismiss()}>
            <AntDesign name="close" size={24} color="black" />
          </Pressable>
        </View>

        <View style={styles.divider} />

        <Text style={styles.description}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
          quos dolores dignissimos doloremque ipsam.
        </Text>

        <View style={[styles.rowContainer, { marginTop: 16 }]}>
          <View style={styles.textContainer}>
            <Text style={styles.description}>{likes}</Text>
            <Text style={styles.shortDescription}>Likes</Text>
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.description}>9</Text>
            <Text style={styles.shortDescription}>Views</Text>
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.description}>{new Date().getFullYear()}</Text>
            <Text style={styles.shortDescription}>
              {`${new Date().getDate()} ${new Date().toLocaleString("default", {
                month: "short",
              })}`}
            </Text>
          </View>
        </View>
      </BottomSheet>

      {/* free trial */}
      {isTrialLoading ? (
        <ActivityIndicator />
      ) : (
        <Button
          title="Accept Free Trial"
          onPress={() => {
            setIsTrialLoading(true);
            setTimeout(() => {
              bottomSheetModalRef2.current?.present();
              setIsTrialLoading(false);
            }, 3000);
          }}
        />
      )}
      <BottomSheet
        bottomSheetModalRef={bottomSheetModalRef2}
        snapPoints={["50%"]}
      >
        <View style={styles.rowContainer}>
          <View
            style={[
              styles.rowContainer,
              {
                justifyContent: "flex-start",
                paddingHorizontal: 0,
                width: "50%",
              },
            ]}
          >
            <AntDesign name="apple1" size={21} color="black" />
            <Text style={styles.title}>Arcade</Text>
          </View>
          <Pressable
            style={{}}
            onPress={() => bottomSheetModalRef2.current?.dismiss()}
          >
            <AntDesign name="close" size={21} color="black" />
          </Pressable>
        </View>
      </BottomSheet>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    rowGap: 16,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  rowContainer: {
    paddingHorizontal: 16,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  divider: {
    marginVertical: 16,
    width: "100%",
    height: 1,
    backgroundColor: "#e5e5e5",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    paddingHorizontal: 16,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "500",
  },
  textContainer: {
    alignItems: "center",
  },
  shortDescription: {
    fontSize: 12,
  },
});

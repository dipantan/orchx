import React, { useMemo } from "react";
import { Text, StyleSheet } from "react-native";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";

type Props = {
  children: React.ReactNode;
  bottomSheetModalRef: React.RefObject<BottomSheetModalMethods>;
  handleSheetChanges?: (index: number) => void;
  onDismiss?: () => void;
  snapPoints: string[];
};

const BottomSheet = ({
  children,
  bottomSheetModalRef,
  handleSheetChanges,
  onDismiss,
  snapPoints,
}: Props) => {
  // variables
  const snapPointsValue = useMemo(() => snapPoints, []);

  // renders
  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={0}
      snapPoints={snapPointsValue}
      onChange={handleSheetChanges}
      onDismiss={onDismiss}
      enablePanDownToClose
      style={{
        elevation: 5,
        backgroundColor: "white",
      }}
    >
      <BottomSheetView style={styles.contentContainer}>
        {children}
      </BottomSheetView>
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});

export default BottomSheet;

import React, { useRef } from "react";
import { View, Animated, ImageSourcePropType } from "react-native";
import {
  PinchGestureHandler,
  RotationGestureHandler,
  State,
} from "react-native-gesture-handler";

type Props = {
  source: ImageSourcePropType;
  style?: any;
  minScale?: number;
  maxScale?: number;
};

const ImageViewer = ({
  source,
  style,
  minScale = 0.5,
  maxScale = 2,
}: Props) => {
  const scale = useRef(new Animated.Value(1)).current; // Initial scale set to 1
  const lastScale = useRef(1);

  const rotation = useRef(new Animated.Value(0)).current; // Initial rotation set to 0
  const lastRotation = useRef(0);
  const rotateStr = rotation.interpolate({
    inputRange: [-100, 100],
    outputRange: ["-100rad", "100rad"],
  });

  const handlePinchEvent = Animated.event([{ nativeEvent: { scale } }], {
    useNativeDriver: false,
    listener: (event) => {
      let newScale = lastScale.current * event.nativeEvent.scale;
      if (newScale < minScale) {
        newScale = minScale;
      } else if (newScale > maxScale) {
        newScale = maxScale;
      }
      scale.setValue(newScale);
    },
  });

  const handlePinchStateChange = (event: {
    nativeEvent: { oldState: number; scale: number };
  }) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      lastScale.current = lastScale.current * event.nativeEvent.scale;
      if (lastScale.current < minScale) {
        lastScale.current = minScale;
      } else if (lastScale.current > maxScale) {
        lastScale.current = maxScale;
      }
      scale.setValue(lastScale.current);
    }
  };

  const handleRotateEvent = Animated.event([{ nativeEvent: { rotation } }], {
    useNativeDriver: false,
  });

  const handleRotateStateChange = (event: {
    nativeEvent: { oldState: number; rotation: number };
  }) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      lastRotation.current += event.nativeEvent.rotation;
      rotation.setValue(lastRotation.current);
    }
  };

  return (
    <View style={[style, { overflow: "hidden" }]}>
      <RotationGestureHandler
        onGestureEvent={handleRotateEvent}
        onHandlerStateChange={handleRotateStateChange}
      >
        <Animated.View style={{ flex: 1 }}>
          <PinchGestureHandler
            onGestureEvent={handlePinchEvent}
            onHandlerStateChange={handlePinchStateChange}
          >
            <Animated.View style={{ flex: 1 }}>
              <Animated.Image
                source={source}
                style={{
                  flex: 1,
                  resizeMode: "contain",
                  transform: [{ scale }, { rotate: rotateStr }],
                }}
              />
            </Animated.View>
          </PinchGestureHandler>
        </Animated.View>
      </RotationGestureHandler>
    </View>
  );
};

export default ImageViewer;

import React, { useEffect } from 'react';
import { View, Image, StyleSheet, useWindowDimensions, Animated } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const RotatingImage = ({image,toggleModal}) => {
  const { width, height } = useWindowDimensions();

  // Calculate whether the device is in landscape mode
  const isLandscape = width > height;

  // Define rotation based on orientation
  const rotation = isLandscape ? '270deg' : '0deg';

  return (
    <View style={styles.container}>
      <Animated.View style={{ transform: [{ rotate: rotation }] }}>
        <Image
          source={{ uri: image }}
          style={styles.image}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    top:40
  },
  image: {
    width: wp(90),
    height: wp(120),
    resizeMode:"contain"
  },
});

export default RotatingImage;

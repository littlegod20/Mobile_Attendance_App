import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolation,
} from "react-native-reanimated";
import { ThemedView } from "../contexts/ThemedView";
import { ThemedText } from "../contexts/ThemedText";
import { carousel } from "../utils/data";
import { CarouselProps } from "../utils/types";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const CarouselWithPagination: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const handleScrollBegin = () => {
    setIsAutoPlay(false);
  };

  const handleScrollEnd = () => {
    // Resume auto-play after 5 seconds of inactivity
    setTimeout(() => setIsAutoPlay(true), 5000);
  };

  const renderItem = ({ item }: { item: CarouselProps }) => {
    return (
      <ThemedView className="h-full bg-blue-300 flex items-center justify-center">
        <ThemedText type="defaultSemiBold">
          {item.title ? item.title : item.courseName}
        </ThemedText>
        <ThemedText type="mediumSemi">
          {" "}
          {item.time ? item.time : item.courseId}{" "}
        </ThemedText>
        {item.courseId ? (
          <ThemedText className="italic">
            Attendance Rate: {item.percentage}%
          </ThemedText>
        ) : null}
      </ThemedView>
    );
  };

  const PaginationItem: React.FC<{ index: number }> = ({ index }) => {
    const animatedStyle = useAnimatedStyle(() => {
      const opacity = interpolate(
        activeIndex,
        [index - 1, index, index + 1],
        [0.5, 1, 0.5],
        Extrapolation.CLAMP
      );
      const scale = interpolate(
        activeIndex,
        [index - 1, index, index + 1],
        [1, 1.25, 1],
        Extrapolation.CLAMP
      );
      return { opacity, transform: [{ scale }] };
    });

    return (
      <Animated.View
        style={[
          {
            width: 8,
            height: 8,
            borderRadius: 4,
            marginHorizontal: 4,
            backgroundColor: "black",
          },
          animatedStyle,
        ]}
      />
    );
  };

  return (
    <View className="flex justify-center items-center">
      <View className="bg-[#ddd1c5] rounded-lg opacity-90 h-[130px] mb-5">
        <Carousel
          loop
          width={SCREEN_WIDTH * 0.85}
          autoPlay={isAutoPlay}
          autoPlayInterval={3000}
          data={carousel}
          scrollAnimationDuration={1000}
          onSnapToItem={(index) => setActiveIndex(index)}
          renderItem={renderItem}
          onScrollBegin={handleScrollBegin}
          onScrollEnd={handleScrollEnd}
        />
      </View>
      <View className="flex flex-row justify-center items-center">
        {carousel.map((_, index) => (
          <PaginationItem key={index} index={index} />
        ))}
      </View>
    </View>
  );
};

export default CarouselWithPagination;

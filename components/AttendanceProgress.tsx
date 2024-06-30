import React from "react";
import { View, Dimensions } from "react-native";
import { carousel } from "../data";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { ThemedText } from "../contexts/ThemedText";
import { ThemedView } from "../contexts/ThemedView";
import { CarouselProps } from "../utils/types";

export const { width } = Dimensions.get("window");

const CarouselCardItem = () => {
  const isCarousel = React.useRef(null);

  const [index, setIndex] = React.useState(0);

  const renderItem = ({ item }: { item: CarouselProps }) => (
    <ThemedView
      key={item.id ? item.id : item.courseId}
      className="h-full  flex items-center justify-center"
    >
      <ThemedText>{item.title ? item.title : item.courseName}</ThemedText>
      <ThemedText> {item.time ? item.time : item.courseId} </ThemedText>
      {item.courseId ? (
        <ThemedText>Attendance Rate: {item.percentage}%</ThemedText>
      ) : null}
    </ThemedView>
  );

  return (
    <View className="h-full  flex flex-col">
      <View className="bg-[#ddd1c5] rounded-lg opacity-90 h-[130px] ">
        <Carousel
          // layout="tinder"
          ref={isCarousel}
          data={carousel}
          renderItem={renderItem}
          sliderWidth={width * 0.85}
          itemWidth={250}
          vertical={false}
          useScrollView={true}
          onSnapToItem={(index) => setIndex(index)}
        />
      </View>

      <Pagination
        dotsLength={carousel.length}
        activeDotIndex={index}
        carouselRef={isCarousel}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 0,
          backgroundColor: "#A66D36",
        }}
        inactiveDotOpacity={0.6}
        tappableDots={true}
        containerStyle={{ marginTop: -10 }}
      />
    </View>
  );
};

export default CarouselCardItem;

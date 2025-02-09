import React from "react"
import {
  Image,
  StyleSheet,
  Platform,
  View,
  Text,
  FlatList,
  StatusBar,
} from "react-native";
import { faker } from "@faker-js/faker";
import Animated, {
  useAnimatedRef,
  useScrollViewOffset,
  interpolate,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  useSharedValue
} from 'react-native-reanimated';

const AVATAR_SIZE = 70;
const SPACING = 20;
const ITEM_SIZE = AVATAR_SIZE + 3 * SPACING

const BG_IMG = "https://images.pexels.com/photos/3147624/pexels-photo-3147624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"

faker.seed(10);
const DATA = [...Array(30).keys()].map((_, i) => {
  const gender = faker.person.sexType(); // Returns 'male' or 'female' every time
  return {
    key: faker.string.uuid(),
    image: `https://randomuser.me/api/portraits/${gender === "male" ? "men" : "women"
      }/${faker.number.int({ min: 0, max: 60 })}.jpg`,
    name: faker.internet.username(),
    jobTitle: faker.person.jobTitle(),
    email: faker.internet.email(),
  };
});

const ListItem = ({ item, index, offset }) => {

  // const opacityInput = [-1, 0, ITEM_SIZE * index - ITEM_SIZE, ITEM_SIZE * index ]
  const opacityInput = [
    -1, 0, ITEM_SIZE * index, ITEM_SIZE * (index + 0.5)
  ]

  const scaleInput = [
    -1, 0, ITEM_SIZE * index, ITEM_SIZE * (index + 2)
  ]

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(offset.value, opacityInput, [1, 1, 1, 0], 'clamp'),
    transform: [
      {
        scale: interpolate(offset.value, scaleInput, [1, 1, 1, 0], 'clamp')
      }
    ]

  }))

  return (
    <Animated.View
      style={[{
        display: "flex",
        flexDirection: "row",
        marginBottom: SPACING,
        padding: SPACING,
        borderRadius: 18,
        backgroundColor: 'rgba(255, 255, 255, 0.8)'
      }, animatedStyle]}
    >
      <Image
        source={{ uri: item.image }}
        style={{
          height: AVATAR_SIZE,
          width: AVATAR_SIZE,
          borderRadius: AVATAR_SIZE,
          marginRight: SPACING / 2,
        }}
      />

      <View>
        <Text style={{ fontSize: 18, fontWeight: "700" }}>
          {item.name}
        </Text>
        <Text style={{ fontSize: 12, opacity: 0.7 }}>
          {" "}
          {item.jobTitle}{" "}
        </Text>
        <Text style={{ fontSize: 12, opacity: 0.8, color: "#0099cc" }}>
          {" "}
          {item.email}{" "}
        </Text>
      </View>
    </Animated.View>
  );
}


export default function HomeScreen() {
  const offsetY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    offsetY.value = event.contentOffset.y;
  });

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Image source={{ uri: BG_IMG }} style={StyleSheet.absoluteFill} blurRadius={70} />
      <Animated.FlatList
        onScroll={scrollHandler}
        data={DATA}
        keyExtractor={(item) => item.key}
        contentContainerStyle={{ padding: SPACING, paddingTop: StatusBar.currentHeight || 42 }}
        renderItem={({ item, index }) => {
          return (
            <ListItem item={item} index={index} offset={offsetY} />
          )
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
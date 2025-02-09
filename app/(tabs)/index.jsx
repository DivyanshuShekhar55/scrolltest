import {
  Image,
  StyleSheet,
  Platform,
  View,
  Text,
  FlatList,
} from "react-native";
import { faker } from "@faker-js/faker";
import Animated, {
  useAnimatedRef,
  useScrollViewOffset,
} from 'react-native-reanimated';

const AVATAR_SIZE = 70;
const SPACING = 20;

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

export default function HomeScreen() {
  const animatedRef = useAnimatedRef()
  const offset = useScrollViewOffset(animatedRef)

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Image source={{uri:BG_IMG}} style={StyleSheet.absoluteFill} blurRadius={70}/>
      <Animated.FlatList
        ref={animatedRef}
        data={DATA}
        keyExtractor={(item) => item.key}
        contentContainerStyle={{ padding: SPACING }}
        renderItem={({ item, index }) => {
          return (
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                marginBottom: SPACING,
                padding:SPACING
              }}
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
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
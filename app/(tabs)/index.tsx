import {
  Image,
  StyleSheet,
  Platform,
  View,
  Text,
  FlatList,
} from "react-native";
import { faker } from "@faker-js/faker";

const AVATAR_SIZE = 70;
const SPACING = 20;

faker.seed(10);
const DATA = [...Array(30).keys()].map((_, i) => {
  const gender = faker.person.sexType(); // Returns 'male' or 'female' every time
  return {
    key: faker.string.uuid(),
    image: `https://randomuser.me/api/portraits/${
      gender === "male" ? "men" : "women"
    }/${faker.number.int({ min: 0, max: 60 })}.jpg`,
    name: faker.internet.username(),
    jobTitle: faker.person.jobTitle(),
    email: faker.internet.email(),
  };
});

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <FlatList
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
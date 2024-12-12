import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useRef, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import * as Haptics from "expo-haptics";

// Kategorier till headern med respektive ikon
const categories = [
  { name: "Beef", icon: "cow" },
  { name: "Chicken", icon: "food-drumstick" },
  { name: "Dessert", icon: "cupcake" },
  { name: "Lamb", icon: "sheep" },
  { name: "Miscellaneous", icon: "dots-horizontal" },
  { name: "Pasta", icon: "noodles" },
  { name: "Pork", icon: "pig" },
  { name: "Seafood", icon: "fish" },
  { name: "Side", icon: "food" },
  { name: "Starter", icon: "silverware-fork-knife" },
  { name: "Vegan", icon: "leaf" },
  { name: "Vegetarian", icon: "food-apple" },
  { name: "Breakfast", icon: "coffee" },
];

interface Props {
  onCategoryChanged: (category: string) => void;
}

// Header med kategorier
const ExploreHeader = ({ onCategoryChanged}: Props) => {
  const scrollRef = useRef<ScrollView>(null);
  const itemsRef = useRef<(React.ElementRef<typeof TouchableOpacity> | null)[]>(
    []
  );
  const [activeIndex, setActiveIndex] = useState(0);

  // Uppdaterar den aktiva kategorins index, scrollar till kategorin man klickat på, använder haptics för bättre användarupplevelse
  const selectCategory = (index: number) => {
    const selected = itemsRef.current[index];
    setActiveIndex(index);

    selected?.measure((x) => {
      scrollRef.current?.scrollTo({ x: x - 16, y: 0, animated: true });
    });

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onCategoryChanged(categories[index].name);
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#fff" }}>
      <View style={styles.container}>
        <ScrollView
          ref={scrollRef}
          horizontal
          contentContainerStyle={{
            alignItems: "center",
            gap: 30,
            paddingHorizontal: 16,
          }}
        >
          {categories.map((item, index) => (
            <TouchableOpacity
              onPress={() => selectCategory(index)}
              key={index}
              ref={(el) => (itemsRef.current[index] = el)}
              style={
                activeIndex === index
                  ? styles.categoriesBtnActive
                  : styles.categoriesBtn
              }
            >
              <MaterialCommunityIcons
                size={24}
                name={item.icon as any}
                color={activeIndex === index ? "#000" : Colors.grey}
              />
              <Text
                style={activeIndex === index ? styles.categoryTextActive : styles.categoryText}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height: 80,
  },
  categoryText: {
    fontSize: 14,
    fontFamily: "mon-sb",
    color: Colors.grey,
  },
  categoryTextActive: {
    fontSize: 14,
    fontFamily: "mon-sb",
    color: "#000",
  },
  categoriesBtn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 8,
  },
  categoriesBtnActive: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderBottomColor: "#000",
    borderBottomWidth: 2,
    paddingBottom: 8,
  },
});

export default ExploreHeader;

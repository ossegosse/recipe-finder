import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import useGet from "@/hooks/useGet";
import { mapIngredients } from "@/utils/mapIngredients";
import Colors from "@/constants/Colors";

type Ingredient = {
  name: string;
  measure: string;
};

type Meal = {
  strMeal: string;
  strMealThumb: string;
  idMeal: string;
  strInstructions: string;
  ingredients: Ingredient[];
};

const DetailsPage = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, loading, error } = useGet<{ meals: Meal[] }>(
    `lookup.php?i=${id}`, // Endpoint för detaljer
    "https://www.themealdb.com/api/json/v1/1/" // Base URL
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  if (!data || !data.meals || data.meals.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>No recipe found</Text>
      </View>
    );
  }

  const recipe = data.meals[0];
  const ingredients = mapIngredients(recipe);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{recipe.strMeal}</Text>
      <Image source={{ uri: recipe.strMealThumb }} style={styles.image} />

      <View style={styles.ingredientsContainer}>
        <Text style={styles.ingredientsTitle}>Ingredients:</Text>
        {ingredients.map((ingredient, index) => (
          <Text key={index} style={styles.ingredient}>
            {ingredient.measure} {ingredient.name}
          </Text>
        ))}
        <View style={styles.divider} />
      </View>
      
      <View style={styles.instructionsContainer}>
        <Text style={styles.instructionsTitle}>Instructions:</Text>
        {recipe.strInstructions
          .split(". ")
          .filter((instruction) => instruction.trim() !== "")
          .map((instruction, index) => (
            <Text key={index} style={styles.instruction}>
              {instruction.trim()}.
            </Text>
          ))}
      </View>
    </ScrollView>
  );
};

export default DetailsPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontFamily: "mon-sb",
    marginBottom: 8,
  },
  image: {
    width: "100%",
    height: 300,
    resizeMode: "cover",
    borderRadius: 8,
    marginBottom: 16,
  },
  ingredientsContainer: {
    marginTop: 16,
  },
  ingredientsTitle: {
    marginBottom: 8,
    fontSize: 20,
    fontFamily: "mon-sb",
  },
  ingredient: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: "mon",
  },
  instructionsContainer: {
    marginTop: 16,
  },
  instructionsTitle: {
    marginBottom: 8,
    fontSize: 20,
    fontFamily: "mon-sb",
  },
  instruction: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
    fontFamily: "mon",
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.grey,
    marginVertical: 16,
  },
});

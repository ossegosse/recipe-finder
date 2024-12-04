import React from 'react';
import { StyleSheet, Text, View, Image, ActivityIndicator, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import useGet from '@/hooks/useGet';

type Meal = {
  strMeal: string;
  strMealThumb: string;
  idMeal: string;
  strInstructions: string;
};


const DetailsPage = () => {
  const { id } = useLocalSearchParams<{ id: string }>(); // Hämta 'id' från URL-parametrarna
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

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{recipe.strMeal}</Text>
      <Image
        source={{ uri: recipe.strMealThumb }}
        style={styles.image}
      />
      <Text style={styles.instructions}>{recipe.strInstructions}</Text>
    </ScrollView>
  );
};

export default DetailsPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
    borderRadius: 8,
    marginBottom: 16,
  },
  instructions: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 40,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});

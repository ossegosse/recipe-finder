import React from 'react';
import { View, Text, ActivityIndicator, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import useGet from '@/hooks/useGet';
import { Link } from 'expo-router';
import { BASE_URLS } from '@/hooks/useGet';

type Meal = {
  strMeal: string;
  strMealThumb: string;
  idMeal: string;
};

type MealsResponse = {
  meals: Meal[];
};

interface Props {
  category: string;
}



const Recipes = ({ category }: Props) => {
  const { data, loading, error } = useGet<MealsResponse>(
    category, 
    BASE_URLS.CATEGORY
  );

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  if (!data?.meals?.length) {
    return (
      <View>
        <Text>No meals found for {category}.</Text>
      </View>
    );
  }

  return (
    <ScrollView >
      {data.meals.map((meal) => (
        <View style={styles.listing} key={meal.idMeal}>
          <Link href={`/details/${meal.idMeal}`} asChild>
          <TouchableOpacity >  
            <Image
              style={styles.image}
              source={{ uri: meal.strMealThumb }}
              resizeMode="cover"
            />
            <Text style={styles.info}>{meal.strMeal}</Text>
          </TouchableOpacity>
          </Link>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  listing: {
    padding: 16,
    marginVertical: 2,
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 10,
  },
  info: {
    textAlign: 'center',
    fontFamily: 'mon-sb',
    fontSize: 16,
    marginTop: 4,
  },
});

export default Recipes;

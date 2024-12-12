import React from 'react';
import { View, Text, ActivityIndicator, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import useGet from '@/hooks/useGet';
import { Link } from 'expo-router';
import { BASE_URLS } from '@/hooks/useGet';
import Colors from '@/constants/Colors';
import FavoriteButton from './FavoriteButton';

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

// Recipe-komponent. Använder kategori som prop som skickas för att meddela vilken kategori som är vald och som ska renderas. 
// Hämtar och renderar data
const Recipes = ({ category }: Props) => {
  const { data, loading, error } = useGet<MealsResponse>(
    category, 
    BASE_URLS.CATEGORY
  );

  // Renderar tillståndsbaserat innehåll baserat på om det laddar, får error, inte hittar data eller hittar data.
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
    <ScrollView>
      {data.meals.map((meal) => (
        <View style={styles.listing} key={meal.idMeal}>
          <Link href={`/details/${meal.idMeal}`} asChild>
            <TouchableOpacity>
              <Image
                style={styles.image}
                source={{ uri: meal.strMealThumb }}
                resizeMode="cover"
              />
              <View style={styles.infoContainer}>
                <Text style={styles.info}>{meal.strMeal}</Text>
                <FavoriteButton meal={meal} /> 
              </View>
            </TouchableOpacity>
          </Link>
          <View style={styles.divider} />
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
  infoContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginTop: 8,
  },
  info: {
    textAlign: 'center',
    fontFamily: 'mon-sb',
    fontSize: 16,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.grey,
    marginVertical: 16,
  },
});

export default Recipes;

import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import { useFavorites } from '@/context/FavoritesContext';
import { Link } from 'expo-router';


// screen för favoritmarkerade recept. Länkar vidare till respektive recepts detaljsida
const FavoritesScreen = () => {
  const { favorites } = useFavorites();

  if (favorites.length === 0) {
    return (
      <View style={styles.center}>
        <Text>You have no favorite recipes yet!</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {favorites.map((meal) => (
        <Link href={`/details/${meal.idMeal}`} key={meal.idMeal}>
          <View style={styles.recipeCard}>
            <Image source={{ uri: meal.strMealThumb }} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.title}>{meal.strMeal}</Text>
            </View>
          </View>
        </Link>
      ))}
    </ScrollView>
  );
};

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
  recipeCard: {
    flexDirection: 'row',
    marginBottom: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ccc',
    paddingBottom: 8,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontFamily: 'mon-sb',
    marginBottom: 4,
  },
});

export default FavoritesScreen;

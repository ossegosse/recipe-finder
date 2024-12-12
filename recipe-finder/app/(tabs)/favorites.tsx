import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import { useFavorites } from '@/context/FavoritesContext';
import { Link } from 'expo-router';

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
        <View key={meal.idMeal} style={styles.recipeCard}>
          <Image source={{ uri: meal.strMealThumb }} style={styles.image} />
          <View style={styles.info}>
            <Text style={styles.title}>{meal.strMeal}</Text>
            <Link href={`/details/${meal.idMeal}`}>
              <Text style={styles.linkText}>View Details</Text>
            </Link>
          </View>
        </View>
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
  emptyText: {
    fontSize: 18,
    color: '#999',
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
  linkText: {
    fontSize: 14,
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default FavoritesScreen;

import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useFavorites } from '@/context/FavoritesContext';

type FavoriteButtonProps = {
  meal: {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
  };
};

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ meal }) => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const favorite = isFavorite(meal.idMeal);

  return (
    <TouchableOpacity
      style={[styles.button, favorite && styles.favorited]}
      onPress={() => toggleFavorite(meal)}
    >
      <Text style={styles.text}>{favorite ? 'Remove from Favorites' : 'Add to Favorites'}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
    marginTop: 8,
  },
  favorited: {
    backgroundColor: '#f99',
  },
  text: {
    color: '#333',
    fontSize: 14,
  },
});

export default FavoriteButton;

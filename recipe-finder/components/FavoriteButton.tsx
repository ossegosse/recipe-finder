import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFavorites } from '@/context/FavoritesContext';

type FavoriteButtonProps = {
  meal: {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
  };
};

// Hämtar och använder togglefunktioner från context
const FavoriteButton: React.FC<FavoriteButtonProps> = ({ meal }) => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const favorite = isFavorite(meal.idMeal);

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => toggleFavorite(meal)}
    >
       <MaterialCommunityIcons
        name={favorite ? 'heart' : 'heart-outline'}
        size={30} 
        color={favorite ? 'red' : 'gray'} 
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
  },
});

export default FavoriteButton;

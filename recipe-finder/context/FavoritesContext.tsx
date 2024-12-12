import React, { createContext, useContext, useState } from 'react';

type Favorite = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

type FavoritesContextType = {
  favorites: Favorite[];
  toggleFavorite: (meal: Favorite) => void;
  isFavorite: (id: string) => boolean;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);

  const toggleFavorite = (meal: Favorite) => {
    const exists = favorites.some(fav => fav.idMeal === meal.idMeal);
    if (exists) {
      setFavorites(favorites.filter(fav => fav.idMeal !== meal.idMeal));
    } else {
      setFavorites([...favorites, meal]);
    }
  };

  const isFavorite = (id: string) => favorites.some(fav => fav.idMeal === id);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

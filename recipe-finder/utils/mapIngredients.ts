
type Ingredient = {
    name: string;
    measure: string;
  }; 

export const mapIngredients = (meal: any): Ingredient[] => {
    const ingredients: Ingredient[] = [];
    
    for (let i = 1; i < 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];

      if (ingredient && ingredient.trim() !== "" && measure && measure.trim() !== "") {
        ingredients.push({
          name: ingredient,
          measure: measure,
        })
      }
    }
    return ingredients;
  }
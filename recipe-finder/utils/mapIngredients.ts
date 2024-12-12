
type Ingredient = {
    name: string;
    measure: string;
  }; 


  // extraherar ingredienser ur objekt som lagras i tom array, och sedan kollar så att både ingredienser och måttenhet finns med, och inte är tomma strängar
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
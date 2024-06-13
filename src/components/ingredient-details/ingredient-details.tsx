import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { getIngredients } from '../../slices/ingredients-slice';

export const IngredientDetails: FC = () => {
  const params = useParams();
  const ingredientData = useSelector(getIngredients).find(
    (ing) => ing._id == params.id
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};

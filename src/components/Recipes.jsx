import { useHistory } from 'react-router-dom';
import Drinks from '../pages/Drinks';
import Meals from '../pages/Meals';

export default function Recipes() {
  const history = useHistory();
  return (
    <div>
      {history.location.pathname.includes('drinks')
        ? (
          <Drinks />
        ) : (
          <Meals />
        )}
    </div>
  );
}

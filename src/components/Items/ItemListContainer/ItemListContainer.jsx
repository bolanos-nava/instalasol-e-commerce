import { useParams } from 'react-router-dom';

export function ItemListContainer() {
  const { categoryId } = useParams();

  return (
    <div>
      <h2>{categoryId}</h2>
    </div>
  );
}

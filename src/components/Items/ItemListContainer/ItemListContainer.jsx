import { Outlet, useParams } from 'react-router-dom';

export function ItemListContainer() {
  const { categoryId } = useParams();

  return (
    <div>
      <h2>{categoryId || 'Top ItemListContainer'}</h2>
    </div>
  );
}

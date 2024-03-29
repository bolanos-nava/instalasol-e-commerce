import React from 'react';
import { Link } from 'react-router-dom';

export function ItemCard({ item }) {
  return (
    <Link
      className="shadow-default"
      css={`
        display: flex;
        gap: 10px;
        border-radius: 5px;
        padding: 10px;
        width: 100%;
      `}
      to={`/item/${item.id}`}
    >
      <img
        css={`
          max-width: 200px;
        `}
        src={`${process.env.BASE_URL}/images/${item.image}`}
        alt={item.description}
      />
      <div
        css={`
          display: flex;
          flex-direction: column;
        `}
      >
        <h3
          css={`
            white-space: nowrap;
          `}
        >
          {`${item.brand_name} ${item.name}`}
        </h3>
        <p>${item.price.toFixed(2)}</p>
        <p>{item.description}</p>
      </div>
    </Link>
  );
}

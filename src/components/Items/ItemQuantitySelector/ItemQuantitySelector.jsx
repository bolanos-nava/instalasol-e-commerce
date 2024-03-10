import React from 'react';
import { BasicButton as OperatorButton } from '../../styled-components/BasicButton';

export function ItemQuantitySelector({
  counter: { count, increment, decrement, min, max },
}) {
  return (
    <div
      css={`
        display: flex;
        align-items: center;
        gap: 2px;
      `}
    >
      <OperatorButton disabled={count <= min} onClick={decrement}>
        -
      </OperatorButton>
      <span>{count}</span>
      <OperatorButton disabled={count >= max} onClick={increment}>
        +
      </OperatorButton>
    </div>
  );
}

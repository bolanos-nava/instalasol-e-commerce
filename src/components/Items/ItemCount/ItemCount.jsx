import React from 'react';
import { Button } from 'reactstrap';
import styled from 'styled-components';

import { useCounter } from '../../../hooks';

const OperatorButton = styled(Button).attrs({
  type: 'button',
  className: 'text-buttons-text bg-buttons',
})``;

export function ItemCount({ stock }) {
  const { count, increment, decrement } = useCounter(stock);
  return (
    <div
      css={`
        display: flex;
        align-items: center;
        gap: 2px;
      `}
    >
      <OperatorButton onClick={increment}>+</OperatorButton>
      <span>{count}</span>
      <OperatorButton onClick={decrement}>-</OperatorButton>
    </div>
  );
}

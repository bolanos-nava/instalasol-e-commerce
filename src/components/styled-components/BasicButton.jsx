import { Button } from 'reactstrap';
import styled from 'styled-components';

export const BasicButton = styled(Button).attrs((props) => ({
  type: props.type || 'button',
  className: props.className || 'text-buttons-text bg-buttons',
}))``;

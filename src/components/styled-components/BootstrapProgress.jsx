import { Progress } from 'reactstrap';
import styled from 'styled-components';

export const BootstrapProgress = styled(Progress).attrs({
  color: 'secondary',
  animated: true,
  striped: true,
  value: 100,
})``;

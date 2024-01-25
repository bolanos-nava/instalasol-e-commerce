import styled from 'styled-components';

export const CircularContainer = styled.div`
  --diameter: ${(props) => props.$diameter};
  --bg-color: ${(props) => props.$bgColor};
  --color: ${(props) => props.$color};
  background-color: var(--bg-color);
  color: var(--color);
  width: var(--diameter);
  height: var(--diameter);
  line-height: var(--diameter);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

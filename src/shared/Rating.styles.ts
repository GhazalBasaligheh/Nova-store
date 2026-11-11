import styled from 'styled-components';

export const Wrapper = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const Stars = styled.span`
  display: inline-flex;
  color: ${({ theme }) => theme.colors.accent};
`;

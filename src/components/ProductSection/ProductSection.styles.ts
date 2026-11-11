import styled from 'styled-components';

export const Section = styled.section`
  padding-block: ${({ theme }) => theme.spacing.xxl};
  scroll-margin-block-start: 120px;
`;

export const Stack = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.lg};
`;

export const Heading = styled.h2`
  font-size: 24px;

  ${({ theme }) => theme.media.desktop} {
    font-size: 28px;
  }
`;

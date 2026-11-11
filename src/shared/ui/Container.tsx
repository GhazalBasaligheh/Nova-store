'use client';

import styled from 'styled-components';

// Centered page-width wrapper. Logical properties keep it correct in both RTL and LTR.
export const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin-inline: auto;
  padding-inline: ${({ theme }) => theme.spacing.md};

  ${({ theme }) => theme.media.tablet} {
    padding-inline: ${({ theme }) => theme.spacing.lg};
  }
`;

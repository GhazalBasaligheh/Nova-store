'use client';

import styled from 'styled-components';

// Small orange counter pinned to the inline-end/top corner of a relatively positioned parent.
export const CountBadge = styled.span`
  position: absolute;
  top: 2px;
  inset-inline-end: 2px;
  min-width: 18px;
  height: 18px;
  padding-inline: 4px;
  border-radius: ${({ theme }) => theme.radius.pill};
  background: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.onAccent};
  font-size: 11px;
  font-weight: 700;
  line-height: 18px;
  text-align: center;
`;

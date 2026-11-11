import styled from 'styled-components';

export const Wrapper = styled.footer`
  margin-block-start: auto;
  padding-block: ${({ theme }) => theme.spacing.xxl} ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.header};
  color: ${({ theme }) => theme.colors.onHeader};
`;

export const Columns = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.xl};
  grid-template-columns: 1fr;

  ${({ theme }) => theme.media.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${({ theme }) => theme.media.desktop} {
    grid-template-columns: 2fr 1fr 1fr 1fr;
  }
`;

export const Brand = styled.p`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-block-end: ${({ theme }) => theme.spacing.sm};
  font-size: 22px;
  font-weight: 800;

  svg {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

export const Muted = styled.p`
  opacity: 0.75;
  font-size: 14px;
`;

export const Heading = styled.h2`
  margin-block-end: ${({ theme }) => theme.spacing.sm};
  font-size: 16px;
`;

export const LinkList = styled.ul`
  display: grid;
  gap: ${({ theme }) => theme.spacing.xs};
  list-style: none;
  font-size: 14px;

  a {
    opacity: 0.8;
  }

  a:hover {
    opacity: 1;
    color: ${({ theme }) => theme.colors.accent};
  }
`;

export const Bottom = styled.p`
  margin-block-start: ${({ theme }) => theme.spacing.xl};
  padding-block-start: ${({ theme }) => theme.spacing.lg};
  border-block-start: 1px solid rgb(255 255 255 / 12%);
  font-size: 13px;
  opacity: 0.7;
  text-align: center;
`;

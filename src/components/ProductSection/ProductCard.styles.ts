import styled from 'styled-components';

export const Card = styled.article`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadow.card};
`;

export const Media = styled.div`
  position: relative;
  aspect-ratio: 1;
  background: #fff;

  img {
    object-fit: contain;
    padding: ${({ theme }) => theme.spacing.lg};
  }
`;

export const Body = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.md};
`;

export const CategoryText = styled.p`
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const Title = styled.h3`
  display: -webkit-box;
  min-height: calc(2 * 1.5em);
  overflow: hidden;
  font-size: 15px;
  font-weight: 600;
  line-height: 1.5;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
`;

export const Footer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-block-start: auto;
`;

export const Price = styled.p`
  font-size: 17px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
`;

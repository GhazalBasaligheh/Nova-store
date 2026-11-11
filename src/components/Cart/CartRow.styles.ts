import styled from 'styled-components';

// Mobile: image + details with controls underneath. Desktop: one row aligned with the column headers.
export const RowGrid = styled.li`
  display: grid;
  grid-template-columns: 72px 1fr;
  grid-template-areas:
    'image info'
    'image unit'
    'qty total';
  gap: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md};
  border-block-end: 1px solid ${({ theme }) => theme.colors.border};

  &:last-child {
    border-block-end: 0;
  }

  ${({ theme }) => theme.media.desktop} {
    grid-template-columns: 72px 1fr 120px 140px 120px;
    grid-template-areas: 'image info unit qty total';
  }
`;

export const Thumb = styled.div`
  grid-area: image;
  position: relative;
  width: 72px;
  height: 72px;
  border-radius: ${({ theme }) => theme.radius.sm};
  background: #fff;

  img {
    object-fit: contain;
    padding: 6px;
  }
`;

export const Info = styled.div`
  grid-area: info;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.sm};
  min-width: 0;
`;

export const Title = styled.h2`
  display: -webkit-box;
  overflow: hidden;
  font-size: 15px;
  font-weight: 600;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
`;

export const RemoveButton = styled.button`
  flex-shrink: 0;
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  border: 0;
  border-radius: ${({ theme }) => theme.radius.sm};
  background: transparent;
  color: ${({ theme }) => theme.colors.textMuted};
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.danger};
    background: ${({ theme }) => theme.colors.surfaceMuted};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
  }
`;

export const Unit = styled.p`
  grid-area: unit;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const Qty = styled.div`
  grid-area: qty;
`;

export const Total = styled.p`
  grid-area: total;
  font-weight: 800;
  text-align: end;
`;

export const MobileLabel = styled.span`
  ${({ theme }) => theme.media.desktop} {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip-path: inset(50%);
  }
`;

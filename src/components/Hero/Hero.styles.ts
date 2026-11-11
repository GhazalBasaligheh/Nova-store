import Image from 'next/image';
import styled from 'styled-components';
import { Link } from '@/i18n/navigation';

export const Wrapper = styled.section`
  padding-block: ${({ theme }) => theme.spacing.xl};

  ${({ theme }) => theme.media.desktop} {
    padding-block: ${({ theme }) => theme.spacing.xxl};
  }
`;

export const Panel = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.xl};
  align-items: center;
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.colors.surfaceMuted};

  /* Two columns from tablet up, so the artwork never stacks as a tall block above the products. */
  ${({ theme }) => theme.media.tablet} {
    grid-template-columns: 1.4fr 1fr;
  }

  ${({ theme }) => theme.media.desktop} {
    grid-template-columns: 1.2fr 1fr;
    padding: ${({ theme }) => theme.spacing.xxl};
  }
`;

export const Copy = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.md};
  justify-items: start;
`;

export const Eyebrow = styled.p`
  color: ${({ theme }) => theme.colors.accent};
  font-weight: 700;
`;

export const Title = styled.h1`
  font-size: 30px;
  line-height: 1.3;

  ${({ theme }) => theme.media.desktop} {
    font-size: 44px;
  }
`;

export const Subtitle = styled.p`
  max-width: 48ch;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 17px;
`;

export const Cta = styled(Link)`
  display: inline-flex;
  align-items: center;
  min-height: 48px;
  padding-inline: ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.onAccent};
  font-weight: 700;

  &:hover {
    background: ${({ theme }) => theme.colors.accentHover};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 3px;
  }
`;

// Decorative photo: object-position keeps the crop above the watermark in the corner.
export const Art = styled.div`
  display: none;
  position: relative;
  overflow: hidden;
  aspect-ratio: 4 / 3;
  border-radius: ${({ theme }) => theme.radius.lg};

  ${({ theme }) => theme.media.tablet} {
    display: block;
  }
`;

export const Photo = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 78%;
`;

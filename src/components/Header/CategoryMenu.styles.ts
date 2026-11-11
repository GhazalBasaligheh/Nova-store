import styled from 'styled-components';

// Native <details> disclosure: keyboard- and screen-reader-friendly with no extra JS.
export const Details = styled.details`
  position: relative;

  summary {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: ${({ theme }) => theme.spacing.sm};
    border-radius: ${({ theme }) => theme.radius.sm};
    font-weight: 500;
    list-style: none;
    cursor: pointer;
  }

  summary::-webkit-details-marker {
    display: none;
  }

  summary:hover {
    background: rgb(255 255 255 / 10%);
  }

  &[open] summary svg {
    rotate: 180deg;
  }

  ul {
    display: grid;
    padding-inline-start: ${({ theme }) => theme.spacing.md};
    list-style: none;
  }

  ${({ theme }) => theme.media.desktop} {
    ul {
      position: absolute;
      inset-inline-start: 0;
      top: calc(100% + 4px);
      min-width: 200px;
      padding: ${({ theme }) => theme.spacing.xs};
      border-radius: ${({ theme }) => theme.radius.md};
      background: ${({ theme }) => theme.colors.surface};
      color: ${({ theme }) => theme.colors.text};
      box-shadow: ${({ theme }) => theme.shadow.card};
    }

    ul a:hover {
      background: ${({ theme }) => theme.colors.surfaceMuted};
    }
  }
`;

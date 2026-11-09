'use client';

import { useTranslations } from 'next-intl';
import { MoonIcon, SunIcon } from '@/assets/Icons';
import { useTheme } from '@/context/ThemeContext';
import { IconButton } from '@/shared/Button';
import { Theme } from '@/types/enums/Theme';

export function ThemeToggle() {
  const t = useTranslations('Header');
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === Theme.Light;

  return (
    <IconButton
      type="button"
      onClick={toggleTheme}
      aria-label={isLight ? t('switchToDark') : t('switchToLight')}
    >
      {isLight ? <MoonIcon /> : <SunIcon />}
    </IconButton>
  );
}

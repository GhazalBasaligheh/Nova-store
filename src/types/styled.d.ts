import 'styled-components';
import type { AppTheme } from '@/context/theme/tokens';

// Types `props.theme` in every styled component.
declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface DefaultTheme extends AppTheme {}
}

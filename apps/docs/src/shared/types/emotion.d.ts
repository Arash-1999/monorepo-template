import 'react';
import '@emotion/react';
import { createTheme } from '@/shared/utils/create-theme';

declare module 'react' {
    interface CSSProperties {
        [key: `--${string}`]: string | number
    }
}

declare module '@emotion/react' {
    interface Theme extends ReturnType<typeof createTheme> {}
}

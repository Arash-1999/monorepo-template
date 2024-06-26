# Internationalization (i18n)

### Usage

1. add nextIntl configs to `next.config.js`

```javascript
const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@repo/ui"],
};

module.exports = withNextIntl(nextConfig);
```

2. create `middleware.ts` in your project root

```typescript
import createMiddleware from 'next-intl/middleware';
 
export default createMiddleware({
  // A list of all locales that are supported
  locales: ["en", "fa", ],
 
  // Used when no locale matches
  defaultLocale: "en",
});
 
export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(en|fa)/:path*"]
};
```

3. create `i18n.ts` file in your project root or src directory

next-intl support out of the box. otherwise you should config `i18n.ts` path in `next.config.js`

```typescript
import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';
 
// Loads the Application Locales/Translations Dynamically
const loadLocaleDictionary = async (locale: string) => {
  switch (locale) {
    case "en":
      return import("@repo/i18n/en").then(f => f.default);
    case "fa":
      return import("@repo/i18n/fa").then(f => f.default);
    default:
      notFound();
  }
};

// Provides `next-intl` configuration for RSC/SSR
export default getRequestConfig(async ({ locale }) => ({
  // This is the dictionary of messages to be loaded
  messages: await loadLocaleDictionary(locale),
  // We always define the App timezone as UTC
  timeZone: 'Etc/UTC',
}));
```

4. move your entire app to `[locale]`

5. create react context to provide you locale(or direction) to your app

### Add type definition

create `types.d.ts` in your package root and add this file to your `tsconfig.json` include section.

```typescript
import en from "@core/i18n/en"; 
 
type Messages = typeof en;
 
declare global {
  // Use type safe message keys with `next-intl`
  interface IntlMessages extends Messages {}
}
```
you can read more about how it works in typescript module augmentation.

### Client components

for accessing to your translation in client components you can use `NextIntlClientProvider` to provide messages.

recommended message structure:
  - separate pages (e.g. /about)
  - separate group of pages in layout (e.g. /dashboard/)
  - core translations for entire app

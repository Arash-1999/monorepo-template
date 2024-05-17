import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';
 
// Loads the Application Locales/Translations Dynamically
const loadLocaleDictionary = async (locale: string) => {
  switch (locale) {
    case "en":
      return import("@core/i18n/en").then(f => f.default);
    case "fa":
      return import("@core/i18n/fa").then(f => f.default);
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

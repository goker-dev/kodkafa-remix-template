export default {
  // This is the list of languages your application supports
  supportedLngs: ["en", "tr"],
  // This is the language you want to use in case
  // if the user language is not in the supportedLngs
  fallbackLng: "en",
  // The default namespace of i18next is "translation", but you can customize it here
  defaultNS: "translation",
  react: { useSuspense: false }, // Disabling suspense is recommended
  debug: true,
  // detection: {
  //   lookupQuerystring: "lng",
  //   caches: ["localStorage", "cookie"],
  // },
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
  returnNull: false,
};

import defaultSettings from "../../common/default-settings";

export const transformSettings = (customQuestionSettings, currentLanguage) => {
  const settings = customQuestionSettings || defaultSettings;
  let { playerType, link, styles, perLanguageSettings } = settings;

  const usePerLanguageOverrides =
    Object.keys(settings.perLanguageSettings).length > 0;
  if (usePerLanguageOverrides) {
    const override = perLanguageSettings[currentLanguage];
    if (override) {
      link = override.link;
    }
  }

  return { playerType, link, styles };
};

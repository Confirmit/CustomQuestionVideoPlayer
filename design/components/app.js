import React, { useEffect, useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";

import Form from "./form";
import defaultSettings from "../../common/default-settings";

const App = () => {
  const [currentSettings, setCurrentSettings] = useState();
  const [uiSettings, setUiSettings] = useState();
  const [readOnly, setReadOnly] = useState(false);
  const [languages, setLanguages] = useState([]);
  const [currentLanguage, setCurrentLanguage] = useState({
    id: 9,
    name: "English",
  });

  useEffect(() => {
    window.customQuestion.onInit = (
      settings,
      uiSettings,
      questionSettings,
      projectSettings
    ) => {
      console.debug(
        "onInit",
        settings,
        uiSettings,
        questionSettings,
        projectSettings
      );
      setCurrentSettings(settings || defaultSettings);
      setLanguages(projectSettings.languages);
      setUiSettings(uiSettings);
    };

    window.customQuestion.onSettingsReceived = (settings, uiSettings) => {
      console.debug("onSettingsReceived", settings, uiSettings);
      // skip settings update as we don't want to react on its changes in this CQ
      setUiSettings(uiSettings);
    };
  }, []);

  useEffect(() => {
    if (!uiSettings) return;

    setReadOnly(uiSettings.readOnly);

    const lang = languages.find((l) => l.id === uiSettings.currentLanguage);
    if (lang) setCurrentLanguage(lang);
  }, [uiSettings, languages]);

  const saveChanges = (settings, hasError) => {
    console.debug("saveChanges", settings);
    setCurrentSettings(settings);
    window.customQuestion.saveChanges(settings, hasError);
  };

  return (
    <div className="container">
      <CssBaseline />
      {currentSettings && (
        <Form
          settings={currentSettings}
          readOnly={readOnly}
          currentLanguage={currentLanguage}
          saveChanges={saveChanges}
        />
      )}
    </div>
  );
};

export default App;

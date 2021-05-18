import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import { playerTypes } from "../../common/constants";
import UrlTextField from "./url-text-field";
import TextField from "./text-field";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

const Form = ({ settings, readOnly, currentLanguage, saveChanges }) => {
  const [useLangSpecific, setUseLangSpecific] = useState(false);
  const [playerType, setPlayerType] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    setUseLangSpecific(Object.keys(settings.perLanguageSettings).length > 0);
    setPlayerType(settings.playerType);
  }, [settings]);

  useEffect(() => {
    if (useLangSpecific) {
      setLink(settings.perLanguageSettings[currentLanguage.id]?.link || "");
    } else {
      setLink(settings.link || "");
    }
  }, [settings, currentLanguage, useLangSpecific]);

  const saveLinkChanges = (useLangSpecific, link) => {
    if (useLangSpecific) {
      saveChanges({
        ...settings,
        perLanguageSettings: {
          ...settings.perLanguageSettings,
          [currentLanguage.id]: { link },
        },
      });
    } else saveChanges({ ...settings, link, perLanguageSettings: {} });
  };

  const handleLinkChange = (link) => {
    setLink(link);
    saveLinkChanges(useLangSpecific, link);
  };

  const handleVideoTypeChange = (e) => {
    const { value } = e.target;
    setPlayerType(value);
    saveChanges({ ...settings, playerType: value });
  };

  const handleWidthChange = (width) =>
    saveChanges({ ...settings, styles: { ...settings.styles, width } });

  const handleHeightChange = (height) =>
    saveChanges({ ...settings, styles: { ...settings.styles, height } });

  const handleLanguageCheckbox = (e) => {
    const { checked } = e.target;
    setUseLangSpecific(checked);
    saveLinkChanges(checked, link);
  };

  const langSpecificPrefix = useLangSpecific
    ? ` in ${currentLanguage.name}`
    : "";

  return (
    <div className="form">
      <h3 className="form__top-header">
        Video player settings {langSpecificPrefix}
      </h3>
      <div className="form-row">
        <Select
          id="playerType"
          className="form-row__input"
          disabled={readOnly}
          value={playerType}
          onChange={handleVideoTypeChange}
        >
          <MenuItem value={playerTypes.simple}>Simple HTML5 player</MenuItem>
          <MenuItem value={playerTypes.youtube}>Youtube video player</MenuItem>
        </Select>
      </div>
      <div className="form-row">
        <UrlTextField
          id="link"
          label={
            playerType === playerTypes.youtube
              ? "Youtube video URL" + langSpecificPrefix
              : "Video URL" + langSpecificPrefix
          }
          readOnly={readOnly}
          className="form-row__input--wide"
          value={link}
          onChange={handleLinkChange}
        />
        <div>
          <FormControlLabel
            control={
              <Checkbox
                id="cbLang"
                checked={useLangSpecific}
                onChange={handleLanguageCheckbox}
              />
            }
            label="Use language specific links"
          />
        </div>
      </div>
      <div>
        <h3>Additional styles</h3>
        <div className="form-row">
          <TextField
            id="width"
            label="Player width (CSS)"
            readOnly={readOnly}
            className="form-row__input"
            value={settings.styles.width}
            onChange={handleWidthChange}
          />
        </div>
        <div className="form-row">
          <TextField
            id="height"
            label="Player height (CSS)"
            readOnly={readOnly}
            className="form-row__input"
            value={settings.styles.height}
            onChange={handleHeightChange}
          />
        </div>
      </div>
    </div>
  );
};

Form.propTypes = {
  settings: PropTypes.object.isRequired,
  readOnly: PropTypes.bool.isRequired,
  currentLanguage: PropTypes.object.isRequired,
  saveChanges: PropTypes.func.isRequired,
};

export default Form;

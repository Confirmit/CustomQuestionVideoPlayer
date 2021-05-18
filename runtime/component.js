import { playerTypes } from "../common/constants";
import YoutubeVideoPlayerView from "./players/youtube-player";
import SimpleVideoPlayerView from "./players/simple-video-player";
import ShowError from "./utils/show-error";
import { transformSettings } from "./utils/settings-transformer";
import { appendDivWithContent } from "./utils/html-utils";
import "./loader.css";

export default (question, customQuestionSettings, questionViewSettings) => {
  console.debug(customQuestionSettings);
  const { playerType, link, styles } = transformSettings(
    customQuestionSettings,
    Confirmit.page.surveyInfo.language
  );

  if (!link) {
    ShowError(question.id, "Video player require non-empty link value");
    return;
  }

  const container = document.getElementById(question.id);
  appendDivWithContent(
    container,
    `<div>
    <div class="cf-question__text" id="${question.id}_text">${question.text}</div>
    <div class="videoplayer"></div>
  </div>`
  );

  const playerContainer = container.getElementsByClassName("videoplayer")[0];

  if (playerType === playerTypes.youtube) {
    return YoutubeVideoPlayerView(playerContainer, link, styles);
  }

  return SimpleVideoPlayerView(playerContainer, link, styles);
};

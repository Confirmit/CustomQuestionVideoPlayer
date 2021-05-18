import { appendDivWithContent } from "./html-utils";

const ShowError = (qid, error) => {
  const html = `
<div class="cf-question__error cf-error-block cf-error-block--bottom" id="${qid}_error" role="alert" aria-labelledby="${qid}_error_list">
    <ul class="cf-error-list" id="${qid}_error_list">
        <li>${error}</li>
    </ul>
</div>
  `;

  const container = document.getElementById(qid);
  appendDivWithContent(container, html);
};

export default ShowError;

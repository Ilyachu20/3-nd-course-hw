import { initLikes } from "../handlers/initLikes.js";
import { initReply } from "../handlers/initReply.js";
import { sanitize } from "../utils/sanitize.js";

export const renderComments = (commentsData, textInput, comments) => {
  comments.innerHTML = "";

  commentsData.forEach((comment, index) => {
    const likeClass = comment.isLiked ? "-active-like" : "";

    const commentHTML = `
      <li class="comment">
        <div class="comment-header">
          <div>${sanitize(comment.name)}</div>
          <div>${sanitize(comment.date)}</div>
        </div>

        <div class="comment-body">
          <div class="comment-text">
            ${sanitize(comment.text)}
          </div>
        </div>

        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter">
              ${comment.likes}
            </span>

            <button
              class="like-button ${likeClass}"
              data-index="${index}"
            ></button>
          </div>
        </div>
      </li>
    `;

    comments.innerHTML += commentHTML;
  });

  initLikes(commentsData, () =>
    renderComments(commentsData, textInput, comments),
  );

  initReply(commentsData, textInput);
};

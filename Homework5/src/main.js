import { addComment, getComments } from "./api/commentsApi.js";
import { renderComments } from "./render/renderComments.js";
import { sanitize } from "./utils/sanitize.js";

document.addEventListener("DOMContentLoaded", async () => {
  const nameInput = document.querySelector(".add-form-name");
  const textInput = document.querySelector(".add-form-text");
  const button = document.querySelector(".add-form-button");
  const comments = document.querySelector(".comments");

  let commentsData = [];

  const render = () => {
    renderComments(commentsData, textInput, comments);
  };

  try {
    commentsData = await getComments();
    render();
  } catch (error) {
    console.error(error);
    alert("Не удалось загрузить комментарии");
  }

  button.addEventListener("click", async () => {
    if (nameInput.value.trim() === "" || textInput.value.trim() === "") {
      alert("Заполните пункт 'Имя' и добавьте комментарий");
      return;
    }

    button.disabled = true;

    try {
      await addComment(
        sanitize(nameInput.value),
        sanitize(textInput.value),
      );

      commentsData = await getComments();
      render();

      nameInput.value = "";
      textInput.value = "";
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      button.disabled = false;
    }
  });
});

export const initLikes = (commentsData, renderComments) => {
  const likeButtons = document.querySelectorAll(".like-button");

  likeButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();

      const index = button.dataset.index;

      if (commentsData[index].isLiked) {
        commentsData[index].likes--;
        commentsData[index].isLiked = false;
      } else {
        commentsData[index].likes++;
        commentsData[index].isLiked = true;
      }

      renderComments();
    });
  });
};

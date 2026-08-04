export const initReply = (commentsData, textInput) => {
  const commentElements = document.querySelectorAll(".comment");

  commentElements.forEach((commentElement, index) => {
    commentElement.addEventListener("click", () => {
      const comment = commentsData[index];

      textInput.value = `> ${comment.name}: ${comment.text}
`;
    });
  });
};

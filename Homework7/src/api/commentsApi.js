const personalKey = "ilya-chu";

const API_URL = `https://wedev-api.sky.pro/api/v1/${personalKey}/comments`;

const createHttpError = (status, message) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

export const getComments = async () => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw createHttpError(
      response.status,
      "Не удалось загрузить комментарии",
    );
  }

  const data = await response.json();

  return data.comments.map((comment) => ({
    id: comment.id,
    name: comment.author.name,
    date: new Date(comment.date).toLocaleString(),
    text: comment.text,
    likes: comment.likes,
    isLiked: comment.isLiked,
  }));
};

export const addComment = async (name, text) => {
  const response = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({
      name,
      text,
    }),
  });

  let data = {};

  try {
    data = await response.json();
  } catch (error) {
    // У некоторых ответов сервера может не быть JSON-тела.
  }

  if (!response.ok) {
    throw createHttpError(
      response.status,
      data.error || "Не удалось добавить комментарий",
    );
  }

  return data;
};

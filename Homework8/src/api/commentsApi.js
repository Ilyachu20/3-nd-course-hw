const personalKey = "ilya-chu";
const API_URL = `https://wedev-api.sky.pro/api/v2/${personalKey}`;

const createHttpError = (status, message) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

export const getComments = async () => {
  const response = await fetch(`${API_URL}/comments`);
  if (!response.ok) {
    throw createHttpError(response.status, "Не удалось загрузить комментарии");
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

export const addComment = async (text, token) => {
  const response = await fetch(`${API_URL}/comments`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ text }),
  });

  let data = {};
  try {
    data = await response.json();
  } catch (error) {}

  if (!response.ok) {
    throw createHttpError(response.status, data.error || "Не удалось добавить комментарий");
  }
  return data;
};

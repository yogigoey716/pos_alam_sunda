export const setToken = (token: string) => {
  localStorage.setItem("JWT", token);
};

export const getToken = () => {
  return localStorage.getItem("JWT");
};

export const clearToken = () => {
  localStorage.removeItem("JWT");
};
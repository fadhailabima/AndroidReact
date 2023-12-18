export const setUser = (userData) => {
  return {
    type: "SET_USER",
    payload: userData,
  };
};

export const setToken = (tokenData) => {
  return {
    type: "SET_TOKEN",
    payload: tokenData,
  };
};

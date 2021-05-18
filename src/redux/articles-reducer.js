const reducer = (state = { articles: {}, articlesCount: 0 }, action) => {
  if (action.type === "FETCH-NO-INIT-ARTICLES") {
    return action.articles;
  }
  return state;
};

export default reducer;

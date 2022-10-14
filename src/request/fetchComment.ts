import api, { route } from "@forge/api";

export const fetchCommentsFromContent = async (contentId) => {
  const res = await api
    .asUser()
    .requestConfluence(
      route`/wiki/rest/api/content/${contentId}/child/comment`
    );
  const data = await res.json();

  return data.results;
};

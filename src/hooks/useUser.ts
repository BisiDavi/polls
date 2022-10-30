import api, { route } from "@forge/api";
import { useProductContext } from "@forge/ui";

export default function useUser() {
  const context = useProductContext();

  async function getUserDetails() {
    const response = await api
      .asApp()
      .requestConfluence(
        route`/wiki/rest/api/user/current`
      );
    return await response.json();
  }

  async function readContentProperties(id: string) {
    const response = await api
      .asApp()
      .requestConfluence(route`/wiki/rest/api/content/${id}/property`, {
        headers: {
          Accept: "application/json",
        },
      });
    return await response.json();
  } 

  return { getUserDetails, readContentProperties, context };
}

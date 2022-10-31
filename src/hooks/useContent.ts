import api, { route } from "@forge/api";

export default function useContent() {
  async function getContentDetails(routeId: string) {
    return await api.asApp().requestConfluence(route`${routeId}`, {
      headers: {
        Accept: "application/json",
      },
    });
  }

  

  return { getContentDetails };
}

import api, { route } from "@forge/api";
import { useProductContext } from "@forge/ui";

export default function useUser() {
  const context = useProductContext();

  async function getUserDetails() {
    const response = await api
      .asApp()
      .requestConfluence(route`/wiki/rest/api/user/current`);

    const result = await response.json();
    console.log("user-result ", result);

    return result;
  }
  return { getUserDetails, context };
}

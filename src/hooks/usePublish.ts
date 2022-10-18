import api, { storage } from "@forge/api";

export default function usePublish() {
  function savePollData(key: string, data) {
    storage.set(key, data);
  }
  return { savePollData };
}

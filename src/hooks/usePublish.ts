import api, { storage } from "@forge/api";

export default function usePublish() {
  function savePollData(key: string, data) {
    return storage.set(key, data);
  }
  return { savePollData };
}

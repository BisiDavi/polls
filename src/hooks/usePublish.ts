import { startsWith, storage } from "@forge/api";

export default function usePublish() {
  function savePollData(key: string, data) {
    return storage.set(key, data);
  }

  async function getSavedPolls() {
    return await storage.query().where("key", startsWith("Polls")).getMany();
  }

  async function deletePoll(storageKey: string) {
    return await storage.delete(storageKey);
  }

  return { savePollData, getSavedPolls, deletePoll };
}

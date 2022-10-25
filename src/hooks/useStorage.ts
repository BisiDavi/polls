import { startsWith, storage } from "@forge/api";

export default function useStorage() {
  function saveData(key: string, data) {
    return storage.set(key, data);
  }

  async function getDataFromStorage(dataKey: string) {
    return await storage.query().where("key", startsWith(dataKey)).getMany();
  }

  async function deleteStorage(storageKey: string) {
    return await storage.delete(storageKey);
  }

  return { saveData, getDataFromStorage, deleteStorage };
}

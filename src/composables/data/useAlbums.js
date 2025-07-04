import { ref } from "vue";
import { TagService, TagModel } from "@/services/data/tag";
import { AlbumModel, AlbumService } from "@/services/data/album";

/**
 * 使用相簿資料。
 * @returns {Promise<{albums: import('vue').Ref<AlbumRecord[]>}>} 回傳以 ref 包裝的響應式相簿資料。
 */
export async function useAlbums() {
  const albums = ref([]);

  await Promise.all([TagService.fetchTags(), AlbumService.fetchAlbums()]).then((resList) => {
    const tagModel = new TagModel(resList[0]);
    albums.value = new AlbumModel(resList[1], tagModel).datas;
  });

  return { albums };
}

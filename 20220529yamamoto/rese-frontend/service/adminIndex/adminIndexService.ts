import { newShop, sendData, shop, user } from "~/types/api";
import adminIndexServiceInterface from "./adminIndexServiceInterface";
import shopRepositoryInterface from "~/repository/shop/shopRepositoryInterface";
import { NuxtAppOptions } from "@nuxt/types";
import { adminIndexInitData } from "~/types/pageData";

export default class adminIndexService implements adminIndexServiceInterface {
  readonly shopRepository: shopRepositoryInterface;

  constructor(shopRepository: shopRepositoryInterface) {
    this.shopRepository = shopRepository;
  }

  async getData({ $accessor }: NuxtAppOptions): Promise<adminIndexInitData> {
    const representative = $accessor.user as user;
    try {
      const shops = await this.shopRepository.getByRepresentativeId(representative.id);
      return {
        shops: shops ?? [],
        newShop: {
          name: '',
          description: '',
          region_id: 0,
          genre_id: 0, 
        },
      } 
    } catch (error: any) {
      throw error;
    }
  };

  async registerShop(data: newShop): Promise<shop[]> {
      /* 入力値から送信用データを作成 */
      const sendData: sendData = {
        name: data.name,
        representative_id: data.representative_id,
        description: data.description,
        region_id: data.region_id,
        genre_id: data.genre_id,
        base64EncodedImage: data.base64EncodedImage,
      };
      
      try {
        /* 新規店舗登録処理 */
        await this.shopRepository.register(sendData);
        alert('新規店舗が登録されました。');
        return await this.shopRepository.getByRepresentativeId(data.representative_id as number);
      } catch (error: any) {
        throw error;
      }
  }
}
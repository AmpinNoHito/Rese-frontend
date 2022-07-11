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
    const representative = $accessor.user;
    const res = await this.shopRepository.getByRepresentativeId(representative.id)
      .catch(error => {
        throw error;
      });

    return {
      shops: res.data.data.shops ?? [],
      newShop: {
        representative_id: representative.id,
        name: '',
        description: '',
        region_id: 0,
        genre_id: 0, 
      },
    }
  };

  async registerShop(data: newShop): Promise<shop[]> {
    /* 入力値から送信用データを作成 */
    const sendData: sendData = {
      name: data.name,
      representative_id: data.representative_id,
      description: data.description,
      base64EncodedImage: data.base64EncodedImage,
      region_id: data.region_id,
      genre_id: data.genre_id,
    };
    
    /* 新規店舗登録処理 */
    await this.shopRepository.register(sendData)
      .catch(error => {
        throw error;
      });
    alert('新規店舗が登録されました。');

    /* 店舗一覧を再取得 */
    const res = await this.shopRepository.getByRepresentativeId(data.representative_id as number)
      .catch(error => {
        throw error;
      });
    data.name = data.description = data.base64EncodedImage = '';
    data.region_id = data.genre_id = 0;
    return res.data.data.shops
  }
}
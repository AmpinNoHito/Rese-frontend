import { newShop, shop } from "~/types/api";
import adminIndexServiceInterface from "./adminIndexServiceInterface";
import shopRepositoryInterface from "~/repository/shop/shopRepositoryInterface";
import { NuxtAppOptions } from "@nuxt/types";
import { adminIndexInitData } from "~/types/pageData";
import { shopRequest } from "~/types/axiosRequest";

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

  async registerShop(sendData: newShop): Promise<shop[]> {
    /* 新規店舗登録処理 */
    await this.shopRepository.register(sendData)
      .catch(error => {
        throw error;
      });
    alert('新規店舗が登録されました。');

    /* 店舗一覧を再取得 */
    const res = await this.shopRepository.getByRepresentativeId(sendData.representative_id as number)
      .catch(error => {
        throw error;
      });
    sendData.name = sendData.description = sendData.base64EncodedImage = '';
    sendData.region_id = sendData.genre_id = 0;
    return res.data.data.shops
  }
}
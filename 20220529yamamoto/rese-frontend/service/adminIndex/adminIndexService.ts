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
    return await Promise.resolve(this.shopRepository.getByRepresentativeId(representative.id))
      .then(res => {
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
      })
      .catch(error => {
        throw error;
      });
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
      
      /* 新規店舗登録処理 */
      await Promise.resolve(this.shopRepository.register(sendData))
        .then(res => alert('新規店舗が登録されました。'))
        .catch(error => {
          throw error;
        });

      /* 店舗一覧を再取得 */
      return await Promise.resolve(this.shopRepository.getByRepresentativeId(data.representative_id as number))
        .then(res => res.data.data.shops)
        .catch(error => {
          throw error;
        });
  }
}
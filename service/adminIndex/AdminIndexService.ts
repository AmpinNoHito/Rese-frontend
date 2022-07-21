import { NewShop, Shop } from "~/types/api";
import AdminIndexServiceInterface from "./AdminIndexServiceInterface";
import ShopRepositoryInterface from "~/repository/shop/ShopRepositoryInterface";
import { AdminIndexInitData } from "~/types/pageData";

export default class AdminIndexService implements AdminIndexServiceInterface {
  readonly shopRepository: ShopRepositoryInterface;

  constructor(shopRepository: ShopRepositoryInterface) {
    this.shopRepository = shopRepository;
  }

  async getData(representativeId: number): Promise<AdminIndexInitData> {
    const res = await this.shopRepository.getByRepresentativeId(representativeId)
      .catch(error => {
        throw error;
      });

    return {
      shops: res.data.data.shops,
      newShop: {
        representative_id: representativeId,
        name: '',
        description: '',
        region_id: 0,
        genre_id: 0, 
      },
    }
  };

  async registerShop(sendData: NewShop): Promise<Shop[]> {
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
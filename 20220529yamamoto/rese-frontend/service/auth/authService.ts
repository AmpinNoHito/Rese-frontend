import userRepositoryInterface from "~/repository/user/userRepositoryInterface";
import { sendData, user } from "~/types/api";
import authServiceInterface from "./authServiceInterface";
import { RawLocation } from 'vue-router';
import { Dictionary } from 'vue-router/types/router'; 

export default class authService implements authServiceInterface {
  readonly userRepository: userRepositoryInterface;
  
  constructor (userRepository: userRepositoryInterface) {
    this.userRepository = userRepository;
  }
  
  async register(form: sendData): Promise<void> {
    try {
      await this.userRepository.register(form);
    } catch (error: any) {
      throw error;
    }
  }

  async registerRepresentative(form: sendData): Promise<sendData> {
    try {
      await this.userRepository.registerRepresentative(form);
      alert('新規店舗代表者が登録されました。\nアドレス検証用のメールをご確認いただくよう、代表者にお伝えください。');
      Object.keys(form).forEach(key => form[key] = '');
      return form;
    } catch (error: any) {
      throw error;
    }
  }

  async login(form: sendData, query: Dictionary<string | (string | null)[]>): Promise<[string, user, RawLocation]> {
    try {
      /* ログイン処理 */
      const [token, user]: [string, user] = await this.userRepository.login(form);
      /** 予約画面から遷移してきた場合は予約画面に戻る 
       *  入力情報を復元できるようにクエリパラメータを渡す
       */
      let location: RawLocation;
      if (Object.keys(query).length) {
        location = {
          path: `/shops/${query.sh}`,
          query: {
            dt: query.dt, // 日付(date)
            tm: query.tm, // 時間(time)
            nm: query.nm, // 人数(number)
            sc: query.sc, // コース(selected course)
          }
        };
      } else {
        location = '/';
      }
      
      return [token, user, location];
    } catch (error: any) {
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      await this.userRepository.logout();
      alert('ログアウトしました。');
    } catch (error: any) {
      throw error;
    }
  }
}
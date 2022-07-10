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
    await this.userRepository.register(form)
      .catch(error => {
        throw error;
      });
  }

  async registerRepresentative(form: sendData): Promise<sendData> {
    await this.userRepository.registerRepresentative(form)
      .catch(error => {
        throw error;
      });

    alert('新規店舗代表者が登録されました。\nアドレス検証用のメールをご確認いただくよう、代表者にお伝えください。');
    Object.keys(form).forEach(key => form[key] = '');  // フォームを初期化
    return form;
  }

  async login(form: sendData, query: Dictionary<string | (string | null)[]>): Promise<[string, user, RawLocation]> {
    /* ログイン、トークン取得 */
    const tokenRes = await this.userRepository.login(form)
      .catch(error => {
        throw error;
      });
    const token = tokenRes.data.token;
    
    /* ユーザー情報を取得し、画面遷移 */
    const userRes = await this.userRepository.getUser(token);
    const user = userRes.data.user;

    if (Object.keys(query).length) {  // 予約画面から遷移してきた場合 
      const path = {
        path: `/shops/${query.sh}`,
        query: {  //  入力情報を復元できるようにクエリパラメータを渡す
          dt: query.dt, // 日付(date)
          tm: query.tm, // 時間(time)
          nm: query.nm, // 人数(number)
          sc: query.sc, // コース(selected course)
        }
      };
      return [token, user, path];
    } else {
      const path = '/';
      return [token, user, path];
    }
  }

  async logout(): Promise<void> {
    await this.userRepository.logout()
      .catch(error => {
        throw error;
      });
    alert('ログアウトしました。');
  }
}
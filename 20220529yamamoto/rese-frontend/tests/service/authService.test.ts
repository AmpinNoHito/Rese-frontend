import { NuxtAxiosInstance } from "@nuxtjs/axios";
import axios from "axios";
import userRepository from "~/repository/user/userRepository";
import userRepositoryInterface from "~/repository/user/userRepositoryInterface";
import authService from "~/service/auth/authService";
import authServiceInterface from "~/service/auth/authServiceInterface";
import { authRequest } from "~/types/axiosRequest";
import { USER, USER_RESPONSE } from "../consts";

/* favoriteRepositoryのインスタンスを作成、必要なメソッドをモック化 */
const userRepositoryInstance: userRepositoryInterface = new userRepository(axios as NuxtAxiosInstance);
const mockRegister = jest.spyOn(userRepositoryInstance, 'register')
  .mockImplementation((sendData: authRequest) => Promise.resolve());
const mockRegisterRepresentative = jest.spyOn(userRepositoryInstance, 'registerRepresentative')
  .mockImplementation((sendData: authRequest) => Promise.resolve());
const mockLogin = jest.spyOn(userRepositoryInstance, 'login')
  .mockImplementation((sendData: authRequest) => Promise.resolve({data: {token: 'token'}}));
const mockLogout = jest.spyOn(userRepositoryInstance, 'logout')
  .mockImplementation(() => Promise.resolve());
const mockGetUser = jest.spyOn(userRepositoryInstance, 'getUser')
  .mockImplementation((token: (string | undefined)) => Promise.resolve(USER_RESPONSE));

/* window.alertをモック化 */
const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});

/* テスト用のauthServiceインスタンスを作成 */
const testingAuthService: authServiceInterface = new authService(userRepositoryInstance);

describe('test register', () => {
  const form = {
    name: 'test',
    email: 'test@ex.com',
    password: 'password',
  };

  test('register normal user', async () => {
    const res = await testingAuthService.register(form);
    
    expect(mockRegister).toBeCalledWith(form);
    expect(res).toBeUndefined();
  });

  test('register representative', async () => {
    const res = await testingAuthService.registerRepresentative(form);

    expect(mockRegisterRepresentative).toBeCalledWith(form);
    expect(mockAlert).toBeCalledWith('新規店舗代表者が登録されました。\nアドレス検証用のメールをご確認いただくよう、代表者にお伝えください。');
    expect(res).toEqual({
      name: '',
      email: '',
      password: '',
    });
  });
});

describe('test login', () => {
  const form = {
    email: 'test@ex.com',
    password: 'password',
  }

  test('login without query params', async () => {
    const query = {};
    const res = await testingAuthService.login(form, query);

    expect(mockLogin).toBeCalledWith(form);
    expect(mockGetUser).toBeCalledWith('token');
    expect(res).toEqual(['token', USER, {path: '/'}]);
  });

  test('login with query params', async () => {
    const query = {
      sh: '100',
      dt: '2023-01-01',
      tm: '10:00',
      nm: '1人',
      sc: '0',
    };
    const res = await testingAuthService.login(form, query);

    expect(mockLogin).toBeCalledWith(form);
    expect(mockGetUser).toBeCalledWith('token');
    expect(res).toEqual(['token', USER, {
      path: '/shops/100',
      query: {
        dt: '2023-01-01',
        tm: '10:00',
        nm: '1人',
        sc: '0',
      },
    }]);
  });
});

test('test logout', async () => {
  const res = await testingAuthService.logout();

  expect(mockLogout).toBeCalled();
  expect(mockAlert).toBeCalledWith('ログアウトしました。');
  expect(res).toBeUndefined();
});
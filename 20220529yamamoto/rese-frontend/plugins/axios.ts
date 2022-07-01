import { Context } from '@nuxt/types';
import { AxiosRequestConfig} from 'axios';

export default function({ $axios, app: { $accessor } }: Context): void {
  $axios.onRequest((config: AxiosRequestConfig): void => {
    const token: (string | undefined) = $accessor.token;
    if (token) {
      config.headers['Authorization'] = token;
    }
  });
}
import { Context } from '@nuxt/types';
import { AxiosRequestConfig} from 'axios';

export default function({ $axios, app: { $accessor } }: Context): void {
  $axios.onRequest((config: AxiosRequestConfig): void => {
    if ($accessor.token) {
      config.headers['Authorization'] = $accessor.token;
    }
  });
}
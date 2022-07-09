import { Plugin } from '@nuxt/types';
import { Context, Inject } from '@nuxt/types/app';
import { region, genre } from '~/types/api';

declare module 'vue/types/vue' {
  interface Vue {
    $REGIONS: {
      id: number,
      name: string,
    }[],
    $GENRES: {
      id: number,
      name: string,
    }[],
    $TIMES: string[],
    $NUMBERS: string[],
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $REGIONS: {
      id: number,
      name: string,
    }[],
    $GENRES: {
      id: number,
      name: string,
    }[],
    $TIMES: string[],
    $NUMBERS: string[],
  }
}

declare module 'vuex/types/index' {
  interface Store<S> {
    $REGIONS: {
      id: number,
      name: string,
    }[],
    $GENRES: {
      id: number,
      name: string,
    }[],
    $TIMES: string[],
    $NUMBERS: string[],
  }
}

const globalConsts: Plugin = async(context: Context, inject: Inject) => {
  const regionNames = [
    '北海道',
    '青森県',
    '岩手県',
    '宮城県',
    '秋田県',
    '山形県',
    '福島県',
    '茨城県',
    '栃木県',
    '群馬県',
    '埼玉県',
    '千葉県',
    '東京都',
    '神奈川県',
    '新潟県',
    '富山県',
    '石川県',
    '福井県',
    '山梨県',
    '長野県',
    '岐阜県',
    '静岡県',
    '愛知県',
    '三重県',
    '滋賀県',
    '京都府',
    '大阪府',
    '兵庫県',
    '奈良県',
    '和歌山県',
    '鳥取県',
    '島根県',
    '岡山県',
    '広島県',
    '山口県',
    '徳島県',
    '香川県',
    '愛媛県',
    '高知県',
    '福岡県',
    '佐賀県',
    '長崎県',
    '熊本県',
    '大分県',
    '宮崎県',
    '鹿児島県',
    '沖縄県',
  ];

  const REGIONS: region[] = [];

  regionNames.forEach((name, index) => {
    REGIONS.push({
      id: index + 1,
      name: name,
    });
  });

  inject('REGIONS', REGIONS);
  
  const genreNames = [
    '寿司',
    '焼肉',
    '居酒屋',
    'イタリアン',
    'ラーメン',
  ];

  const GENRES: genre[] = [];

  genreNames.forEach((name, index) => {
    GENRES.push({
      id: index + 1,
      name: name,
    });
  });

  inject('GENRES', GENRES);

  const TIMES: string[] = [];

  for (let i = 10; i <= 23; i++) {
    for (let j = 1; j <= 2; j++) {
      if (i === 23 && j === 2) {
        break;
      }
      TIMES.push(`${i}:${(j === 1) ? '00' : '30'}`);
    }
  }

  inject('TIMES', TIMES);

  const NUMBERS: string[] = [];
  for (let i = 1; i <= 20; i++) {
    NUMBERS.push(`${i}人`);
  }

  inject('NUMBERS', NUMBERS);
}

export default globalConsts;
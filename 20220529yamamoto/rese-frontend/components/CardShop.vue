<template>
  <div class="card-shop">
    <div class="card-shop__img" @click="linkClicked">
      <img :src="`${$config.storageUrl}/${shopImage}`" alt="店舗イメージ画像">
    </div>
    <div class="card-shop__inner">
      <nuxt-link class="card-shop__name" :to="`/shops/${shopId}`">{{shopName}}</nuxt-link>
      <div class="card-shop__middle">
        <span :class="{'card-shop__region': true, 'card-shop__region--cursor': searchFunction}" @click="regionClicked">#{{shopRegion}}</span>
        <span :class="{'card-shop__genre': true, 'card-shop__genre--cursor': searchFunction}" @click="genreClicked">#{{shopGenre}}</span>
      </div>
      <div class="card-shop__bottom">
        <ButtonBasic 
          class="card-shop__button"
          @clicked="linkClicked">
          詳しくみる
        </ButtonBasic>
        <div class="card-shop__heart" v-if="$store.state.user && showHeart" @click="heartClicked">
          <img src="~/assets/images/icon-heart.png" alt="♥"  v-if="isFavorited">
          <img src="~/assets/images/icon-heart-gray.png" alt="♥"  v-if="!isFavorited">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      shopImage: String,
      shopName: String,
      shopRegion: String,
      shopGenre: String,
      shopId: Number,
      isFavorited: Boolean,
      searchFunction: {
        type: Boolean,  
        default: true,
      },
      showHeart: {
        type: Boolean,  
        default: true,
      },
    },
    methods: {
      linkClicked() {
        this.$emit('linkClicked');
      },
      regionClicked() {
        this.$emit('regionClicked');
      },
      genreClicked() {
        this.$emit('genreClicked');
      },
      heartClicked() {
        this.$emit('heartClicked');
      },
    },
  };
</script>

<style lang="scss">
  .card-shop {
    border-radius: 5px;
    @include shadow(1);

    &__img {
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      overflow: hidden;
      cursor: pointer;
      width: 100%;
      & > img {
        width: 100%;
        height: 100px;
        object-fit: cover;
      }
    }

    &__inner {
      padding: 10px;
      font-weight: bold;
    }

    &__name {
      font-size: $fz-smaller;
    }

    &__middle {
      margin-bottom: 10px;
    }

    &__region,
    &__genre {
      font-size: $fz-smallest;

      &--cursor {
        cursor: pointer;
      }
    }

    &__bottom {
      @include flex($jc: space-between);
    }

    &__heart {
      cursor: pointer;
      width: 25px;
      height: 25px;
      & > img {
        width: 100%;
        object-fit: cover;
      }
    }
  }

  /* レスポンシブ */
  @include mq() {
    .card-shop {
      width: 100%;
      max-width: 500px;
      margin: 0 auto;

      &__img {
        & > img {
          height: 200px;
          object-fit: cover;
        }
      }

      &__name {
        font-size: $fz-normal;
      }

      &__middle {
        margin: 10px 0 20px;
      }

      &__region,
      &__genre {
        font-size: $fz-smaller;
      }

      &__button {
        width: 100%;
      }

      &__bottom {
        position: relative;
      }

      &__heart {
        width: 35px;
        height: 35px;
        position: absolute;
        top: -45px;
        right: 0;
      }
    }
  }
</style>
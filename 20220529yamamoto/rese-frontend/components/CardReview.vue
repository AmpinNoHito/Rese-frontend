<template>
  <div class="card-review">
    <img
      class="card-review__cross"
      src="~/assets/images/icon-cross.png"
      alt="×"
      @click="crossClicked">
    <p v-if="isNewReview" class="card-review__header">レビュー新規投稿</p>
    <p v-if="!isNewReview" class="card-review__header">レビュー編集</p>
    <div class="card-review__stars">
      <img
        class="card-review__star"
        src="~/assets/images/star.svg"
        alt="★"
        v-for="i in rate"
        @click="starClicked(i)"
      ><img
        class="card-review__star"
        src="~/assets/images/star-empty.svg"
        alt="☆"
        v-for="i in (5 - rate)"
        @click="starClicked(i+rate)">
        <p class="error-message" v-if="rateErrors && rateErrors.length">※{{rateErrors[0]}}</p>
    </div>
    <div class="card-review__input-wrapper">
      <input class="card-review__input" type="text" :value="title" placeholder="レビュータイトルを入力してください。" @change="titleChanged">
      <p class="error-message" v-if="titleErrors && titleErrors.length">※{{titleErrors[0]}}</p>
    </div>
    <div class="card-review__textarea-wrapper">
      <textarea class="card-review__textarea" cols="30" rows="10" placeholder="レビュー内容を入力してください。" @change="contentChanged">{{content}}</textarea>
      <p class="error-message" v-if="contentErrors && contentErrors.length">※{{contentErrors[0]}}</p>
    </div>
    <ButtonBasic
      class="card-review__button"
      @clicked="buttonClicked">
      送信
    </ButtonBasic>
    <ButtonBasic
      v-show="!isNewReview"
      class="card-review__button card-review__button--delete"
      @clicked="deleteClicked">
      レビュー削除
    </ButtonBasic>
  </div>
</template>

<script>
  export default {
    props: [
      'rate',
      'title',
      'content',
      'rateErrors',
      'titleErrors',
      'contentErrors',
      'isNewReview',
    ],
    methods: {
      crossClicked() {
        this.$emit('crossClicked');
      },
      titleChanged(e) {
        this.$emit('titleChanged', e.target.value);
      },
      contentChanged(e) {
        this.$emit('contentChanged', e.target.value);
      },
      starClicked(rate) {
        this.$emit('starClicked', rate);
      },
      buttonClicked() {
        if (this.isNewReview) {
          this.$emit('registerButtonClicked');
        } else {
          this.$emit('updateButtonClicked');
        }
      },
      deleteClicked() {
        this.$emit('deleteClicked');
      },
    },
  };
</script>

<style lang="scss">
  .card-review {
    @include flex(column, flex-start, stretch);
    color: #fff;
    background-color: $c-blue;
    width: 50%;
    min-height: 350px;
    height: fit-content;
    padding: 20px 20px 50px;
    border-radius: 5px;
    @include shadow(2);
    position: relative;

    &__cross {
      cursor: pointer;
      width: 20px;
      height: 20px;
      position: absolute;
      top: 18px;
      right: 20px;
    }

    &__stars {
      text-align: center;
      margin: 20px 0;
    }

    &__input-wrapper,
    &__textarea-wrapper {
      margin-bottom: 10px;
    }

    &__input {
      width: 100%;
      padding: 3px;
      &::placeholder {
        font-size: $fz-smaller;
      }
    }

    &__textarea {
      width: 100%;
      padding: 3px;
      &::placeholder {
        font-size: $fz-small;
      }
    }

    &__star {
      cursowidth: 40px;
      height: 40px;
      margin: 5px;r: pointer;
      width: 25px;


      height: 25px;
    }

    &__button {
      background-color: $c-blue--dark !important;
      color: #fff;
      &--delete {
        margin-top: 10px;
        color: #EF454A;
      }
    }

    @include mq() {
      width: calc(100% - 60px);
      max-width: 500px;
      margin: 0 auto;

      &__header {
        font-size: $fz-mid-large;
      }

      &__cross {
        width: 30px;
        height: 30px;
      }

      &__star {
        width: 40px;
        height: 40px;
        margin: 5px;
      }

      &__input {
        padding: 10px 5px;
      }
    }
  }
</style>
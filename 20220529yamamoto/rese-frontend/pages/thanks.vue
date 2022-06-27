<template>
  <div class="thanks">
    <p class="thanks__message">会員登録ありがとうございます<br><br>アドレス検証用のメールを送信しましたのでご確認ください</p>
    <ButtonBasic
      class="thanks__button"
      @clicked="$router.push('/login')">
      ログインする
    </ButtonBasic>
  </div>
</template>

<style lang="scss">
  .thanks {
    margin-top: 50px;
    max-width: 400px;
    margin: 50px auto;
    background-color: #fff;
    padding: 30px;
    border-radius: 3px;
    @include shadow(2);
    @include flex(column);
    text-align: center;

    &__message {
      line-height: 1.2em;
    }

    &__button {
      margin-top: 30px;
      &--back {
        margin-top: 10px;
      }
    }

    @include mq() {
      margin-top: 100px;
    }
  }
</style>
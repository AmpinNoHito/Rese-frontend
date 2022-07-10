<template>
  <div class="thanks-card">
    <ParagraphAtom
      class="thanks-card__message"
      :text="'会員登録ありがとうございます'"
    />
    <ParagraphAtom
      class="thanks-card__message"
      :text="'アドレス検証用のメールを送信しましたのでご確認ください'"
    />
    <ButtonAtom
      class="thanks-card__button"
      :clicked="toLogin"
      :text="'ログインする'"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ParagraphAtom from '~/components/atoms/Text/Paragraph.vue';
import ButtonAtom from '~/components/atoms/Button/Button.vue';

export default Vue.extend({
  components: {
    ParagraphAtom,
    ButtonAtom,
  },
  props: {
    toLogin: Function,
  }
});
</script>

<style lang="scss">
.thanks-card {
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
    margin-bottom: 20px;
  }

  &__button {
    margin-top: 10px;
  }

  @include mq() {
    margin-top: 100px;
  }
}
</style>
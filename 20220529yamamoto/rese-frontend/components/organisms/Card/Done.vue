<template>
  <div class="done-card">
    <ParagraphAtom
      class="done-card__message"
      :text="'ご予約ありがとうございます'"
    />
    <ButtonAtom
      class="done-card__button"
      v-if="query"
      :clicked="toPay"
      :text="'事前支払はこちら'"
    />
    <ButtonAtom
      class="done-card__button"
      :clicked="toHome"
      :text="'戻る'"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ParagraphAtom from '~/components/atoms/Paragraph.vue';
import ButtonAtom from '~/components/atoms/Button.vue';

export default Vue.extend({
  components: {
    ParagraphAtom,
    ButtonAtom,
  },
  props: {
    query: Boolean,
    toPay: Function,
    toHome: Function,
  }
});
</script>

<style lang="scss">
.done-card {
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
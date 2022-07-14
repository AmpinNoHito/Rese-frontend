<template>
  <div class="reservation-list">
    <HeaderUnit :headerText="'予約履歴'" :spanText="'現在の予約状況'" :spanClicked="toggleSwitchClicked"/>
    <ParagraphAtom v-if="!histories.length" class="reservation-list__message" :text="'予約履歴はありません。'"/>
    <div class="reservation-list__item" v-for="(history, index) in histories" :key="history.id">
      <ImageAtom
        class="reservation-list__clock"
        :src="require('~/assets/images/icon-clock.png')"
        :alt="'時計'"/>
      <ParagraphAtom class="reservation-list__item-number" :text="`予約履歴${index + 1}`"/>
      <NestedText v-if="isRepresentative" class="reservation-list__item-detail" :parentText="'Customer'" :childText="history.user.name"/>
      <NestedText v-if="!isRepresentative" class="reservation-list__item-detail" :parentText="'Shop'" :childText="history.shop.name"/>
      <NestedText class="reservation-list__item-detail" :parentText="'Date'" :childText="history.date"/>
      <NestedText class="reservation-list__item-detail" :parentText="'Time'" :childText="history.time"/>
      <NestedText class="reservation-list__item-detail" :parentText="'Number'" :childText="history.number"/>
      <DarkButtonAtom
        v-if="!history.review && !isRepresentative"
        class="reservation-list__button reservation-list__button--review"
        :text="'レビュー新規投稿'"
        :clicked="() => reviewButtonClicked(history)"
      />
      <DarkButtonAtom
        v-if="history.review && !isRepresentative"
        class="reservation-list__button reservation-list__button--review"
        :text="'レビュー編集'"
        :clicked="() => reviewButtonClicked(history)"
      />
      <DarkButtonAtom
        v-if="history.review && isRepresentative"
        class="reservation-list__button reservation-list__button--review"
        :text="'レビュー表示'"
        :clicked="() => reviewButtonClicked(history.review)"
      />
    </div>
  </div>
</template>


<script lang="ts">
import Vue from "vue";
import ParagraphAtom from '~/components/atoms/Text/Paragraph.vue';
import SpanAtom from '~/components/atoms/Text/Span.vue';
import CrossAtom from '~/components/atoms/Icon/Cross.vue';
import ImageAtom from '~/components/atoms/Image/Image.vue';
import DarkButtonAtom from '~/components/atoms/Button/DarkButton.vue';
import NestedText from '~/components/molecules/Text/NestedText.vue';
import HeaderUnit from '~/components/molecules/Text/Header.vue';

export default Vue.extend({
  components: {
    ParagraphAtom,
    SpanAtom,
    CrossAtom,
    ImageAtom,
    DarkButtonAtom,
    NestedText,
    HeaderUnit,
  },
  props: {
    histories: Array,
    isRepresentative: {
      type: Boolean,
      required: false,
      default: false,
    },
    toggleSwitchClicked: Function,
    reviewButtonClicked: Function,
  },
});
</script>

<style lang="scss">
.reservation-list {
  &__button--review {
    bottom: 15px;
  }
}
</style>
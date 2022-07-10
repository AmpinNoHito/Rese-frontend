<template>
  <div class="card-common-style qr-code-card">
    <CrossAtom
      class="card-common-style__cross"
      :clicked="() => $hideModal('qr')"
    />
    <ParagraphAtom class="card-common-style__header qr-code-card__header" :text="'来店確認用QRコード'"/>
    <ImageAtom v-if="qrcode" :src="qrcode" alt="QR" width="200" height="200"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import CrossAtom from '~/components/atoms/Icon/Cross.vue';
import ParagraphAtom from '~/components/atoms/Text/Paragraph.vue';
import ImageAtom from '~/components/atoms/Image/Image.vue';

export default Vue.extend({
  components: {
    CrossAtom,
    ParagraphAtom,
    ImageAtom,
  },
  props: {
    qrcode: String,
  },
});
</script>

<style lang="scss">
.qr-code-card {
  width: fit-content;
  @include flex(column, flex-start, center);
  &__header {
    padding-right: 50px;
    margin-bottom: 20px;
  }

  @include mq() {
    width: fit-content;
  }
}
</style>
<template>
  <div class="modal-common-style qr-modal" @click.self="$hideModal('qr')">
    <QRCodeCard :qrcode="qrcode"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import QRCodeCard from '~/components/organisms/Card/QRCode.vue';

export default Vue.extend({
  components: {
    QRCodeCard,
  },
  props: {
    qrcode: String,
  },
});
</script>

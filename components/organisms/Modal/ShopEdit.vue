<template>
  <div class="modal-common-style shop-modal" @click.self="() => $hideModal('shop')">
    <ShopEditCard
      :header="header"
      :newShop="newShop"
      :errors="errors"
      :atNameInput="atNameInput"
      :atDescriptionInput="atDescriptionInput"
      :regionChanged="regionChanged"
      :genreChanged="genreChanged"
      :previewImage="previewImage"
      :imageChanged="imageChanged"
      :buttonText="buttonText"
      :buttonClicked="buttonClicked"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ShopEditCard from '~/components/organisms/Card/ShopEdit.vue';

export default Vue.extend({
  components: {
    ShopEditCard,
  },
  props: {
    header: String,
    newShop: Object,
    errors: Object,
    atNameInput: Function,
    atDescriptionInput: Function,
    regionChanged: Function,
    genreChanged: Function,
    previewImage: String,
    imageChanged: Function,
    buttonText: String,
    buttonClicked: Function,
  }
});
</script>
<template>
  <div class="shop-detail">
    <div v-if="!admin" class="shop-detail__name-wrapper">
      <IconBack/>
      <ParagraphAtom class="shop-detail__name" :text="shop.name"/>
    </div>
    <div v-if="admin" class="shop-detail__name-wrapper">
      <IconBack/>
      <HeaderUnit
        class="shop-detail__name"
        :headerText="shop.name"
        :spanText="'店舗情報編集'"
        :spanClicked="() => $showModal('shop')"
      />
    </div>
    <ShopImage :shopImage="`${$config.storageUrl}/${shop.image}`"/>
    <SpanAtom class="shop-detail__region" :text="`#${shop.region.name}`"/>
    <SpanAtom class="shop-detail__genre" :text="`#${shop.genre.name}`"/>
    <ParagraphAtom class="shop-detail__description" :text="`#${shop.description}`"/>
    <CourseList
      :admin="admin"
      :courses="shop.courses"
      :deleteCourse="deleteCourse"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import IconBack from '~/components/atoms/Icon/IconBack.vue';
import HeaderAtom from '~/components/atoms/Text/Header.vue';
import ParagraphAtom from '~/components/atoms/Text/Paragraph.vue';
import SpanAtom from '~/components/atoms/Text/Span.vue';
import HeaderUnit from '~/components/molecules/Text/HeaderUnit.vue';
import ShopImage from '~/components/molecules/Image/ShopImage.vue';
import CourseList from '~/components/organisms/List/Courses.vue';

export default Vue.extend({
  components: {
    IconBack,
    HeaderAtom,
    ParagraphAtom,
    SpanAtom,
    HeaderUnit,
    ShopImage,
    CourseList,
  },
  props: {
    admin: {
      type: Boolean,
      required: false,
      default: false,
    },
    shop: Object,
    deleteCourse: Function,
  }
});
</script>

<style lang="scss">
.shop-detail {
  width: 45%;
  margin-top: 60px;
  position: relative;

  &__name-wrapper {
    @include flex($jc: flex-start);
  }

  &__name {
    font-weight: bold;
    font-size: $fz-mid-large;
    flex-grow: 1;
    padding: 0;
  }

  &__region,
  &__genre,
  &__description {
    font-size: $fz-smaller;
  }

  &__description {
    margin-top: 20px;
    line-height: 1.3em;
    white-space: pre-wrap;
  }

  @include mq() {
    width: 100%;
    max-width: 500px;
    margin: 80px auto 30px;

    &__name {
      font-size: $fz-large;
    }

    &__img {
      margin: 30px auto;
    }

    &__region,
    &__genre,
    &__description {
      font-size: $fz-normal;
    }

    &__course-header {
      margin-top: 40px;
      font-size: $fz-large;
    }

    &__reservation {
      width: 100%;
    }
  }
}
</style>
<template>
  <div class="shop-course">
    <ParagraphAtom class="shop-course__name" :text="course.name">
      <SpanAtom class="shop-course__price" :text="`¥${course.price}`"/>
    </ParagraphAtom>
    <ParagraphAtom class="shop-course__description" :text="course.description"/>
    <ClickableSpan
      v-if="admin"
      class="shop-course__delete-button"
      :text="'削除'"
      :clicked="() => deleteCourse(course.id)"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import ParagraphAtom from '~/components/atoms/Text/Paragraph.vue';
import SpanAtom from '~/components/atoms/Text/Span.vue';
import ClickableSpan from '~/components/atoms/Text/ClickableSpan.vue';

export default Vue.extend({
  components: {
    ParagraphAtom,
    SpanAtom,
    ClickableSpan,
  },
  props: {
    admin: {
      type: Boolean,
      required: false,
      default: false,
    },
    course: Object,
    deleteCourse: {
      type: Function,
      required: false,
      default: () => {},
    }
  },
});
</script>

<style lang="scss">
.shop-course {
  margin: 20px 0;
  padding: 20px 0;
  border-top: 1px solid $c-tp;

  &__price {
    margin-left: 20px;
  }

  &__description {
    font-size: $fz-smaller;
    margin-top: 1em;
    margin-left: 1em;
  }

  
  &__delete-button {
    cursor: pointer;
    position: absolute;
    right: 0;
    color: $c-red;
  }

    @include mq() {
      &__delete-button {
        font-size: $fz-mid-large;
      }
    }
}
</style>
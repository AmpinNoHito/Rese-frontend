<template>
  <div class="course-list">
    <HeaderAtom
      class="course-list__header"
      v-if="!admin && courses.length"
      :text="'コース一覧'"
    />
    <HeaderUnit
      class="course-list__header"
      v-if="admin"
      :headerText="'コース一覧'"
      :spanText="'新規コース登録'"
      :spanClicked="() => $showModal('course')"
    />
    <ShopCourse
      v-for="course in courses"
      :key="course.id"
      :admin="admin"
      :course="course"
      :deleteCourse="deleteCourse"
    />
    <ParagraphAtom v-if="admin && !courses.length" :text="'コースは登録されていません。'"/>
  </div>
</template>


<script lang="ts">
import Vue from 'vue';
import HeaderAtom from '~/components/atoms/Header.vue';
import ParagraphAtom from '~/components/atoms/Paragraph.vue';
import HeaderUnit from '~/components/molecules/TextUnit/HeaderUnit.vue';
import ShopCourse from '~/components/molecules/TextUnit/ShopCourse.vue';

export default Vue.extend({
  components: {
    HeaderAtom,
    ParagraphAtom,
    HeaderUnit,
    ShopCourse,
  },
  props: {
    admin: {
      type: Boolean,
      required: false,
      default: false,
    },
    courses: Array,
    deleteCourse: Function,
  }
});
</script>

<style lang="scss">
.course-list {
  &__header {
    padding: 0;
    margin-top: 30px;
    margin-bottom: 15px;
    font-size: $fz-mid-large;
    font-weight: bold;
  }
}
</style>
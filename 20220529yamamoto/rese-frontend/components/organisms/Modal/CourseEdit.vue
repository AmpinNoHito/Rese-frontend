<template>
  <div class="modal-common-style course-modal" @click.self="$hideModal('course'); initializeErrors();">
    <CourseEditCard
    :newCourse="newCourse"
    :atNameInput="atNameInput"
    :atPriceInput="atPriceInput"
    :atDescriptionInput="atDescriptionInput"
    :buttonClicked="buttonClicked"
    :errors="errors"
    :initializeErrors="initializeErrors"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import CourseEditCard from '~/components/organisms/Card/CourseEdit.vue';

export default Vue.extend({
  components: {
    CourseEditCard,
  },
  props: {
    newCourse: Object,
    atNameInput: Function,
    atPriceInput: Function,
    atDescriptionInput: Function,
    buttonClicked: Function,
    errors: Object,
    initializeErrors: Function,
  },
});
</script>
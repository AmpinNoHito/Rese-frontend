<template>
  <div class="card-reservation">
    <p class="card-reservation__header">
      <slot name="header"></slot>
    </p>
    <form class="card-reservation__form">
      <div class="card-reservation__form-item">
        <input
          class="card-reservation__input"
          type="date"
          :value="date"
          :min="today"
          @change="dateChanged">
      </div>  
      <div class="card-reservation__form-item">
        <SelectTime 
          class="card-reservation__select"
          :selectedTime="time"
          @timeChanged="$listeners['timeChanged']"/>
        <p class="error-message" v-if="datetimeErrors && datetimeErrors.length">※{{datetimeErrors[0]}}</p>
      </div>
      <div class="card-reservation__form-item">
        <SelectNumber
          class="card-reservation__select"
          :selectedNumber="number"
          @numberChanged="$listeners['numberChanged']"/>
        <p class="error-message" v-if="numberErrors && numberErrors.length">※{{numberErrors[0]}}</p>
      </div>
      <div class="card-reservation__form-item" v-if="courses.length">
        <select class="card-reservation__select" @change="courseChanged">
          <option value="" :selected="!selectedCourseIndex" hidden>コースを選択してください (任意)</option>
          <option
            v-for="(course, index) in courses"
            :key="course.id"
            :value="index"
            :selected="selectedCourseIndex === index.toString()">
            {{course.name}} (¥{{course.price}})
          </option>
        </select>
      </div>
    </form>
    <div class="card-reservation__confirmation">
      <p class="card-reservation__confirmation-item">Shop<span>{{shopName}}</span></p>
      <p class="card-reservation__confirmation-item">Date<span>{{date}}</span></p>
      <p class="card-reservation__confirmation-item">Time<span>{{time}}</span></p>
      <p class="card-reservation__confirmation-item">Number<span>{{number}}</span></p>
      <p class="card-reservation__confirmation-item" v-if="selectedCourseIndex">Course<span>{{courses[selectedCourseIndex].name}}</span></p>
      <p class="card-reservation__confirmation-item" v-if="number && selectedCourseIndex">Total<span>¥{{courses[selectedCourseIndex].price * +number.slice(0, -1)}}</span></p>
    </div>
    <button class="card-reservation__button" @click="buttonClicked">
      <slot name="button"></slot>
    </button>
    <img
        class="card-reservation__cross"
        src="~/assets/images/icon-cross.png"
        alt="×"
        v-if="showCross"
        @click="crossClicked">
  </div>
</template>

<script>
  export default {
    props: {
      date: String,
      today: String,
      time: String,
      number: String,
      courses: Array,
      selectedCourseIndex: String,
      shopName: String,
      datetimeErrors: Array,
      numberErrors: Array,
      showCross: {
        type: Boolean,
        default: false,
      },
    },
    methods: {
      dateChanged(e) {
        this.$emit('dateChanged', e.target.value);
      },
      courseChanged(e) {
        this.$emit('courseChanged', e.target.value);
      },
      buttonClicked() {
        this.$emit('buttonClicked');
      },
      crossClicked() {
        this.$emit('crossClicked');
      },
    },
  };
</script>


<style lang="scss">
  .card-reservation {
    color: #fff;
    background-color: $c-blue;
    width: 50%;
    min-height: 350px;
    height: fit-content;
    padding: 20px 20px 50px;
    border-radius: 5px;
    @include shadow(2);
    position: relative;

    &__header {
      font-weight: bold;
      font-size: $fz-mid-large;
      margin-bottom: 10px;
    }

    &__form {
      width: 100%;
      @include flex(column, flex-start, stretch);
      margin-bottom: 10px;
    }

    &__form-item {
      margin: 2px 0;
    }

    &__input {
      margin: 5px 0;
      padding: 2px;
      &::-webkit-calendar-picker-indicator {
        cursor: pointer;
      }
    }

    &__select {
      cursor: pointer;
      margin: 5px 0;
      padding: 2px;
      width: 100%;
      @include replaceArrow();
    }

    &__confirmation {
      background-color: $c-blue--light;
      padding: 5px 15px;
      border-radius: 5px;
      width: 100%;
    }

    &__confirmation-item {
      font-size: $fz-smaller;
      margin: 10px 0;
      position: relative;

      & > span {
        position: absolute;
        left: 80px;
      }
    }

    &__button {
      cursor: pointer;
      height: 3em;
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      border: none;
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
      background-color: $c-blue--dark !important;
      color: #fff;
      font-size: $fz-smaller;
      @include hoverEffect();
    }

    &__cross {
      cursor: pointer;
      width: 25px;
      height: 25px;
      position: absolute;
      top: 20px;
      right: 20px;
    }

    
    @include mq() {
      width: calc(100% - 60px);
      max-width: 500px;
      margin: 0 auto;

      &__input {
        margin: 5px 0;
        padding: 10px 2px;
        &::-webkit-calendar-picker-indicator {
          cursor: pointer;
        }
      }

      &__select {
        padding: 10px 2px;
      }

      &__confirmation {
        margin-bottom: 40px;
      }

      &__confirmation-item {
        font-size: $fz-normal;
        margin: 20px 0;
      }

      &__button {
        height: 5em;
      }
    }
  }
</style>
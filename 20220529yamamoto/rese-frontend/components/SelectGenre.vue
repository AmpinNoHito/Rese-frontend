<template>
  <select class="home-select" @change="changed">
    <option
      v-if="!admin"
      value=""
      :selected="!$store.state.genreSearchId">
      All genre
    </option>
    <option
      v-if="admin"
      value=""
      :selected="admin"
      hidden>
      ジャンルを選択
    </option>
    <option
      value="1"
      v-if="genres.includes(1) || admin"
      :selected="($store.state.genreSearchId === 1 && !admin) || (genres.includes(1) && admin)">
      寿司
    </option>
    <option
      value="2"
      v-if="genres.includes(2) || admin"
      :selected="($store.state.genreSearchId === 2 && !admin) || (genres.includes(2) && admin)">
      焼肉
    </option>
    <option
      value="3"
      v-if="genres.includes(3) || admin"
      :selected="($store.state.genreSearchId === 3 && !admin) || (genres.includes(3) && admin)">
      居酒屋
    </option>
    <option
      value="4"
      v-if="genres.includes(4) || admin"
      :selected="($store.state.genreSearchId === 4 && !admin) || (genres.includes(4) && admin)">
      イタリアン
    </option>
    <option
      value="5"
      v-if="genres.includes(5) || admin"
      :selected="($store.state.genreSearchId === 5 && !admin) || (genres.includes(5) && admin)">
      ラーメン
    </option>
  </select>
</template>

<script>
  export default {
    props: [
      'genres',
      'admin',
    ],
    methods: {
      changed(e) {
        this.$emit('changed', e.target.value);
      },
    },
  };
</script>
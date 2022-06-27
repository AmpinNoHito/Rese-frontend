<template>
  <select class="home-select" @change="changed">
    <option
      v-if="!admin"
      value=""
      :selected="!$store.state.regionSearchId">
      All area
    </option>
    <option
      v-if="admin"
      value=""
      :selected="admin"
      hidden>
      地域を選択
    </option>
    <option
      value="1"
      v-if="regions.includes(1) || admin"
      :selected="($store.state.regionSearchId === 1 && !admin) || (regions.includes(1) && admin)">
      北海道
    </option>
    <option
      value="2"
      v-if="regions.includes(2) || admin"
      :selected="($store.state.regionSearchId === 2 && !admin) || (regions.includes(2) && admin)">
      青森県
    </option>
    <option
      value="3"
      v-if="regions.includes(3) || admin"
      :selected="($store.state.regionSearchId === 3 && !admin) || (regions.includes(3) && admin)">
      岩手県
    </option>
    <option
      value="4"
      v-if="regions.includes(4) || admin"
      :selected="($store.state.regionSearchId === 4 && !admin) || (regions.includes(4) && admin)">
      宮城県
    </option>
    <option
      value="5"
      v-if="regions.includes(5) || admin"
      :selected="($store.state.regionSearchId === 5 && !admin) || (regions.includes(5) && admin)">
      秋田県
    </option>
    <option
      value="6"
      v-if="regions.includes(6) || admin"
      :selected="($store.state.regionSearchId === 6 && !admin) || (regions.includes(6) && admin)">
      山形県
    </option>
    <option
      value="7"
      v-if="regions.includes(7) || admin"
      :selected="($store.state.regionSearchId === 7 && !admin) || (regions.includes(7) && admin)">
      福島県
    </option>
    <option
      value="8"
      v-if="regions.includes(8) || admin"
      :selected="($store.state.regionSearchId === 8 && !admin) || (regions.includes(8) && admin)">
      茨城県
    </option>
    <option
      value="9"
      v-if="regions.includes(9) || admin"
      :selected="($store.state.regionSearchId === 9 && !admin) || (regions.includes(9) && admin)">
      栃木県
    </option>
    <option
      value="10"
      v-if="regions.includes(10) || admin"
      :selected="($store.state.regionSearchId === 10 && !admin) || (regions.includes(10) && admin)">
      群馬県
    </option>
    <option
      value="11"
      v-if="regions.includes(11) || admin"
      :selected="($store.state.regionSearchId === 11 && !admin) || (regions.includes(11) && admin)">
      埼玉県
    </option>
    <option
      value="12"
      v-if="regions.includes(12) || admin"
      :selected="($store.state.regionSearchId === 12 && !admin) || (regions.includes(12) && admin)">
      千葉県
    </option>
    <option
      value="13"
      v-if="regions.includes(13) || admin"
      :selected="($store.state.regionSearchId === 13 && !admin) || (regions.includes(13) && admin)">
      東京都
    </option>
    <option
      value="14"
      v-if="regions.includes(14) || admin"
      :selected="($store.state.regionSearchId === 14 && !admin) || (regions.includes(14) && admin)">
      神奈川県
    </option>
    <option
      value="15"
      v-if="regions.includes(15) || admin"
      :selected="($store.state.regionSearchId === 15 && !admin) || (regions.includes(15) && admin)">
      新潟県
    </option>
    <option
      value="16"
      v-if="regions.includes(16) || admin"
      :selected="($store.state.regionSearchId === 16 && !admin) || (regions.includes(16) && admin)">
      富山県
    </option>
    <option
      value="17"
      v-if="regions.includes(17) || admin"
      :selected="($store.state.regionSearchId === 17 && !admin) || (regions.includes(17) && admin)">
      石川県
    </option>
    <option
      value="18"
      v-if="regions.includes(18) || admin"
      :selected="($store.state.regionSearchId === 18 && !admin) || (regions.includes(18) && admin)">
      福井県
    </option>
    <option
      value="19"
      v-if="regions.includes(19) || admin"
      :selected="($store.state.regionSearchId === 19 && !admin) || (regions.includes(19) && admin)">
      山梨県
    </option>
    <option
      value="20"
      v-if="regions.includes(20) || admin"
      :selected="($store.state.regionSearchId === 20 && !admin) || (regions.includes(20) && admin)">
      長野県
    </option>
    <option
      value="21"
      v-if="regions.includes(21) || admin"
      :selected="($store.state.regionSearchId === 21 && !admin) || (regions.includes(21) && admin)">
      岐阜県
    </option>
    <option
      value="22"
      v-if="regions.includes(22) || admin"
      :selected="($store.state.regionSearchId === 22 && !admin) || (regions.includes(22) && admin)">
      静岡県
    </option>
    <option
      value="23"
      v-if="regions.includes(23) || admin"
      :selected="($store.state.regionSearchId === 23 && !admin) || (regions.includes(23) && admin)">
      愛知県
    </option>
    <option
      value="24"
      v-if="regions.includes(24) || admin"
      :selected="($store.state.regionSearchId === 24 && !admin) || (regions.includes(24) && admin)">
      三重県
    </option>
    <option
      value="25"
      v-if="regions.includes(25) || admin"
      :selected="($store.state.regionSearchId === 25 && !admin) || (regions.includes(25) && admin)">
      滋賀県
    </option>
    <option
      value="26"
      v-if="regions.includes(26) || admin"
      :selected="($store.state.regionSearchId === 26 && !admin) || (regions.includes(26) && admin)">
      京都府
    </option>
    <option
      value="27"
      v-if="regions.includes(27) || admin"
      :selected="($store.state.regionSearchId === 27 && !admin) || (regions.includes(27) && admin)">
      大阪府
    </option>
    <option
      value="28"
      v-if="regions.includes(28) || admin"
      :selected="($store.state.regionSearchId === 28 && !admin) || (regions.includes(28) && admin)">
      兵庫県
    </option>
    <option
      value="29"
      v-if="regions.includes(29) || admin"
      :selected="($store.state.regionSearchId === 29 && !admin) || (regions.includes(29) && admin)">
      奈良県
    </option>
    <option
      value="30"
      v-if="regions.includes(30) || admin"
      :selected="($store.state.regionSearchId === 30 && !admin) || (regions.includes(30) && admin)">
      和歌山県
    </option>
    <option
      value="31"
      v-if="regions.includes(31) || admin"
      :selected="($store.state.regionSearchId === 31 && !admin) || (regions.includes(31) && admin)">
      鳥取県
    </option>
    <option
      value="32"
      v-if="regions.includes(32) || admin"
      :selected="($store.state.regionSearchId === 32 && !admin) || (regions.includes(32) && admin)">
      島根県
    </option>
    <option
      value="33"
      v-if="regions.includes(33) || admin"
      :selected="($store.state.regionSearchId === 33 && !admin) || (regions.includes(33) && admin)">
      岡山県
    </option>
    <option
      value="34"
      v-if="regions.includes(34) || admin"
      :selected="($store.state.regionSearchId === 34 && !admin) || (regions.includes(34) && admin)">
      広島県
    </option>
    <option
      value="35"
      v-if="regions.includes(35) || admin"
      :selected="($store.state.regionSearchId === 35 && !admin) || (regions.includes(35) && admin)">
      山口県
    </option>
    <option
      value="36"
      v-if="regions.includes(36) || admin"
      :selected="($store.state.regionSearchId === 36 && !admin) || (regions.includes(36) && admin)">
      徳島県
    </option>
    <option
      value="37"
      v-if="regions.includes(37) || admin"
      :selected="($store.state.regionSearchId === 37 && !admin) || (regions.includes(37) && admin)">
      香川県
    </option>
    <option
      value="38"
      v-if="regions.includes(38) || admin"
      :selected="($store.state.regionSearchId === 38 && !admin) || (regions.includes(38) && admin)">
      愛媛県
    </option>
    <option
      value="39"
      v-if="regions.includes(39) || admin"
      :selected="($store.state.regionSearchId === 39 && !admin) || (regions.includes(39) && admin)">
      高知県
    </option>
    <option
      value="40"
      v-if="regions.includes(40) || admin"
      :selected="($store.state.regionSearchId === 40 && !admin) || (regions.includes(40) && admin)">
      福岡県
    </option>
    <option
      value="41"
      v-if="regions.includes(41) || admin"
      :selected="($store.state.regionSearchId === 41 && !admin) || (regions.includes(41) && admin)">
      佐賀県
    </option>
    <option
      value="42"
      v-if="regions.includes(42) || admin"
      :selected="($store.state.regionSearchId === 42 && !admin) || (regions.includes(42) && admin)">
      長崎県
    </option>
    <option
      value="43"
      v-if="regions.includes(43) || admin"
      :selected="($store.state.regionSearchId === 43 && !admin) || (regions.includes(43) && admin)">
      熊本県
    </option>
    <option
      value="44"
      v-if="regions.includes(44) || admin"
      :selected="($store.state.regionSearchId === 44 && !admin) || (regions.includes(44) && admin)">
      大分県
    </option>
    <option
      value="45"
      v-if="regions.includes(45) || admin"
      :selected="($store.state.regionSearchId === 45 && !admin) || (regions.includes(45) && admin)">
      宮崎県
    </option>
    <option
      value="46"
      v-if="regions.includes(46) || admin"
      :selected="($store.state.regionSearchId === 46 && !admin) || (regions.includes(46) && admin)">
      鹿児島県
    </option>
    <option
      value="47"
      v-if="regions.includes(47) || admin"
      :selected="($store.state.regionSearchId === 47 && !admin) || (regions.includes(47) && admin)">
      沖縄県
    </option>
  </select>
</template>

<script>
  export default {
    props: [
      'value',
      'regions',
      'admin',
      ],
    methods: {
      changed(e) {
        this.$emit('changed', e.target.value);
      },
    },
  };
</script>
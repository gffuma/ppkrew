<template>
<span>
  <span v-if="isGeocodingSuccess">
    {{ address.road }},
    <span v-if="address.village.trim().toLowerCase() === 'olginate'">
      Olgi <span style="color:red">&#9829;</span>
    </span>
    <span v-else>
      {{ address.village }},
    </span>
    {{ address.county }}, {{ address.state }}, {{ address.country }}
  </span>
  <span v-if="isGeocodingInPending" class="geocoding-pending">
    &#128585;
    A group of drunk monkeys is trying to find the location...
  </span>
  <span v-if="isGeocodingFailed" class="geocoding-failed">
    &#128584;
    The group of drunk monkeys fail to fine the location.
  </span>
</span>
</template>

<script>
import {getAddressInfoByCoords} from '../../utility/location';

export default {
  name: 'AddressInfo',

  props: {
    lat: Number,
    lon: Number,
  },

  data() {
    return {
      address: null,
      geocodingFailed: false
    };
  },

  computed: {
    isGeocodingSuccess() {
      return !!this.address;
    },
    isGeocodingInPending() {
      return !this.address && !this.geocodingFailed;
    },
    isGeocodingFailed() {
      return this.geocodingFailed;
    }
  },

  ready() {
    getAddressInfoByCoords({ lat: this.lat, lon: this.lon }).then(info => {
      console.log(info);
      this.address = info.address;
      /*this.address = info.display_name;*/
      /*this.address = '<3 Olgi';*/
    }, () => {
      this.geocodingFailed = true;
    });
  },
};
</script>

<style>
.geocoding-pending, .geocoding-failed {
  color: #B8965A;
}
</style>

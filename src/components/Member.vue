<template>
  <div class="member" @dblclick="toggleKickOutBtnVisibility()">
    <div class="member-name">{{ member.name }}<span class="aka" v-show="member.aka">{{ member.aka }}</span></div>
    <img :src="imageOrDefault" class="img-responsive" />
    <div class="kick-out" v-show="showKickOut">
      <button class="btn btn-danger" type="button"
        @click="kickOutMember">Kick out</button>
    </div>
    <div class="member-info">
      <div v-if="member.coords">
        <span class="glyphicon glyphicon glyphicon glyphicon-map-marker" aria-hidden="true"></span>
        <span class="member-info-text">
          <address-info
            :lat="member.coords.latitude"
            :lon="member.coords.longitude">
          </address-info>
        </span>
      </div>
      <div>
        <span class="glyphicon glyphicon glyphicon-time" aria-hidden="true"></span>
        <span class="member-info-text"><from-now :moment="createdAt"></from-now></span>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import intervalMixin from '../mixins/interval';
import FromNow from './util/FromNow.vue';
import AddressInfo from './util/AddressInfo.vue';

export default {
  name: 'Member',

  mixins: [intervalMixin],

  components: {
    FromNow,
    AddressInfo,
  },

  props: {
    member: Object,
  },

  data() {
    return {
      showKickOut: false
    };
  },

  computed: {
    imageOrDefault() {
      const image = this.member.image;
      return image ? image : '/images/default-member.jpg';
    },

    createdAt() {
      return moment(this.member.createdAt);
    },
  },

  methods: {
    toggleKickOutBtnVisibility() {
      this.showKickOut = ! this.showKickOut;
    },

    kickOutMember() {
      this.$dispatch('kick-out-member', this.member);
    },
  },
};
</script>

<style>
.member {
  position: relative;
  max-width: 650px;
  margin: auto;
  margin-bottom: 40px;
  border: 1px solid #f2f2f2;
  background-color: #f2f2f2;
}

.member > img {
  margin: auto;
  border: 1px solid #f2f2f2;
}

.member > .kick-out {
  position: absolute;
  text-align: center;
  margin: auto;
  width: 100%;
  top: 50%;
}

.member > .kick-out > button {
  border-radius: 0px;
}

.member > .member-name {
  padding-left: 5px;
  padding-right: 5px;
  padding-bottom: 8px;
  padding-top: 8px;
  background-color: white;
}

.member > .member-info {
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 6px;
  padding-bottom: 6px;
  font-size: 12px;
  font-family: verdana;
  background-color: white;
}

.member > .member-name > .aka:before {
  font-family: verdana;
  color: red;
  content: " aka ";
  font-size: 11px;
}
</style>

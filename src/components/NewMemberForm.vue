<template>
  <form class="new-member" v-on:submit.prevent="addNewMember()">
    <div class="form-group">
      <input type="text" class="form-control"
        v-model="newMember.name" v-el:name placeholder="Name">
    </div>
    <div class="form-group">
      <input type="text" class="form-control"
        v-model="newMember.aka" placeholder="Aka">
    </div>
    <button type="submit" class="btn btn-default">New Member</button>
  </form>
</template>

<script>
import Vue from 'vue';

export default {
  name: 'NewMemberForm',

  data() {
    return {
      newMember: {
        name: '',
        aka: '',
      }
    };
  },

  methods: {
    addNewMember() {
      if (this.newMember.name.trim()) {
        this.$dispatch('new-member-joined', this.newMember);
        this.newMember.name = '';
        this.newMember.aka = '';
      }
    },

    focus() {
      Vue.nextTick(() => {
        this.$els.name.focus();
      });
    },
  },
};
</script>

<style>
form.new-member {
  padding: 10px;
  padding-bottom: 50px;
}

form.new-member input[type="text"] {
  border-radius: 0px;
}

form.new-member input[type="text"]:focus {
  border-color: black;
  -webkit-box-shadow: 0 5px 15px rgba(0,0,0,0);
  -moz-box-shadow: 0 5px 15px rgba(0,0,0,0);
  -o-box-shadow: 0 5px 15px rgba(0,0,0,0);
  box-shadow: 0 5px 15px rgba(0,0,0,0);
  outline: 0 none;
}
</style>

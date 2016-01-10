<template>
  <div>
    <div class="page-header" @dblclick="toggleNewMemberFormVisibility">
      <h1>PPK</h1>
      <random-sentence></random-sentence>
    </div>

    <new-member-form
      v-ref:new-member-form
      v-show="showNewMember">
    </new-member-form>
  </div>
</template>

<script>
import RandomSentence from './RandomSentence.vue';
import NewMemberForm from './NewMemberForm.vue';

export default {
  name: 'PageHeader',

  components: {
    RandomSentence,
    NewMemberForm,
  },

  data() {
    return {
      showNewMember: false,
    };
  },

  methods: {
    toggleNewMemberFormVisibility() {
      this.showNewMember = ! this.showNewMember;

      if (this.showNewMember) {
        this.$refs.newMemberForm.focus();
      }
    }
  },
};
</script>

<style>
.page-header {
  border: 0px;
  text-align: center;
}
</style>

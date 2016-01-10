<template>
 <span>{{ fromNow }}</span>
</template>

<script>
import moment from 'moment';
import intervalMixin from '../../mixins/interval';

export default {
  name: 'FromNow',

  mixins: [intervalMixin],

  props: {
    moment: Object,
  },

  data() {
    return {
      fromNow: this.moment.fromNow()
    };
  },

  interval() {
    return {
      every: 30 * 1000, // 30 seconds

      run() {
        this.fromNow = this.moment.fromNow();
      },
    };
  },
};
</script>

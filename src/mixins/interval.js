export default {
  created() {
    const interval = (this.$options.interval || (() => {})).call(this) || {};
    const every = interval.every || 1000; // Default to one second
    const run = interval.run || (() => {});
    this.$intervalId = setInterval(run.bind(this), every);
  },

  destroyed() {
    clearInterval(this.$intervalId);
  },
};

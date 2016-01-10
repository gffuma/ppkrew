<template>
  <div>...{{ sentence }}</div>
</template>

<script>
import {randomSentence} from '../utility/sentence';
import intervalMixin from '../mixins/interval';

export default {
  mixins: [intervalMixin],

  name: 'RandomSentence',

  data() {
    return {
      sentence: randomSentence(),
    };
  },

  interval() {
    return {
      every: 20 * 1000, // 20 seconds

      run() {
        let newSentece;

        // Guarantees to be different to previous sentence
        do {
          newSentece = randomSentence();
        }
        while(newSentece === this.sentence);

        this.sentence = newSentece;
      },
    };
  },
};
</script>

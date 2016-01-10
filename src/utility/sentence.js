const ppkdata = require("json!../../ppk.json");

exports.randomSentence = () => {
  const sentences = ppkdata.sentences;
  return sentences[Math.floor((Math.random() * sentences.length))];
};

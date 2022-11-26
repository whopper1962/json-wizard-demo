<template>
<div class="json-view">
  <h3 class="json-title">JSON</h3>
  <div
    v-if="converted"
    class="json-contents-outer"
  >
    <div class="json-contents-inner">
    </div>
  </div>
  <div
    v-else
    class="file-input-form"
  >
    <input
      type="file"
      accept=".json"
    >
    <div class="convert-button">
      <button
        @click="convert()"
      >
        Convert
      </button>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      converted: true
    };
  },
  props: {},
  created () {},
  methods: {
    convert () {
      console.log('JSON Convert!');
    }
  }
}
</script>

<style scoped>
.json-title {
  font-family: 'Marker Felt';
  width: 100%;
}
.json-view {
  border-radius: 10px;
  border: solid black;
  background-color: rgb(164, 164, 164);
  width: 100%;
  height: 80vh;
}
.file-input-form {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  width: 80%;
  height: 3.2rem;
  vertical-align: middle;
}
.convert-button {
  margin-top: 4%;
}
.json-contents-outer {
  height: 90%;
  padding: 10px;
}
.json-contents-inner {
  border: solid black;
  background-color: rgb(118, 117, 117);
  height: 99%;
}
</style>
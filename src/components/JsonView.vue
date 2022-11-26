<template>
<div class="json-view">
  <h3 class="json-title">JSON</h3>
  <div class="file-input-form">
    <input
      type="file"
      accept=".json"
    >
    <div class="convert-button">
      <button @click="convert()">
        Convert!
      </button>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {};
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
  width: 100%;
}
.json-view {
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
  margin-top: 2%;
}
</style>
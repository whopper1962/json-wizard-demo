<template>
  <div class="user-manual">
    <!-- <h3>{{ $t('menu.userManual') }}</h3> -->
    <div class="user-manual-contents">
      <span v-html="compiledMarkdownText"/>
    </div>
  </div>
</template>
<script>
// import manual from '@/assets/user-manual.md';
import { marked } from 'marked';

export default {
  data () {
    return {
      markdownText: "## Manual"
    };
  },
  computed: {
    compiledMarkdownText () {
      return marked(this.markdownText);
    }
  }
}
</script>

<style>
.user-manual {
  margin-top: 50px;
}
.user-manual-contents {
  text-align: left;
  margin: auto;
  border: solid black;
  height: 100%;
  margin: 5px;
  padding: 10px;
}
</style>
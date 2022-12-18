<template>
  <div class="user-manual">
    <h3>{{ $t('menu.userManual') }}</h3>
    <div class="user-manual-contents">
      {{ compiledMarkdownText }}
    </div>
  </div>
</template>
<script>
import manual from '@/assets/user-manual.md';
import { marked } from 'marked';

export default {
  data () {
    return {
    };
  },
  computed: {
    compiledMarkdownText () {
      return marked(manual);
    }
  }
}
</script>

<style>
.user-manual {
  margin-top: 50px;
}
.user-manual-contents {
  margin: auto;
  height: 100%;
}
</style>
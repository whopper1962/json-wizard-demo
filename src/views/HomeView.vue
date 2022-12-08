<template>
  <div class="home">
    <div class="converter-title">
      <h3 class="line-height-none">
        XLSX JSON Converter
        <font-awesome-icon icon="fa-solid fa-hat-wizard" />
      </h3>
      <p>Created by
        <a
          href="https://github.com/whopper1962"
          target="_blank"
          rel="noopener noreferrer"
        >@whopper1962</a>
      </p>
      <div class="lang-select-box">
        <select
          v-model="selectedLang"
          @change="changeLang()"
        >
          <option value="ja">{{ $t('lang.ja') }}</option>
          <option value="en">{{ $t('lang.en') }}</option>
        </select>
      </div>
    </div>
    <div class="xlsx-json-contents">
      <div class="split-item split-item-outer">
        <div class="split-item-inner">
          <XlsxView />
        </div>
      </div>
      <div class="split-item split-item-outer">
        <div class="split-item-inner">
          <JsonView />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import xlsxJsonConverter from "@/lib/xlsx-json-converter";
import JsonView from '@/components/JsonView';
import XlsxView from '@/components/XlsxView';

export default {
  components: {
    JsonView,
    XlsxView
  },
  data () {
    return {
      selectedLang: 'ja'
    };
  },
  created () {
    this.selectedLang = localStorage.getItem('lang') || 'ja';
  },
  methods: {
    execConvert() {
      xlsxJsonConverter();
    },
    changeLang () {
      localStorage.setItem('lang', this.selectedLang);
      this.$i18n.locale = localStorage.getItem('lang');
    }
  },
};
</script>

<style scoped>
.converter-title {
  font-family: 'Marker Felt';
}
.xlsx-json-contents {
  display: table;
  width: 100%;
  margin-top: 20px;
}
.split-item {
  display: table-cell;
  padding: 10px;
  width: 50%;
}
.split-item-outer {
  position: relative;
}
.split-item-outer {
  height: 70vh;
  width: 50%;
}
.lang-select-box {
}
</style>

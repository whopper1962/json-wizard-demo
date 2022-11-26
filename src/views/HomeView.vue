<template>
  <div class="home">
    <div class="converter-title">
      <h3>XLSX JSON Converter</h3>
      <p>Created by @whopper1962</p>
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
  methods: {
    execConvert() {
      xlsxJsonConverter();
    },
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
</style>

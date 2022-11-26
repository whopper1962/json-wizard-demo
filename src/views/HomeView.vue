<template>
  <div class="home">
    <div class="converter-file-form">
      <h3>XLSX JSON Converter</h3>
      <div class="converter-file-form-inner">
        <input type="file" accept=".xls,.xlsx,.json" />
        <button @click="execConvert()">Convert</button>
      </div>
    </div>
    <div class="xlsx-json-contents">
      <div class="split-item split-item-outer">
        <div class="split-item-outer">
          <JsonView />
        </div>
      </div>
      <div class="split-item split-item-outer">
        <div class="split-item-outer">
          <XlsxView />
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
.xlsx-json-contents {
  display: table;
  width: 100%;
  margin-top: 20px;
}
.split-item {
  display: table-cell;
  padding: 80px;
  width: 50%;
}
.split-item-outer {
  background: rgb(136, 135, 135);
  color: #fff;
  position: relative;
}
.split-item-outer {
  height: 70vh;
  width: 50%;
}
</style>

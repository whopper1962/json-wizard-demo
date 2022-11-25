<template>
  <div class="home">
    <h3>XLSX JSON Converter</h3>
    <div class="converter-file-form">
      <input
        type="file"
        accept=".xls,.xlsx,.json"
      >
      <button
        @click="execConvert()"
      >
        Convert
      </button>
    </div>
    <div class="converter-style">
      <div>
        <JsonView/>
      </div>
      <div>
        <XlsxView/>
      </div>
    </div>
  </div>
</template>

<script>
import xlsxJsonConverter from '@/lib/xlsx-json-converter';
import JsonView from '@/components/JsonView';
import XlsxView from '@/components/XlsxView';

export default {
  components: {
    JsonView,
    XlsxView
  },
  methods: {
    execConvert () {
      xlsxJsonConverter();
    }
  }
}
</script>

<style scoped>
.home {
  /* height: 100vh; */
}
.converter-style {
  display: flex;
  /* margin-top: 20px;
  width: 100%; */
}
.converter-file-form {
  /* height: 10ch; */
}
</style>

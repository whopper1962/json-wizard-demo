<template>
  <div class="home">
    <h3>XLSX JSON Converter</h3>
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
</template>

<script>
import xlsxJsonConverter from '@/lib/xlsx-json-converter';
export default {
  methods: {
    execConvert () {
      xlsxJsonConverter();
    }
  }
}
</script>

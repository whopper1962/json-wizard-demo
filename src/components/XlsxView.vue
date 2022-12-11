<template>
<div class="xlsx-view">
  <h3 class="xlsx-title line-height-none">
    <!-- {{ $t('xlsx.title') }} -->
    SOURCE
  </h3>
  <div
    v-if="converted"
    class="xlsx-contents-outer"
  >
    <div class="xlsx-contents-inner">
      <div class="xlsx-conversion-data-area">
        <table
          class="xlsx-conversion-data-table"
          border="5"
        >
          <tr>
            <th v-if="keyOrders.length === 0">{{ $t('xlsx.key') }}1</th>
            <th
              v-for="(column, index) in keyOrders"
              :key="`column_${index}`"
            >
              {{ $t('xlsx.key') }}{{ index + 1 }}
            </th>
            <th class="bkc-other">{{ $t('xlsx.value') }}</th>
          </tr>
          <tr>
            <td v-if="keyOrders.length === 0">
              {{ $t('xlsx.selectColumn') }}
            </td>
            <td
              v-for="(column, index) in keyOrders"
              :key="`column_${index}`"
            >
              {{ $t('xlsx.column') }}{{ column + 1 }}
            </td>
            <td v-if="valueIndex !== null">{{ $t('xlsx.column') }}{{ valueIndex + 1 }}</td>
            <td v-else class="placeholder-style">{{ $t('xlsx.selectColumn') }}</td>
          </tr>
        </table>
        <button
          class="exec-conversion-button"
          :class="{
            'disabled': keyOrders.length == 0 || valueIndex === null
          }"
          :disabled="keyOrders.length == 0 || valueIndex === null"
          @click="execconversion()"
        >
          {{ $t('xlsx.execCovertion') }}
          <font-awesome-icon icon="fa-solid fa-wand-sparkles" class="icon"/>
        </button>
        <button
          class="select-other-files-button"
          @click="initXlsxForm()"
        >
          {{ $t('xlsx.selectOtherFile') }}
        </button><br/>
        <div class="sheet-select-area">
          <font-awesome-icon icon="fa-solid fa-hand-point-right" />
          {{ $t('xlsx.selectedFile') }}: {{ sourceFileName }}<br>
          <font-awesome-icon icon="fa-solid fa-hand-point-right"/>
          {{ $t('xlsx.selectedSheet') }}:
          <select
            class="sheet-select"
            v-model="selectedSheet"
            @change="changeSheet()"
          >
            <option
              v-for="(sheetName, index) in sheetNames"
              :key="`sheetName_${index}`"
              :value="sheetName"
            >
              {{ sheetName }}
            </option>
          </select><br>
          <font-awesome-icon icon="fa-solid fa-hand-point-right" />
          {{ $t('xlsx.numberOfRows') }}: {{ selectedSheetContents.length }}<br>
          <font-awesome-icon icon="fa-solid fa-hand-point-right" />
          {{ $t('xlsx.numberOfExcludedRows') }}: {{ excludedRows.length }}
        </div>
      </div>
      <div class="sticky-table">
        <table class="xlsx-table" border="5">
          <thead>
            <tr>
              <td class="bgc-data"></td>
              <td
                class="bgc-data"
                v-for="(num, index) in keyOrderArr"
                :key="`num_${index}`"
              >
                <label>
                  <input
                    type="checkbox"
                    :disabled="index === valueIndex"
                    v-model="keyOrderArr[index]"
                    @change="orderChecked(index)"
                  />{{ $t('xlsx.addToKeys') }}
                </label>
              </td>
            </tr>
            <tr>
              <td class="bgc-data"></td>
              <td
                class="bgc-data"
                v-for="num of selectedSheetMaxLen"
                :key="`num_${num}`"
              >
                <label>
                  <input
                    type="radio"
                    name="value"
                    @change="valueChecked(num - 1)"
                  />{{ $t('xlsx.setToValue') }}
                </label>
              </td>
            </tr>
            <tr>
              <th></th>
              <th
                v-for="num of selectedSheetMaxLen"
                :key="`num_${num}`"
              >
                {{ $t('xlsx.column') }}{{ num }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(row, rowIndex) in selectedSheetContents"
              :key="`row_${rowIndex}`"
              :class="{
                'error-row': invalidRows.includes(rowIndex),
                'excluded-row': excludedRows.includes(rowIndex)
              }"
            >
              <td class="delete-row-button-area">
                <button
                  class="garbage-button"
                  v-if="excludedRows.includes(rowIndex)"
                  @click="addRow(rowIndex)"
                >
                  <font-awesome-icon icon="fa-solid fa-trash-arrow-up" />
                </button>
                <button
                  v-else
                  class="garbage-button"
                  @click="deleteRow(rowIndex)"
                >
                  <font-awesome-icon icon="fa-solid fa-trash" />
                </button>
              </td>
              <td
                class="background-color-white"
                v-for="(val, index) in row"
                :key="`val_${index}`"
              >
                {{ val }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <div
    v-else
    class="file-input-form"
  >
    <div class="xlsx-to-json">
      <div class="xlsx-to-json-inner">
        <div class="tips">
          {{ $t('message.createJSONFromXlsx') }}
        </div>
        <input
          type="file"
          accept=".xls,.xlsx"
          @change="fileInputed"
        >
        <div class="convert-button">
          <button
            @click="convert()"
            :disabled="!isFileInputed || !isValidFileFormat"
          >
            {{ $t('xlsx.read') }}
          </button>
          <p
            v-if="!isValidFileFormat"
            class="file-format-error"
          >
            {{ $t('xlsx.invalidFileFormat') }}
          </p>
        </div>
      </div>
    </div>
    <div class="json-to-xlsx">
      <div class="json-to-xlsx-inner">
        <div class="tips">
          {{ $t('message.createXlsxFromJSON') }}
        </div>
        <input
          type="file"
          accept=".json"
          @change="jsonInputed"
        >
        <div class="convert-button">
          {{ $t('xlsx.downloadFileType') }}:
          <label>
            <input
              type="radio"
              name="downloadFileType"
              v-model="downloadFileType"
              value="csv"
            >CSV
          </label>
          <label>
            <input
              type="radio"
              name="downloadFileType"
              v-model="downloadFileType"
              value="xlsx"
            >XLSX
          </label>
        </div>
        <div class="convert-button">
          <input
            class="csv-file-name-form"
            type="text"
            :disabled="isInvalidJson"
            :placeholder="$t('message.csvFileNameForm')"
            v-model="csvFileName"
          />
          <button
            class="csv-download-button"
            @click="downloadCsv()"
            :disabled="isInvalidJson"
          >
            {{ $t('xlsx.download') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import xlsxToJson from '@/lib/json-wizard/xlsx-to-json';
import jsonToXlsx from '@/lib/json-wizard/json-to-xlsx';
import readXlsxFile from 'read-excel-file';
import writeXlsxFile from 'write-excel-file';
import * as XLSX from 'xlsx';

export default {
  data () {
    return {
      converted: false,
      isFileInputed: false,
      isValidFileFormat: true,
      selectedSheetMaxLen: 0,
      xlsxContents: [],
      selectedSheetContents: [],
      contentsToConversion: [],
      selectedSheet: [],
      excludedRows: [],
      keyOrders: [],
      sheetNames: [],
      valueIndex: null,
      keyOrderArr: [],
      invalidRows: [],
      isInvalidJson: true,
      jsonObj: {},
      encodedUri: '',
      csvFileName: '',
      sourceFileName: '',
      downloadFileType: 'csv'
    };
  },
  props: {},
  created () {},
  methods: {
    async fileInputed (event) {
      this.isFileInputed = false;
      const fileContents = event.target.files ? event.target.files[0] : null;
      if (!fileContents) return;
      this.sourceFileName = fileContents.name;
      const inputedFileExtension = this.sourceFileName.split('.').pop();
      if (inputedFileExtension === 'csv') {
        this.readCsv(fileContents);
      } else {
        this.readXlsx(fileContents);
      }
    },
    async jsonInputed (event) {
      this.isInvalidJson = true;
      this.csvFileName = '';
      this.encodedUri = '';
      const fileContents = event.target.files ? event.target.files[0] : null;
      if (!fileContents) return;
      try {
        const json = await this.readJson(fileContents);
        this.jsonObj = jsonToXlsx(json);
        this.isInvalidJson = false;
      } catch (error) {
        console.error(error);
        this.isInvalidJson = true;
        this.csvFileName = '';
        this.encodedUri = '';
        this.isInvalidJson = true;
      }
    },
    async createXlsx () {
      let xlsxColumns = [];
      for (const row of this.jsonObj) {
        let column = [];
        for (const elem of row) {
          column.push({
            value: elem
          });
        }
        xlsxColumns.push(column);
      }
      writeXlsxFile(xlsxColumns, {
        fileName: this.csvFileName.length > 0
          ? `${this.csvFileName}.xlsx`
          : 'json-wizard.xlsx'
      });
    },
    downloadCsv () {
      try {
        if (this.downloadFileType === 'xlsx') {
          this.createXlsx();
        } else {
          let csvContent = "data:text/csv;charset=utf-8,";
          this.jsonObj.forEach(function(rowArray) {
            let row = rowArray.join(",");
            csvContent += row + "\r\n";
          });
          this.encodedUri = encodeURI(csvContent);
          const link = document.createElement('a');
          link.setAttribute('href', this.encodedUri);
          link.setAttribute('download',
            this.csvFileName.length > 0
            ? `${this.csvFileName}.csv`
            : 'json-wizard.csv'
          );
          document.body.appendChild(link);
          link.click();
        }
      } catch (error) {
        console.error(error);
      }
    },
    async readJson (fileContents) {
      return new Promise((resolve) => {
        const fileReader = new FileReader();
        fileReader.readAsText(fileContents);
        fileReader.onload = (e) => {
          const json = JSON.parse(e.target.result);
          resolve(json);
        };
      });
    },
    async readXlsx (fileContents) {
      await this.setSheetNames(fileContents);
      await this.readSheets(fileContents, this.sheetNames);
      this.selectedSheet = this.sheetNames[0];
      this.isValidFileFormat = true;
      this.isFileInputed = true;
      this.changeSheet();
    },
    readCsv (fileContents) {
      console.error(fileContents);
    },
    setSheetNames (fileContents) {
      return new Promise((resolve) => {
        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(fileContents);
        fileReader.onload = () => {
          this.arrayBuffer = fileReader.result;
          const data = new Uint8Array(this.arrayBuffer);
          const arr = new Array();
          for (let i = 0; i != data.length; ++i) {
            arr[i] = String.fromCharCode(data[i]);
          }
          const bstr = arr.join('');
          const workbook = XLSX.read(bstr, { type: 'binary' });
          this.sheetNames = workbook.SheetNames;
          resolve();
        };
      });
    },
    async readSheets (fileContents, sheets) {
      for (const sheet of sheets) {
        await readXlsxFile(fileContents, {
          sheet
        }).then((rows) => {
          this.xlsxContents = Object.assign({}, this.xlsxContents, {
            [sheet]: rows
          });
        }).catch((error) => {
          console.error(error);
          this.isValidFileFormat = false;
        });
      }
      this.isFileInputed = true;
    },
    resetValueRadioButtons () {
      for (const element of document.getElementsByName('value')) {
        element.checked = false;
      }
    },
    changeSheet () {
      this.keyOrderArr = [];
      this.keyOrders = [];
      this.keyOrders = [];
      this.excludedRows = [];
      this.valueIndex = null;
      this.resetValueRadioButtons();
      this.selectedSheetContents = this.xlsxContents[this.selectedSheet];
      const lengths = this.selectedSheetContents.map((row) => row.length);
      this.selectedSheetMaxLen = Math.max(...lengths);
      for (let i = 0; i < this.selectedSheetMaxLen; i++) {
        this.keyOrderArr.push(false);
      }
    },
    initXlsxForm () {
      this.converted = false;
      this.isValidFileFormat = true;
      this.isFileInputed = false;
      this.keyOrders = [];
      this.selectedSheetMaxLen = null;
      this.keyOrderArr = [];
      this.invalidRows = [];
      this.excludedRows = [];
      this.valueIndex = null;
      this.keyOrders = [];
      this.jsonObj = {};
      this.downloadFileType = 'csv';
      this.sourceFileName = '';
      this.$store.dispatch('setJson', {});
      this.$store.dispatch('setConversionFlag', false);
      this.$store.dispatch('setDuplicationErrorStatus', false);
      this.$store.dispatch('setInvalidKeyErrorStatus', false);
    },
    orderChecked (index) {
      const foundIndex = this.keyOrders.indexOf(index);
      if (foundIndex === -1) {
        this.keyOrders.push(index);
      } else {
        this.keyOrders.splice(foundIndex, 1);
      }
    },
    valueChecked (index) {
      this.valueIndex = index;
      const foundIndexInKeys = this.keyOrders.indexOf(this.valueIndex);
      if (foundIndexInKeys !== -1) {
        this.$set(this.keyOrderArr, index, false);
        this.keyOrders.splice(foundIndexInKeys, 1);
      }
    },
    convert () {
      this.converted = true;
    },
    deleteRow (rowIndex) {
      this.excludedRows.push(rowIndex);
    },
    addRow (rowIndex) {
      this.excludedRows = this.excludedRows.filter((row) => {
        return row !== rowIndex;
      });
    },
    filterRows () {
      for (const excludedRowIndex of this.excludedRows) {
        this.contentsToConversion.splice(excludedRowIndex, 1);
      }
    },
    execconversion () {
      this.$store.dispatch('setJson', {});
      this.$store.dispatch('setConversionFlag', true);
      this.$store.dispatch('setDuplicationErrorStatus', false);
      this.$store.dispatch('setInvalidKeyErrorStatus', false);
      this.invalidRows = [];
      try {
        const generatedJson = xlsxToJson({
          parentKeys: this.keyOrders,
          valueIndex: this.valueIndex,
          contents: this.selectedSheetContents,
          excludes: this.excludedRows
        });
        this.$store.dispatch('setJson', generatedJson);
      } catch (error) {
        switch (error.status) {
          case 428: {
            this.keyDuplicated = true;
            this.invalidRows = error.body;
            this.invalidRows.splice();
            this.$store.dispatch('setDuplicationErrorStatus', true);
            break;
          }
          case 429: {
            this.invalidRows = error.body;
            this.invalidRows.splice();
            this.$store.dispatch('setInvalidKeyErrorStatus', true);
            break;
          }
          default: {
            this.$store.dispatch('setInvalidKeyErrorStatus', true);
          }
        }
      }
      console.error('CONVERTED');
    }
  }
}
</script>

<style scoped>
.xlsx-title {
  font-family: 'Trattatello';
  color: rgb(34, 0, 112);
  width: 100%;
}
.xlsx-conversion-data-table {
  font-size: 12px;
  font-family: 'Menlo', sans-serif;
  width: 100%;
  background-color: white;
  margin-bottom: 10px;
}
.xlsx-conversion-data-table th {
  background-color: rgb(116, 190, 104);
}
.xlsx-view {
  box-sizing: border-box;
  border-radius: 10px;
  position: relative;
  border: solid black;
  background-color: rgb(118, 117, 117);
  width: 100%;
  height: 84.3vh;
}
.file-input-form {
  height: 90%;
  /* position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  width: 80%;
  height: 3.2rem;
  vertical-align: middle; */
}
.file-format-error {
  margin: 5px;
  padding: 5px;
  background-color: white !important;
  font-family: 'Menlo', sans-serif;
  /* border: solid black !important; */
  color: rgb(255, 52, 52);
}
.convert-button {
  margin-top: 4%;
}
.xlsx-contents-outer {
  box-sizing: border-box;
  overflow: hidden;
  height: 92%;
  padding: 0px 10px 10px 10px;
}
.xlsx-contents-inner {
  /* font-size: 12px; */
  /* border: solid black; */
  /* background-color: rgb(118, 117, 117); */
  /* height: 99%; */
  box-sizing: border-box;
}
.xlsx-table {
  font-family: 'Menlo', sans-serif;
  width: 100%;
  background-color: rgb(189, 189, 189);
}
.xlsx-table th {
  background-color: rgb(116, 190, 104);
}
.xlsx-table thead {
  position: sticky;
  top: 0;
}
.sticky-table {
  font-size: 12px;
  position: relative;
  overflow-y: auto;
  height: 700px;
  box-sizing: border-box;
  border-collapse:separate;
}
.sticky-table table {
  height: 100%;
  border: 1px solid #DDD;
  vertical-align: middle;
  text-align: center;
  border-collapse: collapse;
  border-spacing: 0;
  border-collapse: separate;
  word-break:break-all;
  table-layout: fixed;
}
.sticky-table td:first-child {
  width: 2.3em !important;
  text-align: center;
}
.sticky-table td {
  height: 100%;
}
.garbage-button {
  text-align: center;
  height: 100%;
}
/* .garbage-button-area {
  width: 1px !important;
} */
.bgc-data {
  background-color: rgb(255, 188, 79);
}
.xlsx-conversion-data-area {
  margin-bottom: 5px;
  text-align: left;
  /* font-size: 5px; */
}
.xlsx-conversion-data-area button {
  margin-right: 10px;
}
.background-color-white {
  background-color: white;
}
.bkc-other {
  background-color: rgb(228, 224, 0) !important;
}
.error-row td {
  background-color: rgb(255, 122, 122) !important;
}
.excluded-row td {
  background-color: rgb(179, 179, 179) !important;
}
.sheet-select-area {
  color: white;
  font-weight: bold;
  font-size: 13px;
  margin-top: 10px;
}
.sheet-select {
  width: 160px;
}
.delete-row-button-area {
  width: 1px;
}
.delete-row-button-area button{
  width: 100%;
}
.icon {
  margin-left: 5px;
}
.xlsx-to-json {
  border: solid black;
  position: relative;
  height: 50%;
  border-radius: 8px;
  margin: 10px;
}
.xlsx-to-json-inner {
  /* font-weight: bold; */
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  width: 80%;
  height: 3.2rem;
}
.json-to-xlsx {
  height: 50%;
  border: solid black;
  position: relative;
  border-radius: 8px;
  margin: 10px;
}
.json-to-xlsx-inner {
  /* font-weight: bold; */
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  width: 80%;
  height: 10.2rem;
}
.xlsx-to-json-inner {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  width: 80%;
  height: 3.2rem;
}
.csv-download-button {
  width: 120px;
  height: 26px;
  text-align: center;
}
.tips {
  margin-bottom: 15px;
}
.csv-file-name-form {
  width: 200px;
  height: 20px;
}
.exec-conversion-button {
  background-color: rgb(98, 185, 85);
  padding: 4px;
  border-radius: 5px;
  width: 170px;
  line-height: 120%;
}
.select-other-files-button {
  /* background-color: rgb(182, 71, 71); */
  padding: 4px;
  border-radius: 5px;
  width: 170px;
  line-height: 120%;
  background-color: rgb(198, 198, 198);
}
.disabled {
  background-color: rgb(153, 153, 153);
}
</style>
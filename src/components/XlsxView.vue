<template>
<div class="xlsx-view">
  <h3 class="xlsx-title">XLSX</h3>
  <div
    v-if="converted"
    class="xlsx-contents-outer"
  >
    <div class="xlsx-contents-inner">
      <div class="xlsx-convertion-data-area">
        <table
          class="xlsx-convertion-data-table"
          border="5"
        >
          <tr>
            <th v-if="keyOrders.length === 0">Key1</th>
            <th
              v-for="(column, index) in keyOrders"
              :key="`column_${index}`"
            >
              Key{{ index + 1 }}
            </th>
            <th class="bkc-other">Value</th>
          </tr>
          <tr>
            <td v-if="keyOrders.length === 0">
              Select column
            </td>
            <td
              v-for="(column, index) in keyOrders"
              :key="`column_${index}`"
            >
              Column{{ column + 1 }}
            </td>
            <td v-if="valueIndex !== null">Column{{ valueIndex + 1 }}</td>
            <td v-else class="placeholder-style">Select column</td>
          </tr>
        </table>
        <button
          :disabled="keyOrders.length == 0 || valueIndex === null"
          @click="execConvertion()"
        >
          Execute convertion
        </button>
        <button
          @click="initXlsxForm()"
        >
          Select other file
        </button><br/>
        <div class="sheet-select-area">
          Selected sheet: <select
            class="sheet-select"
            v-model="selectedSheet"
            @change="changeSheet()"
          >
            <option :value="`Sheet1`">Sheet1</option>
            <option :value="`Sheet2`">Sheet2</option>
          </select>
        </div>
      </div>
      <div class="sticky-table">
        <table class="xlsx-table" border="5">
          <thead>
            <tr>
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
                  />Add to keys
                </label>
              </td>
            </tr>
            <tr>
              <td
                class="bgc-data"
                v-for="num of maxLength"
                :key="`num_${num}`"
              >
                <label>
                  <input
                    type="radio"
                    name="value"
                    @change="valueChecked(num - 1)"
                  />Value
                </label>
              </td>
            </tr>
            <tr>
              <th
                v-for="num of maxLength"
                :key="`num_${num}`"
              >
                Column{{ num }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(row, rowIndex) in xlsxContents"
              :key="`row_${rowIndex}`"
              :class="{'error-row': duplicates.includes(rowIndex)}"
            >
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
    <input
      type="file"
      accept=".xls,.xlsx,.csv"
      @change="fileInputed"
    >
    <div class="convert-button">
      <button
        @click="convert()"
        :disabled="!isFileInputed || !isValidFileFormat"
      >
        Read
      </button>
      <p
        v-if="!isValidFileFormat"
        class="file-format-error"
      >
        Invalid file format.
      </p>
    </div>
  </div>
</div>
</template>

<script>
import xlsxJsonConverter from '@/lib/xlsx-json-converter';
import readXlsxFile from 'read-excel-file';
import * as XLSX from 'xlsx';

export default {
  data () {
    return {
      converted: false,
      isFileInputed: false,
      isValidFileFormat: true,
      maxLength: 0,
      xlsxContents: [],
      selectedSheet: [],
      selectedSheet: '',
      keyOrders: [],
      sheetNames: [],
      valueIndex: null,
      keyOrderArr: [],
      duplicates: []
    };
  },
  props: {},
  created () {},
  methods: {
    async fileInputed (event) {
      this.isValidFileFormat = true;
      const xlsxContents = event.target.files ? event.target.files[0] : null;
      if (!xlsxContents) return;
      await this.setSheetNames(xlsxContents);
      this.selectedSheet = this.sheetNames[0];
      readXlsxFile(xlsxContents, {
        sheet: this.selectedSheet
      }).then((rows) => {
        this.xlsxContents = rows;
        this.isFileInputed = true;
        const lengths = this.xlsxContents.map((row) => row.length);
        this.maxLength = Math.max(...lengths);
        for (let i = 0; i < this.maxLength; i++) {
          this.keyOrderArr.push(false);
        }
      }).catch((error) => {
        console.error(error);
        this.isValidFileFormat = false;
      });
    },
    async setSheetNames (xlsxContents) {
      await new Promise((resolve) => {
        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(xlsxContents);
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
    readSheets (file, sheets) {
      for (const sheet of sheets) {
        readXlsxFile(file, {
          sheet
        }).then((rows) => {
          this.xlsxContents[sheet] = rows;
          // this.isFileInputed = true;
          const lengths = this.xlsxContents.map((row) => row.length);
          this.maxLength = Math.max(...lengths);
          for (let i = 0; i < this.maxLength; i++) {
            this.keyOrderArr.push(false);
          }
        }).catch((error) => {
          console.error(error);
          this.isValidFileFormat = false;
        });
      }
    },
    changeSheet () {
      console.error(this.selectedSheet);
    },
    initXlsxForm () {
      this.converted = false;
      this.isValidFileFormat = true;
      this.isFileInputed = false;
      this.keyOrders = [];
      this.maxLength = null;
      this.keyOrderArr = [];
      this.valueIndex = null;
      this.duplicates = [];
      this.$store.dispatch('setJson', {});
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
    execConvertion () {
      this.$store.dispatch('setJson', {});
      this.$store.dispatch('setDuplicationErrorStatus', false);
      this.$store.dispatch('setInvalidKeyErrorStatus', false);
      this.duplicates = [];
      try {
        const generatedJson = xlsxJsonConverter({
          parentKeys: this.keyOrders,
          valueIndex: this.valueIndex,
          contents: this.xlsxContents
        });
        this.$store.dispatch('setJson', generatedJson);
      } catch (error) {
        switch (error.status) {
          case 428: {
            this.keyDuplicated = true;
            this.duplicates = error.body;
            this.duplicates.splice();
            this.$store.dispatch('setDuplicationErrorStatus', true);
            break;
          }
          case 429: {
            this.duplicates = error.body;
            this.duplicates.splice();
            this.$store.dispatch('setInvalidKeyErrorStatus', true);
            break;
          }
          default: {
            this.$store.dispatch('setInvalidKeyErrorStatus', true);
          }
        }
        // this.isValidFileFormat = false;
      }
      console.error('CONVERTED!!!');
    }
  }
}
</script>

<style scoped>
.xlsx-title {
  font-family: 'Marker Felt';
  width: 100%;
}
.xlsx-convertion-data-table {
  font-size: 12px;
  font-family: 'Menlo', sans-serif;
  width: 100%;
  background-color: white;
  margin-bottom: 10px;
}
.xlsx-convertion-data-table th {
  background-color: rgb(116, 190, 104);
}
.xlsx-view {
  border-radius: 10px;
  position: relative;
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
.file-format-error {
  margin: 5px;
  padding: 5px;
  background-color: white !important;
  font-family: 'Menlo', sans-serif;
  border: solid black !important;
  color: rgb(255, 52, 52);
}
.convert-button {
  margin-top: 4%;
}
.xlsx-contents-outer {
  height: 90%;
  padding: 10px;
}
.xlsx-contents-inner {
  /* font-size: 12px; */
  border: solid black;
  background-color: rgb(118, 117, 117);
  height: 99%;
}
.xlsx-table {
  font-family: 'Menlo', sans-serif;
  margin-top: 10px;
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
  height: 70%;
}
.sticky-table table {
  border: 1px solid #DDD;
  vertical-align: middle;
  text-align: center;
  border-collapse: collapse;
  border-spacing: 0;
  border-collapse:separate;
}
.bgc-data {
  background-color: rgb(255, 188, 79);
}
.xlsx-convertion-data-area {
  margin: 5px;
  text-align: left;
}
.xlsx-convertion-data-area button {
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
.sheet-select {
  margin-top: 10px;
}
.sheet-select-area {
  color: white;
}
</style>
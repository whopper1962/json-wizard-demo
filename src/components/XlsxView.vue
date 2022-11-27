<template>
<div class="xlsx-view">
  <h3 class="xlsx-title">XLSX</h3>
  <div
    v-if="converted"
    class="xlsx-contents-outer"
  >
    <div class="xlsx-contents-inner">
      <div class="xlsx-convertion-data-area">
        <button
          @click="initXlsxForm()"
        >
          Select other file
        </button>
      </div>
      <table class="xlsx-table" border="5">
        <tr>
          <td
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
        <tr
          v-for="(row, index) in selectedFile"
          :key="`row_${index}`"
        >
          <td
            v-for="(val, index) in row"
            :key="`val_${index}`"
          >
            {{ val }}
          </td>
        </tr>
      </table>
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
        Convert
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

export default {
  data () {
    return {
      converted: false,
      isFileInputed: false,
      isValidFileFormat: true,
      maxLength: 0,
      selectedFile: [],
      keyOrders: [],
      valueIndex: null,
      keyOrderArr: []
    };
  },
  props: {},
  created () {},
  methods: {
    fileInputed (event) {
      this.isValidFileFormat = true;
      const hello = event.target.files ? event.target.files[0] : null;
      readXlsxFile(hello).then((rows) => {
        this.selectedFile = rows;
        this.isFileInputed = true;
        const lengths = this.selectedFile.map((row) => row.length);
        this.maxLength = Math.max(...lengths);
        // for (const num of this.maxLength) {
        //   this.keyOrderArr
        // }
        for (let i = 0; i < this.maxLength; i++) {
          this.keyOrderArr.push(false);
        }
      }).catch((error) => {
        console.error(error);
        this.isValidFileFormat = false;
      });
    },
    initXlsxForm () {
      this.converted = false;
      this.isValidFileFormat = true;
      this.isFileInputed = false;
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
      try {
        xlsxJsonConverter(this.selectedFile);
      } catch {
        console.error('Failed to convert!');
        this.isValidFileFormat = false;
      }
    }
  }
}
</script>

<style scoped>
.xlsx-title {
  font-family: 'Marker Felt';
  width: 100%;
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
  color: rgb(225, 78, 78);
}
.convert-button {
  margin-top: 4%;
}
.xlsx-contents-outer {
  height: 90%;
  padding: 10px;
}
.xlsx-contents-inner {
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
.xlsx-convertion-data-area {
}
</style>
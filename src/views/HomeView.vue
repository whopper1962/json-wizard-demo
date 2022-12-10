<template>
  <div class="home">
    <div class="converter-title">
        <!-- <div class="left">
        </div> -->
        <div class="nav-bar">
          <div class="flex">
            <img class="icon" src="wizard.png"/>
            <div>
              <h3 class="title">
                JSON Wizard
              </h3>
              <!-- <span class="github">
                Created by
                <a
                  href="https://github.com/whopper1962"
                  target="_blank"
                  rel="noopener noreferrer"
                >@whopper1962</a>
              </span> -->
            </div>
          </div>
          <div class="right lang-select-box-area">
            <select
              v-model="selectedLang"
              @change="changeLang()"
            >
              <option value="ja">{{ $t('lang.ja') }}</option>
              <option value="en">{{ $t('lang.en') }}</option>
            </select>
          </div>
        </div>
      <!-- <p class="line-height-none">Created by
        <a
          href="https://github.com/whopper1962"
          target="_blank"
          rel="noopener noreferrer"
        >@whopper1962</a>
      </p> -->
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
import xlsxJsonConverter from "@/lib/json-wizard";
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
  font-family: 'Trattatello';
}
.xlsx-json-contents {
  display: table;
  width: 100%;
  /* margin-top: 20px; */
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
.nav-bar {
  margin-top: 0.5%;
  display: flex;
  justify-content: center;
  position: relative;
}
.right {
  position: absolute;
  right: 0;
}
.left {
  position: absolute;
  left: 0;
}
.lang-select-box-area {
  margin-right: 2%;
  margin-top: 1%;
}
.lang-select-box-area select {
  width: 100px;
}
.icon {
  height: 100px;
  margin-right: 5%;
  vertical-align: middle;
}
.created-by {
  font-size: 13px;
}
.flex {
  display: flex;
}
.github {
  font-size: 20px;
  display: block;
  margin-top: 6%;
}
.title {
  font-family: 'Trattatello';
  line-height: 0%;
  font-size: 50px;
  font-weight: bold;
  white-space: nowrap;
  color: rgb(34, 0, 112);
}
</style>

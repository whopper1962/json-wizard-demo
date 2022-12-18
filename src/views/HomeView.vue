<template>
  <div class="home">
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
import xlsxJsonConverter from "@/lib/json-wizard/xlsx-to-json";
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
/* .split-item {
  display: table-cell;
  padding: 10px;
  width: 50%;
} */
/* .split-item-outer {
  position: relative;
} */
@media all and (min-width: 1024px) {
  .split-item {
    display: table-cell;
    padding: 10px;
    width: 50%;
  }
  .split-item-outer {
    height: 70vh;
    width: 50%;
    position: relative;
  }
}

@media all and (min-width: 768px) and (max-width: 1024px) {
  .split-item {
    display: table-cell;
    padding: 10px;
    width: 50%;
  }
  .split-item-outer {
    height: 70vh;
    width: 50%;
    position: relative;
  }
}

@media all and (min-width: 480px) and (max-width: 768px) {
  .split-item {
    padding: 10px;
    width: 50%;
  }
  .split-item-outer {
    width: 94%;
    position: relative;
  }
}

@media all and (max-width: 480px) {
  .split-item {
    padding: 10px;
    width: 50%;
  }
  .split-item-outer {
    width: 94%;
    position: relative;
  }
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
.created-by-whopper {
  font-family: cursive;
  font-weight: bold;
  color: black;
  white-space: nowrap;
  font-size: 20px;
}
.created-by-whopper a{
  text-decoration:none; 
}
.lang-select-box-area select {
  width: 100px;
}
.icon {
  height: 100px;
  margin-right: 17px;
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
.user-manual-link {
  margin-top: 20px;

}
.user-manual-link a {
  color: black;
  text-decoration:none;
  margin-left: 2px;
}
.app-info-list {
  white-space: nowrap;
  list-style:none;
  text-align: left;
  margin-left: 0;
}
.app-info-list li {
}
</style>

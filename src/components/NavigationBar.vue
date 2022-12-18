<template>
  <div class="converter-title">
    <div class="nav-bar">
      <div class="left">
        <ul class="app-info-list">
          <li class="created-by-whopper">
            Created by
            <a
              href="https://github.com/whopper1962"
              target="_blank"
              rel="noopener noreferrer"
            >
              @whopper1962 </a
            ><br />
          </li>
          <li class="user-manual-link top-15">
            <font-awesome-icon icon="fa-solid fa-hand-point-right" />
            <router-link
              class="no-link"
              :to="{
                name: 'HOME',
              }"
              >{{ $t("menu.converter") }}
            </router-link>
          </li>
          <li class="user-manual-link">
            <font-awesome-icon icon="fa-solid fa-hand-point-right" />
            <router-link
              class="no-link"
              :to="{
                name: 'USER_MANUAL',
              }"
              >{{ $t("menu.userManual") }}
            </router-link>
          </li>
        </ul>
      </div>
      <div class="flex">
        <img class="icon" src="wizard.png" />
        <div>
          <h3 class="title">JSON Wizard</h3>
        </div>
      </div>
      <div class="right lang-select-box-area">
        <select v-model="selectedLang" @change="changeLang()">
          <option value="en">{{ $t("lang.en") }}</option>
          <option value="ja">{{ $t("lang.ja") }}</option>
        </select>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      selectedLang: 'ja'
    };
  },
  created () {
    this.selectedLang = localStorage.getItem('lang') || 'ja';
  },
  methods: {
    changeLang () {
      localStorage.setItem('lang', this.selectedLang);
      this.$i18n.locale = localStorage.getItem('lang');
    }
  },
}
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
  margin-top: 3px;
}
.user-manual-link a {
  color: black;
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
.top-15 {
  margin-top: 15px;
}
.no-link {
  text-decoration:none;
  color: black;
  margin-top: 3px;
}
</style>
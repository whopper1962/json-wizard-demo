<template>
<div class="json-view">
  <h3 class="json-title line-height-none">
    {{ $t('json.title') }}
  </h3>
  <div class="json-contents-outer">
    <div class="json-contents-inner">
      <template v-if="converted">
        <div class="json-data-area">
          <button @click="copyJsonToClipbord()">
            {{ $t('json.copyToClipboard') }}
            <font-awesome-icon icon="fa-regular fa-clipboard" class="icon"/>
          </button>
        </div>
        <CodeEditor
          v-model="inputedJson"
        />
        <div
          v-if="isDuplicateKeyError || isInvalidKeyError"
          class="file-input-form"
        >
          <div v-if="isDuplicateKeyError" class="file-format-error">
            ❗️{{ $t('error.duplication') }}
          </div>
          <div v-if="isInvalidKeyError" class="file-format-error">
            ❗️{{ $t('error.nullKey') }}
          </div>
        </div>
      </template>
      <template v-else>
        <div class="json-default-area">
          {{ $t('message.jsonAreaPlaceholder') }}
        </div>
      </template>
    </div>
  </div>
</div>
</template>

<script>
import CodeEditor from '@/components/CodeEditor';

export default {
  components: {
    CodeEditor
  },
  data () {
    return {
      inputedJson: ''
    };
  },
  props: {},
  created () {},
  computed: {
    json: {
      get () {
        const unformatted = this.$store.getters['getJson'];
        return JSON.stringify(unformatted, null, 4);
      }
    },
    isDuplicateKeyError: {
      get () {
        return this.$store.getters['getDuplicationErrorStatus'];
      }
    },
    isInvalidKeyError: {
      get () {
        return this.$store.getters['getInvalidKeyErrorStatus'];
      }
    },
    converted () {
      return Object.keys(JSON.parse(this.json)).length > 0;
    }
  },
  watch: {
    json (newJson) {
      this.inputedJson = newJson;
    }
  },
  methods: {
    copyJsonToClipbord () {
      const jsonToCopy = JSON.stringify(
        JSON.parse(this.inputedJson),
        null,
        4
      );
      navigator.clipboard.writeText(jsonToCopy)
      .then(() => {
        console.log("Copied!");
      })
      .catch((error) => {
        console.error(error);
      });
    },
    convert () {
      console.log('JSON Convert!');
    }
  }
}
</script>

<style scoped>
.json-title {
  font-family: 'Trattatello';
  color: rgb(34, 0, 112);
  width: 100%;
}
.json-view {
  border-radius: 10px;
  border: solid black;
  background-color: rgb(118, 117, 117);
  width: 100%;
  height: 84vh;
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
.convert-button {
  margin-top: 4%;
}
.json-contents-outer {
  height: 90%;
  padding: 10px;
  padding: 0px 10px 10px 10px;
}
.json-contents-inner {
  /* border: solid black; */
  /* background-color: rgb(118, 117, 117); */
  height: 99%;
}
.file-format-error {
  text-align: left;
  margin: 5px;
  padding: 10px;
  background-color: white !important;
  font-family: 'Menlo', sans-serif;
  border: solid black !important;
  color: rgb(255, 52, 52);
}
.json-display-area {
  font-family: 'Menlo', sans-serif;
  height: 80%;
  margin: 20px;
  background-color: rgb(31, 30, 30);
  color: white;
  padding: 20px;
  text-align: left;
  overflow-y: auto;
}
.json-data-area {
  /* margin: 20px; */
  text-align: left;
}
.icon {
  margin-left: 5px;
}
.json-default-area {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  width: 80%;
  height: 3.2rem;
}
</style>
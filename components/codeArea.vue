<template>
  <client-only>
    <codemirror v-model="code" :options="options"></codemirror>
  </client-only>
</template>

<script>
export default {
  props: {
    code: {
      type: String,
      required: true,
      default: ''
    },
  },
  data() {
    return {
      options: {
        tabSize: 2,
        mode: 'text/javascript',
        theme: 'default',
        lineNumbers: true,
        line: true,
        readOnly: true,
      },
    }
  },
}
</script>

<style lang="scss" scoped>

</style>
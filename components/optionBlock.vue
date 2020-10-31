<template>
  <div>
    <div class="title mb-2">{{ title }}</div>

    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
      default: ''
    },
  },
}
</script>

<style lang="scss" scoped>

</style>
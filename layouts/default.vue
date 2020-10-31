<template>
  <v-app>
    <v-app-bar
      app
      dense
      clipped-right
    >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>AdoNuxt</v-toolbar-title>

      <v-spacer />

      <v-toolbar-items>
        <v-btn
          v-for="(item, index) in menuMain"
          :key="index"
          :to="item.link"
          class="text-none"
          nuxt
          text
        >
          <v-icon left>{{ item.icon }}</v-icon>
          {{ item.name }}
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <v-navigation-drawer
      app
      v-model="drawer"
    >
      <v-list>
        <v-list-item
          v-for="(item, index) in menuActions"
          :key="index"
          nuxt
          :to="item.link"
        >
          <v-list-item-icon class="mr-4">
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
        <nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: true,
      menuMain: [
        { name: 'Home', icon: 'mdi-home', link: '/', },
      ],
      menuActions: [
        { name: 'Routes', icon: 'mdi-routes', link: '/routes', },
      ]
    }
  },
}
</script>

<style lang="scss" scoped>

</style>
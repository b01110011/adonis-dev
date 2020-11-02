<template>
  <div>
    <v-container
      fluid
      class="py-0"
    >
      <v-row>
        <v-col>

          <v-card outlined>
            <div class="pa-1 text-right">
              <v-tooltip bottom>
                <template #activator="{ on, attrs }">
                  <v-btn
                    color="indigo"
                    icon
                    small
                    v-bind="attrs"
                    v-on="on"
                    @click="copy"
                  >
                    <v-icon small>mdi-content-copy</v-icon>
                  </v-btn>
                </template>
                <span>Copy to clipboard</span>
              </v-tooltip>
            </div>

            <v-divider />

            <code-area :code="code" />
          </v-card>

        </v-col>
      </v-row>
    </v-container>

    <options>
      <option-block title="Type">
        <v-select
          v-model="type"
          :items="types"
          filled
          dense
        />
      </option-block>

      <option-block title="Route">
        <v-text-field
          v-model="route"
          filled
          dense
          clearable
        />
      </option-block>

      <option-block title="Handler">
        <v-select
          v-model="controller"
          :items="$store.state.controller.controllers"
          label="Controller"
          filled
          dense
          clearable
        />

        <v-select
          v-model="method"
          :items="$store.state.controller.methods"
          label="Method"
          filled
          dense
          clearable
        />

        <v-text-field
          v-model="controllerAndMethod"
          label="Or as string"
          filled
          dense
          clearable
        />
      </option-block>
    </options>
  </div>
</template>

<script>
import clipboard from 'copy-to-clipboard'

export default {
  data() {
    return {
      type: 'get',
      types: ['get', 'post', 'put', 'patch', 'delete', 'options', 'resource', 'group'],
      route: '/path',
      controller: '',
      method: '',
      controllerAndMethod: '',
    }
  },
  computed: {
    code() {
      let code = `Route.${this.method}('${this.path || ''}'`

      if (this.controllerAndMethod) {
        code += `, '${this.controllerAndMethod}'`
      } else if (this.controller) {
        code += `, '${this.controller}.${this.controllerMethod || ''}'`
      }

      code += `)`

      return code
    },
  },
  methods: {
    copy() {
      clipboard(this.code)
    },
  },
}
</script>

<style lang="scss" scoped>

</style>
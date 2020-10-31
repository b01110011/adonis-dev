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
      <option-block title="Method">
        <v-select
          v-model="method"
          :items="methods"
          filled
          dense
        />
      </option-block>

      <option-block title="Path">
        <v-text-field
          v-model="path"
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
          v-model="controllerMethod"
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
      method: 'get',
      methods: ['get', 'post', 'put', 'patch', 'delete', 'options'],
      path: '/path',
      controller: '',
      controllerMethod: '',
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
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

      <option-block v-if="!isGroup" title="Route">
        <v-text-field
          v-model="route"
          placeholder="Path"
          filled
          dense
          clearable
        />
      </option-block>

      <option-block v-if="!isGroup" title="Handler">
        <v-select
          v-model="controller"
          :items="$store.state.controller.controllers"
          label="Controller"
          filled
          dense
          clearable
        />

        <v-select
          v-if="!isResource"
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

      <option-block v-if="isResource">
        <v-checkbox
          class="ml-2 mt-0"
          v-model="apiOnly"
          label="Api Only"
          dense
        />

        <v-select
          v-model="except"
          :items="resourceMethods"
          label="Except"
          filled
          dense
          multiple
          clearable
        />

        <v-select
          v-model="only"
          :items="resourceMethods"
          label="Only"
          filled
          dense
          multiple
          clearable
        />
      </option-block>

      <option-block v-if="isGroup" title="Prefix">
        <v-text-field
          v-model="prefix"
          filled
          dense
          clearable
        />
      </option-block>

      <option-block v-if="!isResource" :title="`${isGroup ? 'Group' : 'Route'} Name`">
        <v-text-field
          v-model="routeName"
          placeholder="Name"
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
      apiOnly: false,
      except: [],
      only: [],
      resourceMethods: ['index', 'create', 'store', 'show', 'edit', 'update', 'destroy'],
      prefix: '',
      name: '',
    }
  },
  computed: {
    code() {
      // type
      let code = `Route\n\t.${this.type}(`

      // group
      if (this.isGroup) {
        code += `() => {\n\t\t\n\t})`

        // prefix
        if (this.prefix)
          code += `\n\t.prefix('${this.prefix || ''}')`
      } else {
        code += `'${this.route || ''}'`

        if (this.controllerAndMethod) {
          code += `, '${this.controllerAndMethod}'`
        } else if (this.controller) {
          code += `, '${this.controller}`

          if (!this.isResource)
            code += `.${this.method || ''}`

          code += `'`
        }

        code += `)`
        
        if (this.isResource) {
          // apiOnly
          if (this.apiOnly)
            code += '\n\t.apiOnly()'

          // except
          if (this.except.length)
            code += `\n\t.except(['${this.except.join(`', '`)}'])`
          
          // only
          if (this.only.length)
            code += `\n\t.only(['${this.only.join(`', '`)}'])`
        }
      }

      // route/group name
      if (!this.isResource && this.name) {
        code += `\n\t.as('${this.name || ''}')`
      }

      return code
    },
    isResource() {
      return this.type === 'resource'
    },
    isGroup() {
      return this.type === 'group'
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
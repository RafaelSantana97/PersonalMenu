/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import colors from 'vuetify/lib/util/colors'

// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    themes: {
      light: {
        colors: {
          primary: colors.red.darken2,
          secondary: colors.red.lighten4,
        },
      },
      dark: {
        colors: {
          background: '#1a1a1a',
          primary: '#42b883',
          secondary: '#42b883',
        },
      },
    },
  },
})

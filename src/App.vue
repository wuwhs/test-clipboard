<template>
  <div id="app">
    <input v-model="value" />
    <button class="btn"
      v-clipboard
      :data-clipboard-text="value">Copy</button>
  </div>
</template>

<script>
import ClipboardJS from 'clipboard'

export default {
  name: 'App',

  data() {
    return {
      value: 'https://github.com/zenorocha/clipboard.js.git',
      show: true,
    }
  },

  directives: {
    clipboard: {
      inserted(el) {
        const clipboard = new ClipboardJS(el)
        clipboard.on('success', function (e) {
          console.info('Action:', e.action)
          console.info('Text:', e.text)
          console.info('Trigger:', e.trigger)

          e.clearSelection()
        })

        clipboard.on('error', function (e) {
          console.error('Action:', e.action)
          console.error('Trigger:', e.trigger)
        })
      },
    },
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

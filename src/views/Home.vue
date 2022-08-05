<template>
  <div class="uk-container">
    <Make v-if="mode === 'MAKE'" :items="items" @complete="toPlay"/>
    <Play v-if="mode === 'PLAY'" :items="items" @back="backToMake"/>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import Play from '@/views/Play.vue'
import Make from '@/views/Make.vue'
import RouletteItem from '@/classes/rouletteItem.js'

export default {
  name: 'Home',
  components: {
    Play,
    Make
  },
  data() {
    // load items
    let loadedItems = JSON.parse(localStorage.getItem('items'))
    if (!loadedItems) {
        loadedItems = []
    }
    console.log('loaded!!')
    console.log(loadedItems)
    let convertedItems = []
    for (let li of loadedItems) {
      let once = !['normal', 'number-in'].includes(li.type)
      let tmpItem = new RouletteItem(li.id, li.text, li.type, once)
      tmpItem.setNumbers(li.numbers)
      convertedItems.push(tmpItem)
    }
    console.log(convertedItems)

    // let initItems = convertedItems || sampleItems
    let initItems = convertedItems

    return {
      items: initItems,
      mode: 'MAKE'
    }
  },
  methods: {
    toPlay(newItems) {
      console.log('new item!!!')
      console.log(newItems)
      // console.log(newItems.items)
      for (let item of newItems) {
        if (['normal', 'number-in'].includes(item.type)) {
          item.once = false
        } else {
          item.once = true
        }
        item.hide = false
      }
      this.items = newItems
      localStorage.setItem('items',JSON.stringify(this.items.map(x => x.toDict())))
      this.mode = 'PLAY'
      window.scroll({top: 0});
    },
    backToMake() {
      console.log('back to make')
      this.mode = 'MAKE'
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card {
  padding: 0.5em 1em;
  margin: 2em 0;
  background-color: #f2f2f2;
  /* background-color: rgba(255, 255, 255,0.5); */
  box-shadow: 2px 2px 6px #707070;
}
h2 {
  color: #707070;
}
h4 {
  color: #707070;
  margin-top: 20px;
  margin-bottom: 20px;
  line-height: 0px;
}
input[type=text].project-name {
  margin-bottom: 0pt;
  margin-right: 5pt;
  background-color: transparent;
  padding: 0pt;
  border: none;
  height: auto;;
  font-weight: normal;
  font-size: 20px;
  font-size: 3.0rem;
  color: #707070;
}
.add-task-button {
  color: #707070;
}
span.text-button {
  cursor: pointer;
  color: #707070;
}
.right-button {
  text-align: right;
}
</style>

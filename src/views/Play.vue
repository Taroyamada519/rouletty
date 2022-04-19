<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div class="uk-card uk-card-default uk-card-body item-card">
      <div class="roulette-item"
           v-for="i in localItems"
           :key="i.id"
           v-show="!i.hide"
           :class="{selected: isSelected(i.id)}"
      >
        {{i.showText()}}
      </div>
      <h3>{{selectedItem.showText()}}</h3>
      <a v-if="stopFlag" class="uk-button uk-button-primary under-button" @click="start()">play</a>
      <a v-else class="uk-button uk-button-primary under-button" @click="stop()">stop</a>
    </div>
    <!-- <a class="uk&#45;button uk&#45;button&#45;default under&#45;button" @click="addItem()">add</a> -->
    <!-- <a class="uk&#45;button uk&#45;button&#45;primary under&#45;button" @click="complete()">complete</a> -->
    <a class="uk-button uk-button-text under-button" @click="back()">back</a>
    <div v-if="debug_mode">
      <div v-for="i in localItems" :key="i.id">
        <hr />
        {{i}}
        <hr />
      </div>
      <br />
      <br />
      Selected:
      <br />
      {{selectedItem}}
    </div>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'Play',
  components: {
    // TaskList
  },
  props: {
    items: Array
  },
  data() {
    return {
      debug_mode: false,
      // debug_mode: true,
      selectedId: 0,
      num: 1,
      // localItems: this.items,
      stopFlag: true,
      localItems: _.cloneDeep(this.items)  // deep copy
    }
  },
  computed: {
    selectedItem() {
      // return this.localItems[this.num]
      return this.localItems.filter(x => x.id == this.selectedId)[0]
    }
  },
  methods: {
    start() {
      console.log('start!')
      let availableIdList = this.localItems.filter(x => !x.hide).map(x => x.id)
      // this.selectedId = availableIdList[parseInt(Math.random() * availableIdList.length)]

      let idx = 0
      this.stopFlag = false
      this.roll(availableIdList, idx, 100)
    },
    roll(availableIdList, idx, ms) {
      setTimeout(() => {
        // ここに遅らせた後に行いたい処理を書く。関数でもOK
        if (this.stopFlag) {
          this.localItems.filter(x => x.id == this.selectedId)[0].atSelected(this.localItems)
          return 0
        } 
        this.selectedId = availableIdList[idx]
        if (idx < availableIdList.length - 1) {
          idx++
        } else {
          idx = 0
        }
        this.roll(availableIdList, idx, ms)
      }, ms)
    },
    stop() {
      this.stopFlag = true
    },
    back() {
      console.log('back')
      this.$emit('back')
    },
    isSelected(id) {
      return id === this.selectedId
    }
  }
}
</script>

<style scoped>
.item-card {
  margin: 50px;
}
.under-button {
  margin-bottom: 30px;
}
.roulette-item {
  /* color: red; */
  border: 3px solid #e5e5e5;
  margin: 10px;
  padding: 10px;
}
.selected {
  color: #1e87f0;
  border: 3px solid #1e87f0;
}
</style>

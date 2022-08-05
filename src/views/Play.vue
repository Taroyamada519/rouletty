<template>
  <div class="about">
    <h1>Let's play with your own roulette!!</h1>
    <div class="uk-card uk-card-default uk-card-body item-card">
      roll speed:
      <div class="uk-margin">
        <input class="uk-range uk-form-width-medium" type="range" v-model="rollSpeedFps" min="1" max="100" step="1">
      </div>
      <a v-if="stopFlag" class="uk-button uk-button-primary under-button" @click="start()">play</a>
      <a v-else class="uk-button uk-button-primary under-button" @click="stop()">stop</a>
      <!-- rollSpeedFps: {{rollSpeedFps}} -->
      <div class="roulette-item"
           v-for="i in localItems"
           :key="i.id"
           v-show="!i.hide"
           :class="{selected: isSelected(i.id)}"
      >
        {{i.showText()}}
      </div>
      <h3>{{selectedItem.showText()}}</h3>
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
      rollSpeedFps: 50,
      localItems: _.cloneDeep(this.items)  // deep copy
    }
  },
  computed: {
    selectedItem() {
      // return this.localItems[this.num]
      return this.localItems.filter(x => x.id == this.selectedId)[0]
    },
    rollingTime() {
      return 1000.0 / this.rollSpeedFps
    }
  },
  methods: {
    start() {
      console.log('start!')
      let availableIdList = this.localItems.filter(x => !x.hide).map(x => x.id)
      // this.selectedId = availableIdList[parseInt(Math.random() * availableIdList.length)]

      let idx = 0
      this.stopFlag = false
      this.roll(availableIdList, idx, this.rollingTime)
    },
    roll(availableIdList, idx) {
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
        this.roll(availableIdList, idx)
      }, this.rollingTime)
    },
    rollStaticTime(availableIdList, idx, ms) {
      // 保存用に残してるだけで, 現状使っていない
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
        this.rollStaticTime(availableIdList, idx, ms)
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

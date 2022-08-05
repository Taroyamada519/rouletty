<template>
  <div class="about">
    <h1>Let's make your own roulette!!</h1>
    <div class="uk-margin howto-use">
      <h2>使い方</h2>
      <i class="material-icons va-middle" @click="addItem()">add_circle_outline</i>
      ボタンを押して、ルーレットの項目を追加します。
      項目を追加し終えたら、「COMPLETE」ボタンを押してください。ルーレットが作成されます。
      項目には以下の５種類を設定できます。
      <ul>
        <li>normal</li>
        <li>number-in</li>
        <li>plus-number</li>
        <li>multiply-numbers</li>
        <li>add-text</li>
      </ul>
      <h3>normal</h3>
      普通の項目です。単に入力したテキストがそのまま表示されます。
      <h3>number-in</h3>
      テキストの中に数字を入れることが出来る項目です。
      テキストの中に&lt;&lt;&lt;&gt;&gt;&gt;を入れると、その部分が下の方に表示されている数字に置き換わります。
      1番目の&lt;&lt;&lt;&gt;&gt;&gt;には1番目の数字が入り、2番目の&lt;&lt;&lt;&gt;&gt;&gt;には2番目の数字が入り...
      という風になっております。数字は最大で5個まで入れられます。
      <h3>plus-numbers</h3>
      number-inの中にある数字を足します。
      1番目の&lt;&lt;&lt;&gt;&gt;&gt;には1番目の数字を足し、2番目の&lt;&lt;&lt;&gt;&gt;&gt;には2番目の数字を足し...
      という風になっております。数字は最大で5個まで入れられます。
      <h3>multiply-numbers</h3>
      number-inの中にある数字を掛けます。
      1番目の&lt;&lt;&lt;&gt;&gt;&gt;には1番目の数字を掛け、2番目の&lt;&lt;&lt;&gt;&gt;&gt;には2番目の数字を掛け...
      という風になっております。数字は最大で5個まで入れられます。
      <h3>add-text</h3>
      normalとnumber-inのテキストの末尾に、このアイテムのテキストを追加します。
      <br>
      <br>
      <a @click="setSampleItems()">サンプルをセット</a>
    </div>
    <div class="uk-card uk-card-default uk-card-body item-card" v-for="i in localItems" :key="i.id">
      <h3 class="uk-card-title">{{i.showText()}}</h3>
      <div class="right-button">
        <span class="material-icons text-button delete-button" @click="deleteItem(i.id)">delete</span>
      </div>
      <div class="uk-margin">
        <input v-model="i.text" type="text" class="uk-input">
      </div>
      <!-- <div class="uk&#45;margin uk&#45;grid&#45;small uk&#45;child&#45;width&#45;auto uk&#45;grid"> -->
      <!--   <label v&#45;for="it in itemTypes" :key="it.id"> -->
      <!--     <input type="radio" class="uk&#45;radio" v&#45;model="i.type" :value="it.value">{{it.value}} -->
      <!--   </label> -->
      <!-- </div> -->
      <select v-model="i.type" class="uk-select">
        <option disabled value="">Please select one</option>
        <option v-for="it in itemTypes" :key="it.id">{{it.value}}</option>
      </select>

      <div class="uk-margin" v-if="i.type === 'number-in'|| i.type === 'plus-numbers'|| i.type === 'multiply-numbers'">
        <input class="uk-input uk-form-width-xsmall" type="number" v-model.number="i.numbers[0]">
        <input class="uk-input uk-form-width-xsmall" type="number" v-model.number="i.numbers[1]">
        <input class="uk-input uk-form-width-xsmall" type="number" v-model.number="i.numbers[2]">
        <input class="uk-input uk-form-width-xsmall" type="number" v-model.number="i.numbers[3]">
        <input class="uk-input uk-form-width-xsmall" type="number" v-model.number="i.numbers[4]">
      </div>
      <!-- <a class="uk&#45;button uk&#45;button&#45;danger delete&#45;button" @click="deleteItem(i.id)">delete</a> -->
      <!-- {{i}} -->
    </div>
    <i class="material-icons add-button" @click="addItem()">add_circle_outline</i>
    <!-- <a class="uk&#45;button uk&#45;button&#45;default under&#45;button" @click="addItem()">add</a> -->
    <div class="uk-margin">
      <a class="uk-button uk-button-default under-button" @click="dumpToJson">
        <i class="material-icons va-middle">file_download</i>
        download
      </a>
      <div uk-form-custom>
        <input type="file" @change="loadFromJson"/>
        <button class="uk-button uk-button-default upload-button" type="button" tabindex="-1">
          <i class="material-icons va-middle">file_upload</i>
          Upload
        </button>
      </div>
    </div>


    <a class="uk-button uk-button-primary under-button" @click="complete()">complete</a>
    <div v-if="debug_mode">
      <div v-for="i in items" :key="i.id">
        <hr />
        {{i}}
        <hr />
      </div>
    </div>
    <br/>
    <br/>
  </div>
</template>

<script>
import RouletteItem from '@/classes/rouletteItem.js'
import sampleItems from '@/assets/json/sample_items.json'
import {toRaw} from 'vue'

export default {
  name: 'Make',
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
      localItems: this.items,
      itemTypes: [
        {id: 0, value: 'normal'},
        {id: 1, value: 'number-in'},
        {id: 2, value: 'plus-numbers'},
        {id: 3, value: 'multiply-numbers'},
        {id: 4, value: 'add-text'}
      ]
    }
  },
  // mounted() {
  //   this.localItems = this.items,
  // }
  computed: {
    // selectedItem() {
    //   // return this.items[this.num]
    //   return this.items.filter(x => x.id == this.selectedId)[0]
    // }
  },
  methods: {
    // start() {
    //   console.log('start!')
    //   let availableIdList = this.items.filter(x => !x.hide).map(x => x.id)
    //   this.selectedId = availableIdList[parseInt(Math.random() * availableIdList.length)]
    //   this.items.filter(x => x.id == this.selectedId)[0].atSelected(this.items)
    // },
    complete() {
      console.log('complete!!')
      console.log(toRaw(this.localItems))

      // dataオプションを通すと、Proxyオブジェクトとなるため、オリジナルの値にはtoRawを使ってアクセスする必要があるらしい。
      // なのでtoRaw関数を使って中の値を返す必要がある。クソすぎる。
      // 参考: https://qiita.com/laineus/items/d1f1f7972f521556a788
      this.$emit('complete', toRaw(this.localItems))
    },
    addItem() {
      let newItemId = 0
      if (this.localItems.length > 0) {
        // アイテムが空でなければauto incrementでidを振る
        // 空の場合はid=0のまま
        newItemId = Math.max(...this.localItems.map(x => x.id)) + 1
      }
      // console.log(newItemId)
      let newItem = new RouletteItem(newItemId, 'new item.', 'number-in', false)
      newItem.setNumbers([0, 0, 0, 0, 0])
      this.localItems.push(newItem)
    },
    deleteItem(id) {
      console.log(id)
      this.localItems = this.localItems.filter(x => x.id != id)
    },
    dumpToJson() {
      let saving = JSON.stringify(this.items.map(x => x.toDict()), null, '    ')
      console.log(saving)
      let blob = new Blob([saving], {type: 'application/json'})
      console.log(blob)
      // let url = URL.createObjectURL(blob);
      // ダウンロードリンクを生成
      let link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = 'dump.json'
      document.body.appendChild(link)
      link.click()
      // ダウンロードリンクを破棄
      document.body.removeChild(link)
    },
    loadFromJson(e) {
      // JSONファイルの読み込み
      e.preventDefault()
      let file = e.target.files[0]
      let reader = new FileReader()
      reader.readAsText(file)
      reader.onload = () => {
        // yomikomi
        console.log('load from file!!!')
        console.log(reader.result)
        let loadedItems = JSON.parse(reader.result)
        console.log('loaded!!')
        console.log(loadedItems)
        // TODO: 上の処理と同じなので後でまとめる
        let convertedItems = []
        for (let li of loadedItems) {
          let once = !['normal', 'number-in'].includes(li.type)
          let tmpItem = new RouletteItem(li.id, li.text, li.type, once)
          tmpItem.setNumbers(li.numbers)
          convertedItems.push(tmpItem)
        }
        this.localItems = convertedItems
      }
    },
    setSampleItems() {
      console.log(sampleItems)
      let convertedItems = []
      for (let si of sampleItems) {
        let once = !['normal', 'number-in'].includes(si.type)
        let tmpItem = new RouletteItem(si.id, si.text, si.type, once)
        tmpItem.setNumbers(si.numbers)
        convertedItems.push(tmpItem)
      }
      this.localItems = convertedItems
    }
  }
}
</script>

<style scoped>
.item-card {
  margin: 50px;
}
.delete-button {
  margin-top: 20px;
}
.right-button {
  text-align: right;
}
.under-button {
  margin: 5px;
}
.va-middle {
  vertical-align:middle;
}
.delete-button {
  cursor: pointer;
}
.add-button {
  cursor: pointer;
  color: #666;
  font-size: xxx-large;
}
/* .color666 { */
/*   color: #666; */
/* } */
.uk-button-default {
  color: #666;
}
.upload-button {
  cursor: pointer;
}
.howto-use {
  padding: 0px 70px;
  text-align: left;
}
</style>

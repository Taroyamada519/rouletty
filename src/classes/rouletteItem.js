export default class RouletteItem {
  constructor(id, text, type, once) {
    this.id = id
    this.text = text
    this.type = type
    this.once = once
    this.hide = false
  }

  sayFuga() {
    return 'fuga'
  }

  toDict() {
    return {
      id: this.id,
      text: this.text,
      type: this.type,
      numbers: this.numbers || [],
    }
  }

  setNumbers(numbers) {
    if (this.type == 'number-in' || this.type == 'plus-numbers' || this.type == 'multiply-numbers') {
      this.numbers = numbers
    } else {
      // console.error('not number-in type.')
      console.log('not number-in type.')
      this.numbers = []
    }
  }

  // Example: let hogeItem2 = new RouletteItem('hoge|-[32]-|hoge', 'number-in')
  showText() {
    if (this.type == 'number-in') {
      let result = this.text
      let counter = 0
      while (result.search('<<<>>>') > 0) {
        result = result.replace('<<<>>>', this.numbers[counter])
        // console.log(result.search('<<<>>>'))
        counter++
        if (counter > 100) { // 無限ループ防止
          break
        }
      }
      return result
    } else {
      return this.text
    }
  }

  atSelected(items) {
    console.log('selected: ' + this.text)
    if (this.type == 'plus-numbers') {
      console.log('plus.')
      for (let item of items) {
        if (item.type == 'number-in') {
          for (let i = 0; i < item.numbers.length; i++) {
            item.numbers[i] += this.numbers[i]
          }
        }
      }
    } else if (this.type == 'multiply-numbers') {
      console.log('multiply.')
      for (let item of items) {
        if (item.type == 'number-in') {
          for (let i = 0; i < item.numbers.length; i++) {
            item.numbers[i] *= this.numbers[i]
          }
        }
      }
    } else if (this.type == 'add-text') {
      console.log('add "' + this.text + '"')
      for (let item of items) {
        if (item.type == 'normal' || item.type == 'number-in') {
          item.text += this.text
        }
      }
    }

    if (this.once) {
      this.hide = true
    }

    return items
    // if (this.atSelectedExtra) {
    //   this.atSelectedExtra()
    // }
  }
}

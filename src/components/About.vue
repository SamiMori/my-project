<template>
  <div class="hello">
    <h1>{{msg}}</h1>
    <div>
      <input type="text" v-model="text">
      <button @click="save">Save</button>
    </div>
    <p v-for="(t, index) in saveText" :key="index"><strong>{{t.text}}</strong> {{t.date}}</p>
  </div>
</template>

<script>
export default {
  name: 'About',
  data () {
    return {
      msg: 'Welcome to Your About Page!!',
      text: '',
      saveText: []
    }
  },
  methods: {
    save () {
      var date = new Date()
      var minute = date.getMinutes()
      var hour = date.getHours()
      this.saveTexts.push({text: this.text, date: `${hour}:${minute}`})
      this.text = ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

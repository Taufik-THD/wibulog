<template lang="html">
  <div class="" style="margin: 5% 0 0 0;">
    <div class="container">
      <div class="input-field col s6">
        <p>Title</p>
        <input id="title" type="text" class="validate" v-model='newTitle'>
      </div>
      <div class="input-field col s12">
        <p>Article</p>
        <Vueditor ref="editor" style="position:static;"></Vueditor>
      </div>
      <br>
      <br>
      <div class="row">
        <div class="col s6">
          <a class="btn btn-block" @click='postUpdate'>Update</a>
        </div>
        <div class="col s6">
          <a class="btn btn-block" @click='cancel'>Cancel</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Vueditor from 'vueditor'

export default {
  data () {
    return {
      dataEdit: null,
      newTitle: ''
    }
  },
  component : {
    Vueditor
  },
  created () {
    this.newTitle = this.$store.state.detail.title
    this.dataEdit = this.$store.state.detail
  },
  mounted () {
    this.$refs.editor.setContent(this.$store.state.detail.article)
  },
  methods : {
    cancel () {
      this.$refs.editor.setContent('')
      this.dataEdit = null
      this.$router.push('/')
    },
    postUpdate () {
      const data = {
        id: this.dataEdit._id,
        title: this.newTitle,
        article: this.$refs.editor.getContent()
      }

      axios({
        method: 'post',
        url: 'http://35.240.214.13 /article/edit',
        data: data
      }).then(response => {
        this.$store.dispatch('openDetail', response.data[0])
        this.$router.push('/')
      }).catch(err => {
        console.log(err);
      })
    }
  }
}
</script>

<style lang="css">
</style>

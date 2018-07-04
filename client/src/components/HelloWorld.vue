<template>
  <div class="hello">
    <img src="https://i.pinimg.com/564x/6c/e0/5d/6ce05d020ed8a13c76dbc82792720a58.jpg" alt="" style="width:29%; position:fixed; margin: 6% 0 0 15%;">
    <div class="">
      <div class="container" style="padding: 7% 0 0 0;" v-if='login == false && detail == null'>
        <div class="row">
          <div class="col s12 m8">
            <div class="card grey darken-4 slide-fwd-bottom" v-for='article in articles'>
              <div class="card-content white-text" style="text-align: left">
                <div class="row">
                  <div class="col" style="margin: 0 0 -15% 0 ;">
                    <span class="card-title">{{ article.title }}</span>
                  </div>
                  <div class="col right">
                    <p>{{ article.date }}</p>
                  </div>
                </div>
                <pre>From: {{ article.UserId.username }}</pre>
                <p v-html="article.article.split(' ').slice(0, 100).join(' ')"></p>
              </div>
              <div class="card-action">
                <a class="btn btn-block red darken-4" style="width:50%; color:white; margin: 0 0 0 50%;" @click='getDetail(article)'>Open this article</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row" style="margin: 0% 0 0 5%;" v-if='detail != null'>
        <div class="col s12 m12">
          <div class="card white slide-fwd-bottom">
            <div class="card-content" style="text-align: left">
              <div class="row">
                <div class="col" style="margin: 0 0 0 0 ;">
                  <h3 class="card-title"> <b>{{ detail.title }}</b> </h3>
                </div>
                <div class="col right">
                  <p>{{ detail.date }}</p>
                </div>
              </div>
              <pre>Author: {{ detail.UserId.username }}</pre>
              <p style="margin: 0 0 0 2%;" v-html="detail.article"></p>
            </div>
            <div class="card-action">
              <div class="row">
                <br>
                <div class="col s4" v-if='isUser == true'>
                  <a class="btn btn-block red darken-4" style="width:100%; color:white; margin: 0 0 0 0;" @click='edit ()'>Edit this article</a>
                </div>
                <div class="col s4"  v-if='isUser == true'>
                  <a class="btn btn-block red darken-4" style="width:100%; color:white; margin: 0 0 0 0;" @click='deleteItem(detail._id)'>Delete this article</a>
                </div>
                <div class="col s4">
                  <a class="btn btn-block red darken-4" style="width:100%; color:white; margin: 0 0 0 0;" @click='back'>Back</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      isUser: false
    }
  },
  name: 'HelloWorld',
  props: {
    msg: String
  },
  created () {
    this.getAllArticle()
    // this.checkToken()
    // this.checkUser()
  },
  computed : {
    login () {
      return this.$store.state.loginForm
    },
    articles () {
      return this.$store.state.articles
    },
    detail () {
      return this.$store.state.detail
    },
    isLogin () {
      return this.$store.state.isLogin
    }
  },
  methods: {
    getAllArticle () {
      this.$store.dispatch('getAllArticle')
    },
    getDetail (article) {
      if (this.isLogin == true) {
        if (this.$store.state.profile._id == article.UserId._id) {
          this.isUser = true
          this.$store.dispatch('openDetail', article)
        } else {
          this.$store.dispatch('openDetail', article)
        }
      } else {
        this.$store.dispatch('openDetail', article)
      }
    },
    back () {
      this.isUser = false
      this.$store.dispatch('closeDetail')
    },
    edit () {
      this.$router.push('edit')
    },
    deleteItem (id) {
      const data = {
        id: id
      }
      swal("Are you sure want to delete this article?", {
        dangerMode: true,
        buttons: true,
      })
      .then((accept) => {
        if (accept) {
          axios({
            method: 'delete',
            url: `http://localhost:3000/article/${id}`
          }).then(response => {
            this.getAllArticle()
            this.$router.push('/')
            this.$store.dispatch('closeDetail')
            this.$store.dispatch('close')
            swal({
              title: "Yosh!",
              text: `Article with title ${response.data.title} was deleted!`,
              icon: "success",
            });
          })
        }
      }).catch(err => {
        console.log(err);
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
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
.slide-fwd-bottom {
  -webkit-animation: slide-fwd-bottom 0.45s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
          animation: slide-fwd-bottom 0.45s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}
/* ----------------------------------------------
 * Generated by Animista on 2018-7-2 19:13:53
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

/**
 * ----------------------------------------
 * animation slide-fwd-bottom
 * ----------------------------------------
 */
@-webkit-keyframes slide-fwd-bottom {
  0% {
    -webkit-transform: translateZ(0) translateY(-110%);
            transform: translateZ(0) translateY(-110%);
  }
  100% {
    -webkit-transform: translateZ(160px) translateY(-10%);
            transform: translateZ(160px) translateY(0px);
  }
}
@keyframes slide-fwd-bottom {
  0% {
    -webkit-transform: translateZ(0) translateY(-110%);
            transform: translateZ(0) translateY(-110%);
  }
  100% {
    -webkit-transform: translateZ(160px) translateY(-10%);
            transform: translateZ(160px) translateY(0px);
  }
}
</style>

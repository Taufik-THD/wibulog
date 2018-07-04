<template>
  <div class="nav" style="background-color:white; margin: 0 0 0 0; position:fixed;">
    <img src="@/assets/153061742310103255.png" alt="" style="position:fixed; width: 10%; margin: -1.5% 0 0 3%;" v-if='detail == null'>
    <div class="input-field">
      <nav class="slide-fwd-bottom" style="background-color:rgba(0, 0, 0, 0);">
        <div class="item" style="margin: 65% 0 0 0;">
          <ul id="nav transparent" class="">
            <li><a class="btn waves-effect waves-dark white btn-large" style="transform: rotate(270deg); width:160%; height:20%; margin: 15% 0 0 -59%; color:black" @click='profile' v-if='isLogin == true'>My Profile</a> </li>
            <li><a class="btn waves-effect waves-dark white btn-large" style="transform: rotate(270deg); width:180%; height:20%; margin: 129% 0 0 -69%; color:black" @click='addNewArticle' v-if='isLogin == true'>Add New Article</a> </li>
            <li><a class="btn waves-effect waves-dark white btn-large" style="transform: rotate(270deg); width:160%; height:5%; margin: 128% 0 0 -59%; color:black" @click='logout' v-if='isLogin == true'>Logout</a> </li>
            <li><a class="btn waves-effect waves-dark white btn-large" style="transform: rotate(270deg); width:285%; height:50%; margin: 67% 0 0 -119%; color:black" @click='activeLogin' v-if='isLogin == false'>Login</a> </li>
            <li><a class="btn waves-effect waves-dark white btn-large" style="transform: rotate(270deg); width:233%; height:50%; margin: 187% 0 0 -98%; color:black" @click='register' v-if='isLogin == false'>Register</a> </li>
          </ul>
        </div>
      </nav>
      <div class="row slide-fwd-bottom" style="position:fixed; margin: -3% 0 0 32%;" v-if='loginForm == true'>
        <div class="col s9 m9">
          <div class="card grey lighten-3">
            <div class="card grey lighten-1">
            <span class="card-title"> <b>Sign In</b> </span>
            </div>
            <div class="card-content" style="margin-bottom:40%;">
              <div class="input-field col s12">
                <input id="email" type="email" class="validate" v-model='loginData.email'>
                <label for="email">Email</label>
              </div>
              <div class="input-field col s12">
                <input id="password" type="password" class="validate" v-model='loginData.password'>
                <label for="password">password</label>
              </div>
            </div>
            <div class="card-action">
              <div class="row" style="margin: 0 0 1% 0;">
                <div class="col s12">
                  <div class="col s6">
                    <a class="btn btn-block center grey darken-4" style="margin: 2% 2% 0 0; width:100%;" @click='login'>Sign In</a>
                  </div>
                  <div class="col s6">
                    <a class="btn btn-block center grey darken-4" style="margin: 2% 2% 0 0; width:100%;" @click='nonactiveLogin'>Cancel</a>
                  </div>
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
      loginData: {
        email: '',
        password: ''
      }
    }
  },
  created () {
    this.checkToken()
  },
  computed : {
    loginForm () {
      return this.$store.state.loginForm
    },
    detail () {
      return this.$store.state.detail
    },
    isLogin () {
      return this.$store.state.isLogin
    }
  },
  methods: {
    checkToken () {
      // if (!localStorage.getItem('authorization')) {
      //   this.isLogin = false
      // } else {
      //   this.isLogin = true
      // }
    },
    activeLogin () {
      this.$store.dispatch('activeLogin')
    },
    nonactiveLogin () {
      this.$store.dispatch('nonactiveLogin')
    },
    register () {
      this.$router.push('register')
    },
    login () {
      const userData = {
        email: this.loginData.email,
        password: this.loginData.password
      }

      axios({
        method: 'post',
        url: 'http://localhost:3000/users',
        data: userData
      }).then(response => {
        this.$store.dispatch('profileInfo', response.data.userInfo)
        this.$store.dispatch('nonactiveLogin')
        this.loginData.email = ''
        this.loginData.password = ''
        localStorage.setItem('authorization', response.data.jwtToken+'*#$_.'+response.data.userInfo._id)
        this.$store.dispatch('profile')
        this.$store.dispatch('login')
        this.checkToken()
        this.$router.push('/')
      }).catch(err => {
        this.loginData.email=''
        this.loginData.password=''
      })
    },
    addNewArticle () {
      this.$router.push('add')
    },
    profile () {
      // this.$router.push('profile')
    },
    logout () {
      swal("Are you sure want to logout?", {
        dangerMode: true,
        buttons: true,
      })
      .then((accept) => {
        if (accept) {
          localStorage.clear()
          this.$store.dispatch('login')
          this.checkToken()
          this.$router.push('/')
          this.$store.dispatch('logout')
        }
      })
    }
  }
}
</script>

<style lang="css">
.nav {
    height: 100%;
    width: 4%;
    position: fixed;
    top: 0;
    left: 0;
    overflow-x: hidden;
    padding-top: 20px;
}

nav {
    width: 100%;
    height: 56px;
}

.sidenav a {
    padding: 6px 6px 6px 32px;
    text-decoration: none;
    font-size: 25px;
    color: #818181;
    display: block;
}

.sidenav a:hover {
    color: #f1f1f1;
}

.main {
    margin-left: 200px;
}

@media screen and (max-height: 450px) {
  .sidenav {padding-top: 15px;}
  .sidenav a {font-size: 18px;}
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

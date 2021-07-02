<template>
  <div class=" h-100 login__admin d-flex">
    <div class="flex-grow-1">
      <div class="h-100 bg-cover d-flex align-items-center login__admin-bg">
          <div class="container">
            <div class="row">
              <div class="col-xl-4 mx-auto">
                <div class="cards">
                  <div class="login__admin-body">
                    <div class="login__admin-title mb-5">
                      <h3 class="login__admin-text">
                        Welcome to HONO CMS
                      </h3>
                      <p class="fs-12">Login to your account.</p>
                    </div>
                    <div v-if="error.length > 0" class="">
                      {{error}}
                    </div>
                    <div class="login__admin-form">
                      <p-input placeholder="Email" class="mb-3" v-model="email" type="text"></p-input>
                      <p-input placeholder="Password" class="mb-3" v-model="password" type="text"></p-input>
                      <button @click="handleLogin" class="btn btn--primary ">Login</button>
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
import {mapActions,mapState} from 'vuex'
import {SIGN_IN} from "../../store/modules/auth";
export default {
  name:'LoginAdmin',
  data(){
    return{
      email:'',
      password:''
    }
  },
  computed:{
    ...mapState('auth',{
          error:(state)=>state.message
        }
    )
  },
  methods:{
    ...mapActions('auth',[SIGN_IN]),
     handleLogin(){
      let params = {
        email:this.email,
        password:this.password
      }
     this[SIGN_IN](params)

    }
  }
}
</script>
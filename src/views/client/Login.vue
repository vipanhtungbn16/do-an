<template>
<div class="login__client">
      <div class="container-ct">
        <div class="form-container">
          <div class="signin-signup">
            <div class="login__client-signin form mx-auto">
              <div class="login__client-body">
                <div class="login__client-title  mb-5">
                  <h3 class="login__client-text">
                    Welcome to HONO CMS
                  </h3>
                  <p class="fs-12">Login to your account.</p>
                </div>
                <div class="login__client-form">
                  <p-input placeholder="Email" class="mb-3" type="text"></p-input>
                  <p-input placeholder="Password" class="mb-3" type="text"></p-input>
                  <button class="btn btn--primary ">Login</button>
                </div>
              </div>
            </div>
            <div class="login__client-signup form mx-auto">
              <div class="login__client-body">
                <div class="login__client-title mb-5">
                  <h3 class="login__client-text">
                    Welcome to HONO CMS
                  </h3>
                  <p class="fs-12">Login to your account.</p>
                </div>
                <div class="login__client-form">
                  <p-input placeholder="Email" class="mb-3" type="text"></p-input>
                  <p-input placeholder="Username" class="mb-3" type="text"></p-input>
                  <p-input placeholder="Password" class="mb-3" type="text"></p-input>
                  <button class="btn btn--primary ">Login</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      <div class="panels-container">
        <div class="panel left-panel">
          <div class="content">
            <h3>New here?</h3>
            <p>Lorem asdadsadddddddddddddddddddasdasdadasdasda</p>
            <button class="btn transparent" id="sign-up-btn" @click="modeSignup" >Sign up</button>
            <img class="image" src="@/assets/img/log.svg"/>
          </div>
        </div>
        <div class="panel right-panel">
          <div class="content">
            <h3>One of us?</h3>
            <p>Lorem asdadsadddddddddddddddddddasdasdadasdasda</p>
            <button class="btn transparent" id="sign-in-btn" @click="modeSignin">Sign in</button>
            <img class="image" src="@/assets/img/res.svg"/>
          </div>
        </div>
      </div>
      </div>
    </div>
</template>
<script>

export default {
  name:'Login',
  data(){
    return{
    }
  },
  methods:{
    modeSignin(){
      const container = document.querySelector(".container-ct")
      container.classList.remove("sign-up-mode")
    },
    modeSignup(){
      const container = document.querySelector(".container-ct")
      container.classList.add("sign-up-mode")
    }
  }
}

</script>

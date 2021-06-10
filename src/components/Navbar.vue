<template>
  <nav class="site__navbar pages p-24" role="navigation">
    <div class="container">
      <div class="navbar">
        <div class="navbar__hello">
          <span class="narbar__hello-content">Welcome,</span>
          <span class="narbar__hello-name">Tung</span>
        </div>
        <div class="navbar__action">
          <div class="navbar__action-noti mr-24">
            <span class="is-noti"></span>
            <box-icon name='bell' ></box-icon>
          </div>
          <div class="navbar__action-user">
            <box-icon type='solid' name='user'></box-icon>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
export  default {
  name:'NavBar',

}
</script>
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
            <i class="far fa-bell"></i>
          </div>
          <div class="navbar__action-user">
            <p-dropdown :id="`user`" >
             <div class="" slot="trigger" >
               <i class="far fa-user"></i>
             </div>
              <p-item>
                <router-link class="item" to="/">
                  Profile
                </router-link>
              </p-item>
              <p-item>
                <router-link class="item" to="/">
                  Logout
                </router-link>
              </p-item>
            </p-dropdown>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
import PDropdown from "../../uikit/components/Dropdown/Dropdown";
import PItem from "../../uikit/components/Dropdown/Item";
export  default {
  name:'NavBar',
  components: {PItem, PDropdown},
}
</script>
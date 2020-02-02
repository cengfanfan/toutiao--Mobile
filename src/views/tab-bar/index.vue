<template>
  <div class="tabBar">
    <router-view />
    <van-tabbar route v-model="active">
      <van-tabbar-item icon="home-o" to="/" name='home'>首页</van-tabbar-item>
      <van-tabbar-item icon="search" to="/qs" name='qs'>问答</van-tabbar-item>
      <van-tabbar-item icon="friends-o" to="/videos" name='videos'>频道</van-tabbar-item>
      <van-tabbar-item icon="setting-o" to="/mine" name='mine'>{{$store.state.user?'我的':'未登陆'}}</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: 'home'
    }
  }
}
</script>

<style>
</style>

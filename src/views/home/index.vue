<template>
  <div class="homeContener">
    <van-nav-bar title="标题"/>
    <van-tabs>
  <van-tab v-for="(itm,idx) in channels" :title="itm.name" :key="idx">
    内容 {{ idx}}
    <article-list slot="default" :channels="itm"></article-list>
  </van-tab>
</van-tabs>
  </div>
</template>

<script>
import { getChannels } from '@/api/article'
export default {
  name: 'homePage',
  data () {
    return {
      channels: {}
    }
  },
  methods: {
    async getChannelsShow () {
      const res = await getChannels()
      const { data } = res.data
      this.channels = data.channels
      console.log(data)
    }

  },
  created () {
    this.getChannelsShow()
  }
}
</script>

<style>
</style>

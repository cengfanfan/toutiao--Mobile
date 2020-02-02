<template>
  <div class="user-container">
    <!-- 导航栏 -->
    <van-nav-bar :title="user.name" left-arrow
  @click-left="$router.back()"/>
    <!-- /导航栏 -->

    <!-- 用户信息 -->
    <div class="user-info-container">
      <div class="row1">
        <van-image class="col1" fit="cover" round :src="user.photo" />
        <div class="col2">
          <div class="row1">
            <div class="item">
              <div class="count">{{user.art_count}}</div>
              <div class="text">发布</div>
            </div>
            <div class="item">
              <div class="count">{{user.art_count}}</div>
              <div class="text">关注</div>
            </div>
            <div class="item">
              <div class="count">{{user.fans_count}}</div>
              <div class="text">粉丝</div>
            </div>
            <div class="item">
              <div class="count">{{user.like_count}}</div>
              <div class="text">获赞</div>
            </div>
          </div>
          <div class="action">
            <van-button type="primary" size="small">私信</van-button>
            <van-button type="default" size="small">编辑资料</van-button>
          </div>
        </div>
      </div>
      <div class="intro-wrap">
        <div>
          <span>认证：</span>
          <span>{{user.certi}}</span>
        </div>
        <div>
          <span>简介：</span>
          <span>{{user.intro}}</span>
        </div>
      </div>
    </div>
    <!-- /用户信息 -->

    <!-- 文章列表 -->
    <van-list v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="getArticle">
      <van-cell v-for="(item,index) in this.article" :key="index" :title="item.title" />
    </van-list>
    <!-- /文章列表 -->
  </div>
</template>

<script>
import { getAppointUser } from '@/api/user'
import { getArticle } from '@/api/article'
export default {
  name: 'UserPage',
  components: {},
  props: {},
  data () {
    return {
      user: {},
      article: [],
      finished: false,
      loading: false,
      // list: [],
      page: 1
    }
  },
  computed: {},
  watch: {},
  created () {
    // this.getArticle()
  },
  mounted () {
    this.getAppointUser()
  },
  methods: {
    async getAppointUser () {
      const id = this.$route.params.userId
      //   console.log(id)

      const res = await getAppointUser(id)
      const { data } = res.data
      this.user = data
      console.log(data)
    },
    async getArticle () {
      const id = this.$route.params.userId
      const params = {
        page: this.page,
        per_page: 20
      }
      const res = await getArticle(id, params)
      const { results } = res.data.data
      // this.article = results
      console.log(results)
      this.article.push(...results)
      this.loading = false
      if (results.length) {
        this.page++ // 更新获取下一页数据的页码
      } else {
        this.finished = true // 没有数据了，不需要加载更多了
      }
    }
    // onLoad () {
    //   // 异步更新数据
    //   setTimeout(() => {
    //     for (let i = 0; i < 10; i++) {
    //       this.list.push(this.list.length + 1)
    //     }
    //     // 加载状态结束
    //     this.loading = false

    //     // 数据全部加载完成
    //     if (this.list.length >= 40) {
    //       this.finished = true
    //     }
    //   }, 500)
    // }

  }
}
</script>

<style scoped lang="less">
.user-container {
  font-size: 14px;
   /deep/ .van-icon{
    color:#fff
  }
  /deep/ .van-nav-bar__text{
    color:#fff
  }
  .user-info-container {
    padding: 12px;
    background-color: #fff;
    margin-bottom: 10px;
    > .row1 {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      .item {
        text-align: center;
        .text {
          font-size: 12px;
        }
      }
      > .col1 {
        width: 80px;
        height: 80px;
      }
      > .col2 {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        width: 70%;
        height: 80px;
        padding: 0 12px;
        > .row1 {
          display: flex;
          justify-content: space-between;
        }
        .action {
          display: flex;
          justify-content: space-between;
          .van-button {
            width: 45%;
          }
        }
      }
    }
  }
}
</style>

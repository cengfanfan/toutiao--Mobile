<template>
  <div class="my-container">
    <!-- 已登录：用户信息 -->
    <div class="user-info-wrap" v-if="$store.state.user!=null">
      <div class="base-info-wrap">
        <div class="avatar-title-wrap" @click="showInfo">
          <van-image
            class="avatar"
            round
            fit="cover"
            :src="user.photo"
          />
          <div class="title">{{user.name}}</div>
        </div>
        <van-button round size="mini">编辑资料</van-button>
      </div>
      <van-grid class="data-info" :border="false">
        <van-grid-item>
          <span class="count">{{user.art_count}}</span>
          <span class="text">头条</span>
        </van-grid-item>
        <van-grid-item>
          <span class="count">{{user.follow_count}}</span>
          <span class="text">关注</span>
        </van-grid-item>
        <van-grid-item>
          <span class="count">{{user.fans_count}}</span>
          <span class="text">粉丝</span>
        </van-grid-item>
        <van-grid-item>
          <span class="count">{{user.like_count}}</span>
          <span class="text">获赞</span>
        </van-grid-item>
      </van-grid>
    </div>
    <!-- /已登录：用户信息 -->

    <!-- 未登录 -->
    <div class="not-login"  @click="onlond" v-else>
      <div class="mobile"></div>
      <div class="text">点击登录</div>
    </div>
    <!-- /未登录 -->

    <!-- 其它 -->
    <van-grid clickable :column-num="3">
      <van-grid-item text="我的收藏">
        <van-icon slot="icon" name="star-o" color="#eb5253" />
      </van-grid-item>
      <van-grid-item text="浏览历史">
        <van-icon slot="icon" name="browsing-history-o" color="#ffa023" />
      </van-grid-item>
      <van-grid-item text="作品">
        <van-icon slot="icon" name="edit" color="#678eff" />
      </van-grid-item>
    </van-grid>

    <van-cell-group :border="false">
      <van-cell title="消息通知" is-link />
      <van-cell title="小智同学" is-link />
    </van-cell-group>

    <van-cell-group @click="quit" v-if="$store.state.user!=null">
      <van-cell
        style="text-align: center;"
        title="退出登录"
        clickable
      />
    </van-cell-group>
    <!-- /其它 -->
  </div>
</template>

<script>

import { getUserInfo } from '@/api/user'
export default {
  name: 'minePage',
  data () {
    return {
      user: {}
    }
  },
  methods: {
    async getUserInfo () {
      const res = await getUserInfo()
      console.log(res)
      const { data } = res.data
      this.user = data
      console.log(data)
    },
    async quit () {
      await this.$dialog.confirm({
        title: '退出提示',
        message: '确定要退出吗？'
      })
      this.$store.commit('getUserToken', null)

    //   this.$store.commit('getUserToken', null)
    },
    onlond () {
      this.$router.push('/login')
    },
    showInfo () {
      const id = this.user.id
      this.$router.push(`/user/${id}`)
    }

  },
  created () {
    if (this.$store.state.user) {
      this.getUserInfo()
    }
  }

}
</script>

<style lang="less" scoped>
.my-container {
  .user-info-wrap {
    background: url("../../assets/banner.png") no-repeat;
    height: 182px;
    box-sizing: border-box;
    background-size: cover;
    padding: 40px 20px;
    font-size: 15px;
    color: #fff;
    .base-info-wrap {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .avatar-title-wrap {
        display: flex;
        align-items: center;
        .avatar {
          margin-right: 15px;
          width: 66px;
          height: 66px;
          padding: 2px;
          background: #fff;
        }
      }
    }
    .data-info {
      ::v-deep .van-grid-item__content {
        background: none;
      }
    }
  }

  .not-login {
    background: url("../../assets/banner.png") no-repeat;
    height: 182px;
    box-sizing: border-box;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .mobile {
      background: url("../../assets/mobile.png") no-repeat;
      background-size: cover;
      width: 66px;
      height: 66px;
      margin-bottom: 10px;
    }
    .text {
      font-size: 14px;
      color: #fff;
    }
  }

  > .van-cell-group {
    margin-top: 10px;
  }
}
</style>

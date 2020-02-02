<template>
  <div class="login-box">
    <van-nav-bar title="登陆"></van-nav-bar>
    <ValidationObserver ref="form">
      <ValidationProvider v-slot="{ errors }" rules="required|mobile" name="手机号" immediate>
        <van-field v-model="user.mobile" placeholder="请输入电话号" left-icon="smile-o"/>
        <!-- <span>{{ errors[0] }}</span> -->
        <!-- <i class="iconfont icon-shouji"></i> -->
      </ValidationProvider>
      <ValidationProvider rules="required|code" v-slot="{ errors }" name="验证码" immediate>
        <van-field v-model="user.code" placeholder="请输入验证码" left-icon="contact">
          <van-button
            v-if="countShow"
            slot="button"
            size="small"
            type="primary"
            class="small_btn"
            @click="Verification"
          >发送验证码</van-button>
          <van-count-down v-else :time="60*1000" format="ss 秒" slot="button" />
        </van-field>
      </ValidationProvider>
    </ValidationObserver>

    <div class="login-btn-box">
      <van-button type="info" @click="login">登录</van-button>
    </div>
  </div>
</template>

<script>
import { login, Verification } from '../../api/user'
import { validate } from 'vee-validate'

export default {
  name: 'lodinPage',
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      countShow: true
    }
  },
  methods: {
    async login () {
      const success = await this.$refs.form.validate()
      window.console.log(this.$refs.form)
      if (!success) {
        for (const key in this.$refs.form.errors) {
          const itm = this.$refs.form.errors[key]
          if (itm[0]) {
            this.$toast(itm[0])
            return
          }
        }

        return
      }
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      try {
        const res = await login(this.user)
        console.log(res)
        this.$store.commit('getUserToken', res.data.data)
        this.$toast.success('登陆成功')
        this.$router.push('/')
      } catch (err) {
        console.log(err)
        this.$toast.fail('登陆失败')
      }
    },

    async Verification () {
      const validateResult = await validate(this.user.mobile, 'required|mobile', {
        name: '手机号'
      })

      // 如果验证失败，提示错误消息，停止发送验证码
      if (!validateResult.valid) {
        this.$toast(validateResult.errors[0])
        return
      }
      this.countShow = false
      const res = await Verification(this.user.mobile)
      console.log(res)
    }
  }
}
</script>

<style lang="less" scoped>
.login-box {
  .van-cell {
    align-items: center;
  }
  .small_btn {
    border-radius: 10px;
  }
  .login-btn-box {
    padding: 27px 16px;
    .van-button {
      width: 100%;
      background-color: #6db4fb;
    }
  }
}
</style>

<template>
  <div class="login">
    <Form ref="formInline" :model="formInline" :rules="ruleInline">
      <FormItem prop="username">
        <Input type="text" prefix="ios-contact" v-model="formInline.username" placeholder="用户名"/>
      </FormItem>
      <FormItem prop="password">
        <Input type="password" prefix="ios-lock" password v-model="formInline.password" @on-enter.once="handleSubmit('formInline')" placeholder="密码"/>
      </FormItem>
      <FormItem>
        <Button type="error" :loading="loading" long @click="handleSubmit('formInline')">开启新世界的大门</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
export default {
  name: 'login',
  props: {},
  data () {
    return {
      formInline: {
        username: '',
        password: ''
      },
      ruleInline: {
        username: [ { required: true, message: '请输入用户名', trigger: 'blur' } ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { type: 'string', min: 6, message: '密码长度最少为6位', trigger: 'blur' }
        ]
      },
      loading: false
    }
  },
  methods: {
    handleSubmit (name) {
      this.loading = true
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$api.login(this.formInline)
            .then(({ res, status }) => {
              if (res.code !== 0) {
                this.loading = false
                this.$Message.error(res.msg)
                return false
              }
              this.$store.commit('setUserInfo', res.data)
              this.$router.push({ name: '_home' })
            })
        } else {
          this.loading = false
          this.$Message.error('请输入正确的信息')
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.login {
  color: #fff;
  width: 100vw;
  height: 100vh;
  background: url('~@/assets/images/login-bg.jpg') no-repeat;
  background-size: cover;
}
form {
  width: 250px;
  padding: 20px;
  border-radius: 5px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(255, 255, 255, .8);
  .ivu-form-item:last-child {
    margin: 0;
  }
}
</style>

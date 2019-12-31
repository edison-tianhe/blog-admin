<template>
  <div class="wrapper">
    <div class="wrapper-header">
      <Button type="info" @click="itemInsert">新增用户</Button>
    </div>
    <tables
    border
    v-model="userList"
    :columns="columns"
    @on-item-update="itemUpdate"
    @on-item-delete="itemDelete"></tables>
    <Modal
      v-model="modal"
      title="用户-新增/编辑">
      <Form ref="usersForm" :model="usersForm" :rules="usersValidate" :label-width="80">
        <FormItem label="用户名" prop="username">
          <Input v-model="usersForm.username" placeholder="Enter your username"></Input>
        </FormItem>
        <FormItem label="密码" prop="password">
          <Input v-model="usersForm.password" type="password" password placeholder="Enter your password"></Input>
        </FormItem>
        <FormItem label="邮箱" prop="email">
          <Input v-model="usersForm.email" placeholder="Enter your email"></Input>
        </FormItem>
        <FormItem label="头像" prop="avator">
          <UploadImg :defaultList="defaultAvator" @on-change="uploadChange"></UploadImg>
        </FormItem>
        <FormItem label="性别">
          <RadioGroup v-model="usersForm.sex">
            <Radio :label="1">男</Radio>
            <Radio :label="2">女</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="手机号" prop="phone">
          <Input v-model="usersForm.phone" @on-enter="modalOk('usersForm')" placeholder="Enter your phone"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="modal = false">取消</Button>
        <Button type="primary" :loading="modal_loading" @click="modalOk('usersForm')">提交</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Tables from '_c/tables'
import { UploadImg } from '_c/upload'

const usersForm = {
  username: null,
  password: null,
  email: null,
  avator: null,
  sex: 1,
  phone: null
}

export default {
  name: 'usersList',
  components: {
    Tables,
    UploadImg
  },
  data () {
    return {
      userList: [],
      defaultAvator: [],
      columns: [
        { title: 'ID', key: 'id', width: 60 },
        { title: '头像', key: 'handle', align: 'center', width: 70, options: ['image/avator'] },
        { title: '用户名', key: 'username' },
        { title: '性别', key: 'sex', render (h, params) { return h('span', params.row.sex === 1 ? '男' : '女') } },
        { title: '手机号', key: 'phone' },
        { title: '邮箱', key: 'email' },
        { title: '操作', key: 'handle', align: 'center', width: 180, options: ['update', 'delete'] }
      ],
      modal: false,
      modal_loading: false,
      usersForm: { ...usersForm },
      usersValidate: {
        username: [ { required: true, message: '请输入用户名', trigger: 'blur' } ],
        password: [ { required: true, message: '请输入密码', trigger: 'blur' } ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱', trigger: 'blur' }
        ],
        avator: [ { required: true, message: '请上传头像', trigger: 'blur' } ],
        phone: [ { required: true, message: '请输入手机号', trigger: 'blur' } ]
      }
    }
  },
  computed: {
    ...mapGetters(['baseImgUrl'])
  },
  methods: {
    getUsers () {
      this.$api.getUsers()
        .then(({ res, status }) => {
          if (res.code !== 0) {
            this.$Message.error(res.msg)
            return false
          }
          this.userList = res.data
        })
    },
    itemInsert () {
      this.usersForm = { ...usersForm }
      this.defaultAvator = []
      this.modal = true
    },
    itemUpdate (params) {
      this.usersForm = { ...params.row }
      this.defaultAvator = [{ url: this.usersForm.avator }]
      this.modal = true
    },
    itemDelete (params) {
      console.log('删除')
    },
    uploadChange (data) {
      usersForm.avator = data.length ? data[0].url : null
    },
    modalOk (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.modal_loading = true
          this.$api.signin(this.usersForm)
            .then(({ res, status }) => {
              this.modal_loading = false
              if (res.code !== 0) {
                this.$Message.error(res.msg)
                return false
              }
              this.modal = true
              this.$Message.success(res.msg)
            })
        } else {
          this.$Message.error('请填写完成信息')
        }
      })
    }
  },
  created () {
    this.getUsers()
  }
}
</script>

<style lang="less" scoped>
</style>

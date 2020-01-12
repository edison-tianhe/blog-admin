<template>
  <div>
    <div class="card-box">
      <p><Icon type="md-options" /> 基本信息</p>
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="文章标题" prop="title">
          <Input v-model="formValidate.title" placeholder="请输入文章标题"></Input>
        </FormItem>
        <FormItem label="文章简介">
          <Input v-model="formValidate.intro" placeholder="写不写都无所谓呢~"></Input>
        </FormItem>
        <Row>
          <Col :xs="24" :lg="8">
            <FormItem label="分类" prop="category">
              <Select v-model="formValidate.category" filterable allow-create @on-create="categoryCreate">
                <Option v-for="item in categorysList" :value="item.id" :key="item.id">{{ item.label }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col :xs="24" :lg="8">
            <FormItem label="置顶状态">
              <i-switch
                size="large"
                v-model="formValidate.stick"
                :true-value="1"
                :false-value="0">
                <span slot="open">置顶</span>
                <span slot="close">普通</span>
              </i-switch>
            </FormItem>
          </Col>
          <Col :xs="24" :lg="8">
            <FormItem label="文章状态">
              <i-switch
                size="large"
                v-model="formValidate.status"
                :true-value="1"
                :false-value="0">
                <span slot="open">上线</span>
                <span slot="close">下线</span>
              </i-switch>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </div>
    <div class="card-box">
      <p><Icon type="ios-paper" /> 文章内容</p>
      <!-- 使用说明 -->
      <!-- https://github.com/hinesboy/mavonEditor -->
      <mavon-editor
        :style="{'z-Index': zIndex}"
        v-model="formValidate.content"
        @change="editorChange"
        @fullScreen="fullScreenChange"/>
    </div>
    <div style="text-align: center">
      <Poptip trigger="hover" title="提示" content="文章状态自动改为上线">
        <Button type="primary" :loading="modal_loading" @click="handleSubmit('formValidate', 1)">发布</Button>
      </Poptip>
      <Poptip trigger="hover" title="提示" content="文章状态自动改为下线,效果同等草稿箱">
        <Button :loading="modal_loading" @click="handleSubmit('formValidate', 0)" style="margin-left: 8px">保存</Button>
      </Poptip>
    </div>
  </div>
</template>

<script>
export default {
  name: 'articleInsert',
  data () {
    return {
      formValidate: {
        title: '',
        intro: '',
        category: '',
        stick: 0,
        status: 1,
        content: ''
      },
      ruleValidate: {
        title: [ { required: true, message: '请输入文章标题', trigger: 'blur' } ],
        category: [ { required: true, message: '请选择分类', type: 'number', trigger: 'blur' } ]
      },
      categorysList: [],
      modal_loading: false,
      zIndex: 0
    }
  },
  created () {
    this.$route.params.id && this.articlesDetailsFun(this.$route.params.id)
    this.categorysListFun()
  },
  mounted () {},
  methods: {
    editorChange (value, render) {
      this.formValidate.contentHTML = render
    },
    fullScreenChange (status, value) {
      status ? (this.zIndex = 1500) : (this.zIndex = 0)
    },
    handleSubmit (name, status) {
      this.formValidate.status = status
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.modal_loading = true
          let _url = null
          if (this.formValidate.id) {
            _url = this.$api.articlesUpdate(this.formValidate)
          } else {
            _url = this.$api.articlesInsert(this.formValidate)
          }
          _url.then(({ res, status }) => {
            this.modal_loading = false
            if (res.code !== 0) {
              this.$Message.error(res.msg)
              return false
            }
            this.$Message.success(res.msg)
            this.$router.push({ name: 'articlesList' })
          })
        } else {
          this.$Message.error('文章信息填写完成')
        }
      })
    },
    articlesDetailsFun (id) {
      this.$api.articlesDetails(id)
        .then(({ res, status }) => {
          if (res.code !== 0) {
            this.$Message.error(res.msg)
            return false
          }
          this.formValidate = res.data
        })
    },
    categoryCreate (query) {
      this.$api.categorysInsert({ label: query, status: 1 })
        .then(({ res, status }) => {
          if (res.code !== 0) {
            this.$Message.error(res.msg)
            return false
          }
          this.categorysListFun()
          this.$Message.success(res.msg)
        })
    },
    categorysListFun () {
      this.$api.categorysList()
        .then(({ res, status }) => {
          if (res.code !== 0) {
            this.$Message.error(res.msg)
            return false
          }
          this.categorysList = res.data
        })
    }
  }
}
</script>

<style scoped lang="less">
.card-box {
  margin-bottom: 20px;
  p {
    margin-bottom: 20px;
    font-size: 20px;
  }
}
</style>

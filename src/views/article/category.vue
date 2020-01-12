<template>
  <div class="wrapper">
    <div class="wrapper-header">
      <Button type="info" @click="itemInsert">新增分类</Button>
    </div>
    <tables
    border
    v-model="categoryList"
    :columns="columns"
    @on-item-update="itemUpdate"
    @on-item-delete="itemDelete"
    @on-item-status="itemStatus"></tables>
    <Modal
      v-model="modal"
      title="分类-新增/编辑">
      <Form :label-width="80">
        <FormItem label="分类名">
          <Input v-model="categorysForm.label" placeholder="请输入分类名" @on-enter="modalOk" />
        </FormItem>
        <FormItem label="状态">
          <i-switch
            size="large"
            v-model="categorysForm.status"
            :true-value="1"
            :false-value="0">
            <span slot="open">上线</span>
            <span slot="close">下线</span>
          </i-switch>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="modal = false">取消</Button>
        <Button type="primary" :loading="modal_loading" @click="modalOk">提交</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import Tables from '_c/tables'

const categorysForm = {
  id: null,
  label: '',
  status: 1
}

export default {
  name: 'categoryManage',
  data () {
    return {
      categorysForm: { ...categorysForm },
      modal: false,
      modal_loading: false,
      columns: [
        { title: 'ID', key: 'id', width: 60 },
        { title: '分类', key: 'label' },
        { title: '状态', key: 'handle', align: 'center', width: 180, options: ['status/status-下线^上线'] },
        { title: '操作', key: 'handle', align: 'center', width: 180, options: ['update', 'delete'] }
      ],
      categoryList: []
    }
  },
  created () {
    this.getCategorys()
  },
  methods: {
    getCategorys () {
      this.$api.getCategorys()
        .then(({ res, status }) => {
          if (res.code !== 0) {
            this.$Message.error(res.msg)
            return false
          }
          this.categoryList = res.data
        })
    },
    itemInsert () {
      this.categorysForm = { ...categorysForm }
      this.modal = true
    },
    itemUpdate (params) {
      this.categorysForm = { ...params.row }
      this.modal = true
    },
    itemDelete (params) {
      const { id } = params.row
      this.$api.categorysDelete(id)
        .then(({ res, status }) => {
          if (res.code !== 0) {
            this.$Message.error(res.msg)
            return false
          }
          this.getCategorys()
          this.$Message.success(res.msg)
        })
    },
    itemStatus (params) {
      params.status = params.status ? 0 : 1
      this.$api.categorysUpdate(params)
        .then(({ res, status }) => {
          this.modal_loading = false
          if (res.code !== 0) {
            this.$Message.error(res.msg)
            return false
          }
          this.getCategorys()
          this.modal = false
          this.$Message.success(res.msg)
        })
    },
    modalOk () {
      if (this.categorysForm.label) {
        this.modal_loading = true
        let _url = null
        if (this.categorysForm.id) {
          _url = this.$api.categorysUpdate(this.categorysForm)
        } else {
          _url = this.$api.categorysInsert(this.categorysForm)
        }
        _url.then(({ res, status }) => {
          this.modal_loading = false
          if (res.code !== 0) {
            this.$Message.error(res.msg)
            return false
          }
          this.getCategorys()
          this.modal = false
          this.$Message.success(res.msg)
        })
      } else {
        this.$Message.error('请填写分类名称')
      }
    }
  },
  components: {
    Tables
  }
}
</script>

<style scoped lang="less"></style>

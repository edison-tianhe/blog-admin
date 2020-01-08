<template>
  <div>
    <Row :gutter="16" justify="start">
      <Col :md="24" :lg="8">
        <my-card class="insert-btn" @click.native="$router.push({ name: 'articleInsert' })">
          <Icon type="ios-add" size="40"/>
          <p>添加文章</p>
        </my-card>
      </Col>
      <Col :md="24" :lg="8" v-for="v in articlesList" :key="v.id">
        <my-card
          draggable="true"
          :data="v"
          @on-item-up="itemUp"
          @on-item-down="itemDown"
          @on-item-close="itemClose"
          @on-item-stick="itemStick"
          @on-item-status="itemStatus"
          @on-item-input="itemInput"
          @on-item-update="itemUpdate"></my-card>
      </Col>
    </Row>
  </div>
</template>

<script>
import MyCard from '_c/card'

export default {
  name: 'articlesList',
  data () {
    return {
      articlesList: []
    }
  },
  created () {
    this.getArticles()
  },
  methods: {
    itemUp (data) {
      console.log('上升', data)
    },
    itemDown (data) {
      console.log('下降', data)
    },
    itemClose (data) {
      console.log('删除', data)
    },
    itemStick (status) {
      console.log('置顶', status)
    },
    itemStatus (status) {
      console.log('发布状态', status)
    },
    itemInput (val) {
      console.log('排序值', val)
    },
    itemUpdate (data) {
      console.log('编辑', data)
    },
    getArticles () {
      this.$api.getArticles()
        .then(({ res, status }) => {
          if (res.code !== 0) {
            this.$Message.error(res.msg)
            return false
          }
          this.articlesList = res.data
        })
    }
  },
  components: {
    MyCard
  }
}
</script>

<style scoped lang="less">
.ivu-col {
  margin: 8px 0;
}
.insert-btn {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  text-align: center;
  &:hover {
    color: #57a3f3;
    border-color: #57a3f3;
    border-style: dashed;
    cursor: pointer;
  }
}
</style>

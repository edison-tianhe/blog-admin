<template>
  <Card>
    <slot>
      <div class="card-margin card-header">
        <Icon type="ios-arrow-up" size="24" @click="iconUp"/>
        <Icon type="ios-arrow-down" size="24" @click="iconDown"/>
        <Poptip
          confirm
          placement="left-start"
          title="你确定要删除该文章吗?"
          style="text-align: left"
          @on-ok="iconClose">
          <Icon type="md-close" size="24"/>
        </Poptip>
      </div>
      <img class="card-img" :src="`${baseImgUrl}/${data.avator}`">
      <div class="card-margin card-content">
        <div class="card-content-h1">
          <h1>{{data.title}}</h1>
        </div>
        <div class="card-content-p">
          <p>{{data.intro || '作者有点小偷懒~,该文章么得相关简介~'}}</p>
        </div>
      </div>
      <div class="card-footer">
        <i-switch
          size="large"
          true-color="#f36"
          :true-value="1"
          :false-value="0"
          :value="data.stick"
          @on-change="stickChange">
          <span slot="open">置顶</span>
          <span slot="close">普通</span>
        </i-switch>
        <i-switch
          size="large"
          true-color="#13ce66"
          :true-value="1"
          :false-value="0"
          :value="data.status"
          @on-change="statusChange">
          <span slot="open">上线</span>
          <span slot="close">下线</span>
        </i-switch>
        <InputNumber
          readonly
          placeholder="排序值"
          :min="1"
          :value="data.rank"
          @on-change="inputChange"/>
        <Button type="primary" icon="md-create" @click="updateChange">编辑</Button>
      </div>
    </slot>
  </Card>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'myCard',
  props: {
    data: {
      type: Object,
      default: () => { return {} }
    }
  },
  computed: {
    ...mapGetters(['baseImgUrl'])
  },
  methods: {
    iconUp () {
      this.$emit('on-item-up', this.data)
    },
    iconDown () {
      this.$emit('on-item-down', this.data)
    },
    iconClose () {
      this.$emit('on-item-close', this.data)
    },
    stickChange (status) {
      this.$emit('on-item-stick', this.data, status)
    },
    statusChange (status) {
      this.$emit('on-item-status', this.data, status)
    },
    inputChange (val) {
      this.$emit('on-item-input', val)
    },
    updateChange () {
      this.$emit('on-item-update', this.data)
    }
  }
}
</script>

<style lang="less" scoped>
.ivu-card /deep/ {
  height: 270px;
  overflow: hidden;
  .card-img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    position: absolute;
    left: 16px;
  }
  .card-margin {
    margin-left: 60px;
  }
  .card-header {
    text-align: right;
    padding-bottom: 10px;
    i {
      cursor: pointer;
    }
  }
}
.card-content {
  .card-content-h1 {
    height: 66px;
    h1 {
      width: 100%;
      font-size: 20px;
      font-weight: 600;
      line-height: 1.4;
      color: #2e3135;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      word-wrap: break-word;
      margin-bottom: 10px;
    }
  }
  .card-content-p {
    height: 94px;
    p {
      color: #757575;
      line-height: 1.5;
      word-wrap: break-word;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
      margin-bottom: 10px;
    }
  }
}
.card-footer {
  height: 40px;
  border-top: 1px solid #f9e4e4;
  padding-top: 5px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  div {
  }
}
</style>

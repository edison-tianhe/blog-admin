<template>
  <div>
    <div class="demo-upload-list" v-for="(item,index) in uploadList" :key="index">
        <template v-if="item.status === 'finished'">
            <img :src="`${ossBasePath}${item.url}`">
            <div class="demo-upload-list-cover">
                <Icon type="ios-eye-outline" @click.native="handleView(item.url)"></Icon>
                <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
            </div>
        </template>
        <template v-else>
            <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
        </template>
    </div>
    <Upload
      v-show="uploadList.length !== listMaxNum"
      ref="upload"
      :show-upload-list="false"
      :default-file-list="defaultList"
      :on-success="handleSuccess"
      :format="['jpg','jpeg','png','gif']"
      :max-size="2048"
      :on-format-error="handleFormatError"
      :on-exceeded-size="handleMaxSize"
      :before-upload="handleBeforeUpload"
      multiple
      type="drag"
      :action="baseUrl+`oss/categoryImage`"
      style="display: inline-block;width:58px;">
      <div style="width: 58px;height:58px;line-height: 58px;">
        <Icon type="ios-camera" size="20"></Icon>
      </div>
    </Upload>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import imagePreview from '_c/image-preview'
export default {
  data () {
    return {
      uploadList: []
    }
  },
  props: {
    listMaxNum: {
      type: Number,
      default: 1
    },
    defaultList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  updated () {
    this.uploadList = this.$refs.upload.fileList
  },
  computed: {
    ...mapGetters(['baseUrl', 'ossBasePath'])
  },
  methods: {
    handleView (url) {
      imagePreview([`${this.ossBasePath}${url}`])
    },
    handleRemove (file) {
      const fileList = this.$refs.upload.fileList
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1)
      this.$emit('on-change', this.uploadList)
    },
    handleSuccess (res, file) {
      if (res.code !== 0) {
        this.$Message.warning(`上传失败`)
        return false
      }
      file.url = `${res.data}`
      this.$emit('on-change', this.uploadList)
    },
    handleFormatError (file) {
      this.$Message.warning(`当前选中的 ${file.name} 文件格式不正确`)
    },
    handleMaxSize (file) {
      this.$Message.warning(`当前选中的 ${file.name} 大小超出限制`)
    },
    handleBeforeUpload () {
      const check = this.uploadList.length < this.listMaxNum
      if (!check) {
        this.$Message.warning(`最多可以上传${this.listMaxNum}张照片`)
      }
      return check
    }
  },
  mounted () {
    this.uploadList = this.$refs.upload.fileList
  }
}
</script>
<style>
.demo-upload-list{
    display: flex;
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0,0,0,.2);
    margin-right: 4px;
    justify-content: center;
    align-items: center;
}
.demo-upload-list img{
    width: 100%;
}
.demo-upload-list-cover{
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,.6);
}
.demo-upload-list:hover .demo-upload-list-cover{
    display: block;
}
.demo-upload-list-cover i{
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
}
</style>

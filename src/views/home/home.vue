<template>
  <div>
    <Button @click="getList">获取find数据</Button>
  </div>
</template>

<script>
export default {
  name: 'home',
  props: {},
  data () {
    return {}
  },
  computed: {},
  created () {},
  mounted () {},
  watch: {},
  methods: {
    getList () {
      this.$api.getUserInfo()
        .then(({ res, status }) => {
          if (res.code !== 0) {
            this.$Message.error(res.msg)
            return false
          }
          this.$Message.success(res.msg)
        })
    }
  },
  components: {}
}
</script>

<style scoped lang="less"></style>

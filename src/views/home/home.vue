<template>
  <div>
    <Button @click="getList">获取find数据</Button>
    <Button @click="exit">退出</Button>
  </div>
</template>

<script>
export default {
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
    },
    exit () {
      this.$store.commit('exit')
      this.$router.push({ name: 'login' })
    }
  },
  components: {}
}
</script>

<style scoped lang="less"></style>

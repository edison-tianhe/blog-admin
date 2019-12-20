<template>
  <div class="layout">
    <Layout>
      <Header>
        <Menu class="header-horizontal" mode="horizontal" theme="light">
          <div class="layout-logo"><img src="https://file.iviewui.com/dist/7dcf5af41fac2e4728549fa7e73d61c5.svg" alt=""></div>
          <div class="layout-nav">
            <Breadcrumb separator="|">
              <BreadcrumbItem><Icon type="ios-person"/> 个人信息</BreadcrumbItem>
              <BreadcrumbItem @click.native="logout"><Icon type="ios-power"/> 退出登陆</BreadcrumbItem>
            </Breadcrumb>
          </div>
        </Menu>
      </Header>
      <Layout>
        <Sider>
          <Menu theme="light" width="auto" accordion :active-name="routerActiveName" :open-names="routerOpenNames">
            <template v-for="(item, index) in menuList">
              <Submenu v-if="item.meta.showAlways" :name="item.name" :key="index">
                <template slot="title">
                  <Icon :type="item.meta.icon"></Icon>
                  {{item.meta.title}}
                </template>
                <MenuItem v-for="(v, i) in item.children" :key="i" :name="v.name" :to="{ name: v.name }">{{v.meta.title}}</MenuItem>
              </Submenu>
              <MenuItem v-else :key="index" :name="item.children[0].name" :to="{ name: item.children[0].name }">
                <Icon :type="item.children[0].meta.icon" />
                {{item.children[0].meta.title}}
              </MenuItem>
            </template>
          </Menu>
        </Sider>
        <Layout :style="{padding: '0 24px 24px'}">
          <Breadcrumb :style="{margin: '24px 0'}">
            <BreadcrumbItem v-for="(item, index) in breadCrumbList" :key="index">
              <Icon :type="item.icon"></Icon>
              {{item.title}}
            </BreadcrumbItem>
          </Breadcrumb>
          <Content :style="{padding: '24px', height: 'calc(100% - 48px)', 'overflow-y': 'auto', background: '#fff'}">
            <keep-alive :include="cacheList">
              <router-view></router-view>
            </keep-alive>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['menuList', 'routerActiveName', 'routerOpenNames', 'breadCrumbList', 'cacheList'])
  },
  methods: {
    logout () {
      this.$Modal.confirm({
        title: '提示信息',
        content: '您确定要离开吗?',
        onOk: () => {
          this.$api.logout()
            .then(({ res, status }) => {
              if (res.code !== 0) {
                this.$Message.error(res.msg)
                return false
              }
              this.$Message.success(res.msg)
              this.$router.push({ name: 'login' })
            })
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
@import url('./main.less');
</style>

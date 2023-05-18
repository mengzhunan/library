<template>
  <div id="app">
    <van-tabbar v-model="active" active-color="green" z-index="999" v-if="condition">
      <van-tabbar-item icon="wap-home" route="true" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="underway" route="true" to="/borrowBooks">借书</van-tabbar-item>
      <van-tabbar-item icon="column" route="true" to="/books" size="40">书架</van-tabbar-item>
      <van-tabbar-item icon="cluster" route="true" to="/community">社区</van-tabbar-item>
      <van-tabbar-item icon="friends" route="true" to="/mine">我的</van-tabbar-item>
    </van-tabbar>
    <router-view />

  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      active: 0,
    }
  },
  computed: {
    ...mapState(['condition']),
  },

}
</script>

<style lang="scss" scoped>

</style>

<!--书籍详情 https://apis.netstart.cn/yunyuedu/book/getsub.json?id= 13c58cc086f74e36978b4a7881b82517_4 &title= 女掌事 -->
<!--书籍列表 https://apis.netstart.cn/yunyuedu/reader/book/info.json?source_uuid= f42a278c5ab04c798a39c7bc72f442bd_4  -->
<!--章节内容 https://apis.netstart.cn/yunyuedu/reader/book/content.json?source_uuid=bd_0c70b944c4c94244b05e3fb102cc2a67_4&content_uuid=3baca601ba04434ca6414c92ec2c5760_4 -->
<!--获取书籍 https://apis.netstart.cn/yunyuedu/source/v2/searchBook.json?catId=11 -->
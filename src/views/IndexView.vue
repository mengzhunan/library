<template>
  <div class="index">

    <div class="glue">
      <div class="header">
        <van-icon name="notes-o" size="28" />
        <div class="search" @click="search">
          <van-icon name="search" />
          <div class="text">搜索书名/作者</div>
        </div>
        <van-icon name="shopping-cart-o" size="28" />
      </div>

      <!-- 导航 -->
      <div class="tabs">
        <van-tabs color="#F5C265">
          <van-tab title="推荐" to="/"></van-tab>
          <van-tab title="精选书单" to="handpick"></van-tab>
          <van-tab title="共读" to="common"></van-tab>
          <van-tab title="书讯" to="newsletter"></van-tab>
        </van-tabs>
      </div>
    </div>
    <div class="glue_fx"></div>

    <router-view />

  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  components: {
  },
  data() {
    return {
      active: 0,
    }
  },

  methods: {
    ...mapMutations(["show", "hide"]),
    search() {
      this.hide(),
        this.$router.push('/search')
    }
  }

}
</script>

<style lang="scss" scoped>
.glue {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  background: #fff;
}

.glue_fx {
  height: 102rem;
}


.header {
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .search {
    flex: 1;
    display: flex;
    align-items: center;
    padding: 4px;
    margin: 0 6px;
    background-color: #eee;
    border-radius: 18px;

    .text {
      flex: 1;
      margin: 0 4px;
      font-size: 12rem;
      color: #555
    }
  }
}

.tabs {
  width: 260rem;
  margin-bottom: 10px;
}
</style>
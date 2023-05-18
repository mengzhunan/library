<template>
  <div class="box">
    
    <div class="flex-box">
      <div class="tabs">
        <van-tabs color="#F5C265">
          <van-tab title="借阅馆" to="borrowBooks"></van-tab>
          <van-tab title="校友图书馆" to="/alumnus"></van-tab>
        </van-tabs>
      </div>
      <van-icon @click="search" name="search" size="20" />
    </div>

    <router-view />
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  methods: {
    ...mapMutations(['show', 'hide']),
    search() {
      this.hide();
      this.$router.push('/search');
    }
  }
}
</script>

<style lang="scss" scoped>
.flex-box {
  margin: 0 10rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .tabs {
    width: 160rem;
  }

}
</style>

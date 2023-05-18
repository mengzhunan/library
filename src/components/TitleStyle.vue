<template>
  <div class="title">
    <div class="name">{{ name }}</div>
    <div class="details">
      <div class="more">{{ more }}</div>
      <div class="icon-right">
        <img src="../assets/right.png" alt="" class="auto-img">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['name', 'more']
}
</script>

<style lang="scss" scoped>
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20rem 0;

  .name {
    font-size: 18px;
    color: #000;
    font-weight: 600;
  }

  .details {
    display: flex;
    align-items: center;
    color: #999;
  }

  .icon-right {
    margin-left: 2rem;
    width: 16rem;
    height: 16rem;

    .auto-img {
      width: 100%;
      display: block;
    }
  }
}
</style>
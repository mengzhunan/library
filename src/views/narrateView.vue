<template>
    <div class="narrate">
        <button @click="back">返回</button>
        <div>这是讲书页面</div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
    methods: {
        ...mapMutations(['show','hide']),
        back() {
            this.show();
            this.$router.back()
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
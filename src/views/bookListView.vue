<template>
    <div class="list">
        <button @click="back">返回</button>
        <div>这是榜单页面</div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
    data() {
        return {
            book: null,
        }
    },

    created() {
        
    },

    methods: {
        ...mapMutations(['show', 'hide']),
        back() {
            this.show();
            this.$router.back()
        }


    }
}
</script>

<style lang="scss" scoped>

</style>
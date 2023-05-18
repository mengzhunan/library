<template>
    <div class="hot_book">
        <div class="type_content" v-for="ele in hot" :key="ele.id"
            @click="$router.push(`/particular/${ele.id}/${ele.title}`)">
            <van-image :src="ele.cover" width="75rem" height="105rem">
                <template v-slot:error>暂无封面</template>
            </van-image>
            <div class="type_designation">{{ ele.title }}</div>
            <div class="type_author" v-html="ele.content"></div>
        </div>
    </div>
</template>

<script>
export default {
    props: ["hot"]
}
</script>

<style lang="scss" scoped>
.hot_book {
    display: flex;
    overflow: auto;
    margin-bottom: 20rem;
}

.type_content {
    margin: 6rem;

    .type_designation {
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
        color: #000;
        font-weight: 600;
        margin: 8rem 0 4rem 0;
        width: 76rem;
    }

    .type_author {
        color: #999;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
}
</style>
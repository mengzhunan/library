<template>
    <div class="hot_book">
        <div class="type_content" v-for="(ele, index) in hot" :key="index">
            <div class="type_cover">
                <img class="auto-img" :src="ele.bookCover" alt="">
            </div>
            <div class="type_designation">{{ ele.bookName }}</div>
            <div class="type_author">{{ ele.bookAuthor }}</div>
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

    .type_cover {
        width: 76rem;
        height: 108rem;
        box-sizing: border-box;
        border-radius: 6px 4px 4px 6px;

        .auto-img {
            width: 100%;
            height: 100%;
            border-radius: 2px;
            display: block;
        }
    }

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
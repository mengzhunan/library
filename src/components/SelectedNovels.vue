<template>
    <div class="book_box">
        <div class="content" v-for="ele in book" :key="ele.bookId" @click="abs(ele)">
            <div class="cover">
                <img class="auto-img" :src="ele.bookCover" alt="">
            </div>
            <div class="designation">{{ ele.bookName }}</div>
        </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
    props: ['book'],
    methods: {
        ...mapMutations(['show', 'hide']),
        abs(event) {
            this.hide();
            this.$router.push({ path: '/details', query: { id: event.bookId, name: event.bookName } });
        }
    }
}
</script>

<style lang="scss" scoped>
.book_box {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
}

.content {
    margin: 6rem 16rem;

    .cover {
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

    .designation {
        height: 36px;
        line-height: 20px;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        color: #000;
        font-weight: 600;
        margin: 8rem 0;
        width: 84rem;
    }
}
</style>
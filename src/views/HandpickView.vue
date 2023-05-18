<!-- 精选书单 -->
<template>
    <div class="list">
        <div class="item" v-for="ele in bookList" :key="ele.themeBooklistId">
            <div class="title">{{ ele.title }}</div>
            <div class="rich" v-if="ele.description">{{ ele.description }}</div>
            <div class="book-box">
                <div class="book" v-for="book in ele.bookListBookDTOS" :key="book.bookId" @click="abs(book)">
                    <div class="cover">
                        <img :src="book.bookCover" alt="" class="auto-img">
                    </div>
                    <div class="name">{{ book.bookName }}</div>
                </div>
            </div>
            <div class="total">查看书单·{{ ele.bookCnt }}本书</div>
        </div>
    </div>
</template>

<script>
import qs from 'qs'
export default {
    data() {
        return {
            bookList: null,
        }
    },
    created() {
        this.axios({
            method: "POST",
            url: "https://api.zglibrary.com/content/theme-booklist/query-booklistApp",
            data: qs.stringify({
                size: "30",
                from: "APP",
                current: "1",
                sortType: "9",
                sign: "78451F4AF8650C34649B51D782888F03",
                nonce: "vUudQ5bneXZx9osD",
                timestamp: "1671700111270"
            }),
            headers: {
                "content-type": "application/x-www-form-urlencoded"
            },
        }).then((res) => {
            this.bookList = res.data.data.records
        })
    },

    methods: {
        abs(event) {
            this.$router.push({ path: '/details', query: { id: event.bookId, name: event.bookName } });
            console.log(event);
        }
    }
}
</script>

<style lang="scss" scoped>
.list {
    height: 80vh;
    overflow: scroll;
    padding: 0 20rem;
}

.item {
    padding: 10rem 0;
    border-radius: 4rem;
    margin-bottom: 6rem;
    box-shadow: 0 -1rem 2rem #ddd inset;

    &:last-child {
        margin-bottom: 30rem;
    }

    .title {
        font-weight: 600;
        font-size: 14rem;
        color: #000;
        margin: 6rem 0;
    }

    .rich {
        color: #999;
        padding: 4rem 0;
        font-size: 12rem;
    }
    .total {
        color: #333;
        font-size: 12rem;
        background-color: #f5f5f5;
        text-align: center;
        width: 100%;
        height: 40rem;
        line-height: 40rem;
        border-radius: 20rem;
    }
}

.book-box {
    display: flex;
    overflow: hidden;

    .name {
        width: 60rem;
        margin: 6rem 0;
        font-size: 12rem;
        ;
        color: rgb(16, 16, 16);
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
}

.book {
    margin: 10rem 12rem;
    flex-shrink: 0;

    .cover {
        width: 60rem;
        height: 84rem;
        border-radius: 4px;

        .auto-img {
            width: 100%;
            height: 100%;
            border-radius: 4px 2px 2px 4px;
            display: block;
        }
    }

}
</style>
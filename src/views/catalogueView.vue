<!-- 书本详情目录 -->
<template>
    <div>
        <div class="nav">
            <van-nav-bar title="目录" border left-arrow @click-left="back()" fixed z-index="10"></van-nav-bar>
        </div>
        <div class="box">
            <div class="chapter" v-for="ele in chapter" :key="ele.indexNo">{{ ele.catName }}</div>
        </div>
    </div>
</template>

<script>
import qs from 'qs'
export default {
    data() {
        return {
            chapter: [],
        }
    },
    created() {
        this.axios({
            method: "POST",
            url: "https://api.zglibrary.com/book/book-info/catalog-info",
            data: qs.stringify({
                isBookPart: '0',
                from: "APP",
                bookId: '3162001',
                sign: "C76FCB032A182776CF9A661C3C28DAC6",
                nonce: "W8PgLvxmzucEKkjY",
                timestamp: "1675144053763"
            }),
            headers: {
                "content-type": "application/x-www-form-urlencoded"
            },
        }).then((res) => {
            this.chapter = res.data.data.records
        })
    },
    methods: {
        back() {
            this.$router.back()
        },
    }
}
</script>

<style lang="scss" scoped>
.nav {
    height: 46rem;
    border-bottom: 1px solid #E6EAED;
}

.box {
    margin: 0 10rem;

    .chapter {
        border-bottom: 1px solid #E6EAED;
        height: 42rem;
        line-height: 42rem;
        color: #000;
    }
}
</style>
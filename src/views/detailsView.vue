<!-- 书本详情介绍 -->
<template>
    <div>
        <div class="navbar">
            <van-nav-bar :title="this.$route.query.name" border left-arrow @click-left="back" @click-right="more" fixed
                z-index="10">
                <template #right>
                    <van-icon name="ellipsis" size="20" />
                </template>
            </van-nav-bar>
        </div>

        <div class="content">
            <div class="top">
                <div class="cover">
                    <img class="auto-img" :src="book.bookCover" alt="">
                </div>
                <div class="right">
                    <div class="name">{{ this.$route.query.name }}</div>
                    <div class="info">
                        <div class="author">[著]{{ book.bookAuthor }}</div>
                        <div class="names">{{ book.categoryInfo }}</div>
                    </div>
                    <div class="price">￥{{ book.price }}</div>
                </div>
            </div>

            <div class="rate">
                <div class="left">
                    <div class="grade">{{ book.score }}分</div>
                    <van-rate v-model="active" :size="10" color="#ffd21e" />
                </div>
                <div class="centre">
                    <div class="grade">{{ book.wordTotal }}人</div>
                    <div class="read">已读</div>
                </div>
                <div class="right">
                    <van-icon name="friends-o" />
                    <div class="read">找人共读</div>
                </div>
            </div>

            <div class="intro">{{ book.bookIntro }}</div>

            <div class="catalogue" @click="catalogue(book.bookId)">
                <div class="left">目录</div>
                <div class="right">
                    <div class="cnt">共{{ book.catalogCnt }}章</div>
                    <van-icon name="arrow" size="14" />
                </div>
            </div>

            <div class="catalogue">
                <div class="left">书评</div>
                <div class="right">
                    <van-icon name="records" size="14" />
                    <div class="cnt">写书评</div>
                </div>
            </div>

            <div class="book">
                <div class="title">
                    <div class="name">作者相关作品</div>
                </div>
                <SelectedNovels :book="author" />
            </div>

            <div class="selection">
                <div class="title">
                    <div class="name">大家都在看</div>
                    <div class="details">
                        <van-icon name="replay" />
                        <div class="more">换一换</div>
                    </div>
                </div>
                <SelectedNovels :book="group" />
            </div>

            <div class="copyright">
                <div class="up">
                    <div class="title">版权</div>
                </div>
                <div class="down" v-for="(ele, index) in book.copyrightInfo" :key="index">
                    <div class="left">{{ ele.key }}</div>
                    <div class="right">{{ ele.value }}</div>
                </div>
            </div>

        </div>

    </div>
</template>

<script>
import qs from 'qs';
import { mapMutations } from 'vuex';

import SelectedNovels from "@/components/SelectedNovels.vue"

export default {
    components: {
        SelectedNovels
    },
    data() {
        return {
            book: {},
            active: 0,
            author: [],
            group: [],
        }
    },
    created() {
        this.axios({
            method: "POST",
            url: "https://api.zglibrary.com/book/book-info/detail",
            data: qs.stringify({
                isBookPart: '0',
                from: "APP",
                id: '3162001',
                sign: "240CD3D5DFDD95BC7E388E81A72A7C68",
                nonce: "w7bQT1DVMQpSABEI",
                timestamp: "1675135933602"
            }),
            headers: {
                "content-type": "application/x-www-form-urlencoded"
            },
        }).then((res) => {
            this.book = res.data.data
            this.active = Number(this.book.score);
        })

        this.axios({
            method: "POST",
            url: "https://api.zglibrary.com/book/book-info/list-by-author",
            data: qs.stringify({
                from: "APP",
                bookId: '3162001',
                author: '王胜军',
                sign: "B20CD9A36A4A4A8FCADD64C87FFAB9C2",
                nonce: "mBGG8uraO6eafVuh",
                timestamp: "1675150584975"
            }),
            headers: {
                "content-type": "application/x-www-form-urlencoded"
            },
        }).then((res) => {
            this.author = res.data.data.records
        })

        this.axios({
            method: "POST",
            url: "https://api.zglibrary.com/book/book-info/page",
            data: qs.stringify({
                excludeBookId: '3162001',
                sortType: '4',
                size: '6',
                from: "APP",
                categoryId: '1',
                current: '1',
                isSale: '1',
                sign: "7BB698DAFBDEC9D0B5C8A92AE150531E",
                nonce: "HvdNS9Ns7T8YNHtB",
                timestamp: "1675143781374"
            }),
            headers: {
                "content-type": "application/x-www-form-urlencoded"
            },
        }).then((res) => {
            // console.log(res);
            this.group = res.data.data.records
        })


    },
    methods: {
        ...mapMutations(['show', 'hide']),

        back() {
            this.$router.back()
            this.show();
        },

        more() {
            console.log('更多');
        },

        catalogue(event) {
            console.log(event);
            this.$router.push({ path: '/catalogue' });
        }


    }

}
</script>

<style lang="scss" scoped>
.navbar {
    height: 46px;
}

.content {
    margin: 0 10rem;

    .rate {
        padding: 0 20rem;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .left,
        .centre,
        .right {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }

        .grade {
            font-weight: 600;
            color: #000;
        }

        .read {
            color: #B6BECC;
        }
    }

    .intro {
        color: #63676C;
        margin: 20rem 6rem;
    }

    .catalogue {
        margin: 20rem 0;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .left {
            font-weight: 700;
            font-size: 16px;
        }

        .right {
            display: flex;
            align-items: center;
        }
    }

    .name {
        font-weight: 700;
        font-size: 16px;
    }
}

.top {
    margin: 10rem 0;
    display: flex;

    .cover {
        width: 85rem;
        height: 122rem;
        margin-right: 10rem;

        .auto-img {
            width: 100%;
            height: 100%;
            border-radius: 4rem;
        }
    }

    .right {
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .name {
            font-weight: 600;
            font-size: 16px;
        }

        .info {
            color: #A9B3C4;
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            font-size: 12rem;
        }

        .price {
            font-size: 16rem;
            color: #f00;
        }
    }
}

.selection {
    .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 6rem;

        .name {
            font-size: 16px;
            color: #000;
            font-weight: 600;
        }

        .details {
            display: flex;
            align-items: center;
            color: #999;
        }
    }
}

.copyright {
    margin: 20rem 0;

    .up {
        margin-bottom: 10rem;

        .title {
            font-size: 16rem;
            font-weight: 600;
        }
    }

    .down {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #9CA7BB;
        font-size: 12rem;

        .left {
            margin-bottom: 4rem;
        }
    }
}
</style>
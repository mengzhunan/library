<template>
    <div class="stack">
        <div class="navbar">
            <van-nav-bar title="分类" border left-arrow @click-left="back" @click-right="search" fixed z-index="10">
                <template #right>
                    <van-icon name="search" size="20" />
                </template>
            </van-nav-bar>
        </div>

        <van-pull-refresh v-model="isLoading" @refresh="onRefresh" success-text="刷新成功" pulling-text="下拉即可刷新...">

            <van-tabs color="#468C6A" title-active-color="#468C6A" animated @click="tabs">
                <van-tab v-for="ele in tree" :title="ele.categoryName" :key="ele.categoryId" :name="ele.categoryId">
                    <div class="box_tab">
                        <div :class="{ 'active': ele.categoryId == children.categoryId }" class="nav_tab"
                            v-for="children in ele.children" :key="children.categoryId"
                            @click="switchover({ categoryId: ele.categoryId, childrenId: children.categoryId })">
                            {{ children.categoryName }}
                        </div>
                    </div>
                </van-tab>
            </van-tabs>
            
            <div class="genre">
                <van-tabs color="#fff" title-active-color="#468C6A">
                    <van-tab v-for="(type, index) in genre" :title="type" :key="index">
                    </van-tab>
                </van-tabs>
            </div>
            <hr>

            <div class="book">
                <div class="module" v-for="ele in all" :key="ele.bookId" @click="abs(ele)">
                    <div class="left">
                        <div class="cover">
                            <img :src="ele.bookCover" alt="" class="auto-img">
                        </div>
                    </div>
                    <div class="right">
                        <div class="name">{{ ele.bookName }}</div>
                        <div class="author">{{ ele.bookAuthor }}</div>
                        <div class="intro">{{ ele.bookIntro }}</div>
                        <div class="readCnt">{{ ele.readCnt }}人在读</div>
                    </div>
                </div>
            </div>
        </van-pull-refresh>

    </div>
</template>

<script>
import qs from "qs";
import { mapMutations } from "vuex";
export default {
    data() {
        return {
            tree: null,
            all: null,
            isLoading: false,
            count: 1,
            genre: ['畅销', '人气', '最新']
        }
    },

    created() {
        this.hide()

        this.axios({
            method: "POST",
            url: "https://api.zglibrary.com/book/categories/tree",
            data: qs.stringify({
                from: "APP",
                sign: "3221DE9DFA87CBC796EC73EC4B024F6F",
                nonce: "XQIH5Qvt1HiHA7u2",
                timestamp: "1674096702282"
            }),
            headers: {
                "content-type": "application/x-www-form-urlencoded"
            },
        }).then((res) => {
            this.tree = res.data.data
        })

        this.axios({
            method: "POST",
            url: "https://api.zglibrary.com/book/book-info/page",
            data: qs.stringify({
                sortType: 2,
                size: 20,
                from: "APP",
                categoryId: 0,
                current: 1,
                isSale: 1,
                sign: "0EE9B1F4C733757422BD14DE8FD19395",
                nonce: "EtphMl3fMxS5ib6n",
                timestamp: "1674196452406"
            }),
            headers: {
                "content-type": "application/x-www-form-urlencoded"
            },
        }).then((res) => {
            this.all = res.data.data.records
        })
    },
    methods: {
        ...mapMutations(["show", "hide"]),
        onRefresh() {
            setTimeout(() => {
                this.isLoading = false;
                this.axios({
                    method: "POST",
                    url: "https://api.zglibrary.com/book/book-info/page",
                    data: qs.stringify({
                        sortType: 2,
                        size: 20,
                        from: "APP",
                        categoryId: 0,
                        current: 1,
                        isSale: 1,
                        sign: "0EE9B1F4C733757422BD14DE8FD19395",
                        nonce: "EtphMl3fMxS5ib6n",
                        timestamp: "1674196452406"
                    }),
                    headers: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                }).then((res) => {
                    this.all = res.data.data.records
                })
            }, 1000);
        },
        back() {
            this.show();
            this.$router.back();
        },
        search() {
            this.$router.push('/search');
        },
        switchover(event) {
            console.log(event);
        },
        tabs(name) {
            if (name == 1) {
                this.axios({
                    method: "POST",
                    url: "https://api.zglibrary.com/book/book-info/page",
                    data: qs.stringify({
                        sortType: '2',
                        size: '20',
                        from: "APP",
                        categoryId: 1,
                        current: '1',
                        isSale: '1',
                        sign: "1906D4C0CD3E88CAD9C8E98E43B55C57",
                        nonce: "AYelfk9g0E8ZLjNe",
                        timestamp: "1674196545579"
                    }),
                    headers: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                }).then((res) => {
                    this.all = res.data.data.records
                })
            } else if (name == 0) {
                this.axios({
                    method: "POST",
                    url: "https://api.zglibrary.com/book/book-info/page",
                    data: qs.stringify({
                        sortType: 2,
                        size: 20,
                        from: "APP",
                        categoryId: 0,
                        current: 1,
                        isSale: 1,
                        sign: "0EE9B1F4C733757422BD14DE8FD19395",
                        nonce: "EtphMl3fMxS5ib6n",
                        timestamp: "1674196452406"
                    }),
                    headers: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                }).then((res) => {
                    this.all = res.data.data.records
                })
            } else if (name == 20) {
                this.axios({
                    method: "POST",
                    url: "https://api.zglibrary.com/book/book-info/page",
                    data: qs.stringify({
                        sortType: 2,
                        size: 20,
                        from: "APP",
                        categoryId: 20,
                        current: 1,
                        isSale: 1,
                        sign: "A3E4CBE3AD0F2C7915A45A242502E253",
                        nonce: "gr10X4vPWZXrHr4b",
                        timestamp: "1674205234727"
                    }),
                    headers: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                }).then((res) => {
                    this.all = res.data.data.records
                })
            } else if (name == 267) {
                this.axios({
                    method: "POST",
                    url: "https://api.zglibrary.com/book/book-info/page",
                    data: qs.stringify({
                        sortType: 2,
                        size: 20,
                        from: "APP",
                        categoryId: 267,
                        current: 1,
                        isSale: 1,
                        sign: "9996BBCA85FDAFC11C5DD91E8DE2CF0B",
                        nonce: "2RWwWjpDJE5bZzEA",
                        timestamp: "1674205289410"
                    }),
                    headers: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                }).then((res) => {
                    this.all = res.data.data.records
                })
            } else if (name == 52) {
                console.log('其他');
            }

        },
        abs(event) {
            // console.log(event);
            this.$router.push({ path: '/details', query: { id: event.bookId, name: event.bookName } });

        }
    },
};
</script>

<style lang="scss" scoped>
.navbar {
    height: 46rem;
}

.box_tab {
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    .nav_tab {
        margin: 8rem;
        color: #7B8492;
        border-radius: 4rem;
    }
}

.book {
    margin: 0 10rem;
}

.module {
    display: flex;
    margin: 14rem 0;
    height: 120rem;
}

.left {
    flex-grow: 0;
    margin-right: 10rem;

    .cover {
        width: 70rem;
        height: 100rem;
        border-radius: 4rem;
    }

    .auto-img {
        display: block;
        width: 100%;
        border-radius: 4rem;
    }
}

.right {
    display: flex;
    flex-flow: column;
    justify-content: space-between;

    .name {
        font-size: 16rem;
        color: #000;
        font-weight: 500;
    }

    .author {
        color: #9DA8BB;
    }

    .intro {
        color: #6F7988;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .readCnt {
        color: #BCBCB8;
    }
}


.genre {
    // margin: 0 8rem;
    display: flex;
    align-items: center;

    >div {
        margin: 0 8rem;
    }
}
</style>
<template>
    <div class="search-item">
        <div class="hear">
            <div class="hear-box">
                <van-icon class="icon" name="arrow-left" @click="back" :size="20" />
                <div class="search">
                    <van-search @click="abs" show-action shape="round" autofocus v-model="value" placeholder="搜索书名/作者"
                        @search="onSearch()">
                        <template #action>
                            <div @click="onSearch()">搜索</div>
                        </template>
                    </van-search>
                </div>
            </div>
        </div>

        <div class="one" v-if="state">
            <div v-if="historyList.length" class="history everyone">
                <div class="up">
                    <div class="title">历史记录</div>
                    <div class="more" @click="removeHistory">清空历史</div>
                </div>
                <div class="down">
                    <div class="content" v-for="(s, i) in historyList" :key="i" @click="extract(s)">
                        {{ s }}
                    </div>
                </div>
            </div>

            <div class="everyone">
                <div class="up">
                    <div class="title">大家都在搜</div>
                    <div class="more" @click="switchover">换一批</div>
                </div>
                <div class="down">
                    <div class="content" v-for="ele in equal" :key="ele.hotId" @click="extract(ele.hotName)">
                        {{ ele.hotName }}
                    </div>
                </div>
            </div>
        </div>

        <div class="two" v-else>
            <div class="result" v-for="ele in book" :key="ele.bookId"
                @click="$router.push(`/particular/${ele.bookId}/${ele.title},hide()`)">
                <div class="cover">
                    <van-image :src="ele.cover" width="75rem" height="105rem">
                        <template v-slot:error>暂无封面</template>
                    </van-image>
                </div>
                <div class="right">
                    <div class="name">{{ ele.title }}</div>
                    <div class="author">{{ ele.author }}</div>
                    <div class="category">{{ ele.category }}</div>
                    <div class="intro">{{ ele.summary }}</div>
                </div>
            </div>

        </div>

        <div class="hot">
            <div class="title">热门精选</div>
            <div class="box">
                <div class="book" v-for="ele in hot" :key="ele.bookId">
                    <div class="bookCover">
                        <img :src="ele.bookCover" class="imgs" alt="" />
                    </div>
                    <div class="right">
                        <div class="name">{{ ele.bookName }}</div>
                        <div class="author">{{ ele.bookAuthor }}</div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import { mapMutations } from "vuex";
import qs from "qs";
export default {
    data() {
        return {
            value: "",
            // 大家都在搜
            equal: [],
            // 热门推荐
            hot: [],
            state: true,
            book: [],
            // 历史记录
            historyList: [],
        };
    },

    created() {
        this.hide()
        // 获取历史记录信息
        this.historyList = JSON.parse(localStorage.history || "[]");

        // 请求 大家都在搜 数据
        this.axios({
            method: "POST",
            url: "https://api.zglibrary.com/search/hot",
            data: qs.stringify({
                size: 10,
                from: "APP",
                current: 1,
                sign: "0F0E337176C9BAFEC21BB38324DEF96C",
                nonce: "F55Y3WtK5OwOQ7rD",
                timestamp: "1671716758596",
            }),
            headers: {
                "content-type": "application/x-www-form-urlencoded",
            },
        }).then((res) => {
            this.equal = res.data.data.records;
        });

        // 请求 热门推荐 数据
        this.axios({
            method: "POST",
            url: "https://api.zglibrary.com/book/recommend/book-common",
            data: qs.stringify({
                size: 6,
                from: "APP",
                type: "10",
                current: "1",
                sign: "77F68C5F8544BC0B98F34E9AE82F66AD",
                nonce: "YraH5bPrM2XQr4ym",
                timestamp: "1671716758594",
            }),
            headers: {
                "content-type": "application/x-www-form-urlencoded",
            },
        }).then((res) => {
            this.hot = res.data.data.records;
        });
    },

    methods: {
        ...mapMutations(["show", "hide"]),
        back() {
            this.show();
            this.$router.back();
        },

        abs() {
            this.state = true;
        },

        removeHistory() {
            localStorage.removeItem("history");
            this.historyList = [];
        },

        // 搜索
        onSearch() {
            if (this.value == "") {
                return;
            } else {
                // 清空上一次请求的数据
                this.book = []

                let history = JSON.parse(localStorage.history || "[]");
                history = [this.value, ...history.filter((h) => h !== this.value)];
                this.historyList = history;
                localStorage.history = JSON.stringify(history);

                this.axios
                    .get(
                        `https://apis.netstart.cn/yunyuedu/search/book.json?keyword=${this.value}`
                    )
                    .then(({ data }) => {
                        this.book = data.data.books
                    });

                this.state = false;

            }
        },
        // 点击大家都在搜的内容
        extract(event) {
            this.value = event;
            this.book = [];

            let history = JSON.parse(localStorage.history || "[]");
            history = [event, ...history.filter((h) => h !== event)];
            this.historyList = history;
            localStorage.history = JSON.stringify(history);

            this.state = false;

            this.axios
                .get(
                    `https://apis.netstart.cn/yunyuedu/search/book.json?keyword=${event}`
                )
                .then(({ data }) => {
                    this.book = data.data.books
                });

        },
        // 换一换
        switchover() {
            this.axios({
                method: "POST",
                url: "https://api.zglibrary.com/search/hot",
                data: qs.stringify({
                    size: 10,
                    from: "APP",
                    current: 1,
                    sign: "0F0E337176C9BAFEC21BB38324DEF96C",
                    nonce: "F55Y3WtK5OwOQ7rD",
                    timestamp: "1671716758596",
                }),
                headers: {
                    "content-type": "application/x-www-form-urlencoded",
                },
            }).then((res) => {
                this.equal = res.data.data.records;
            });
        },
    },
};
</script>

<style lang="scss" scoped>
.search-item {
    margin-bottom: 50rem;
}

.hear {
    height: 54rem;

    .hear-box {
        width: 100%;
        background-color: #fff;
        position: fixed;
        top: 0;
        left: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        z-index: 3;
    }

    .icon {
        margin-left: 10rem;
    }

    .search {
        flex: 1;
        width: 100%;
    }
}

.everyone {
    margin: 0 18rem;

    .up {
        margin: 14rem 0;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .title {
            font-weight: 600;
            font-size: 14rem;
        }

        .more {
            color: #4e9170;
            font-size: 12rem;
        }
    }

    .down {
        display: flex;
        flex-wrap: wrap;

        .content {
            flex-shrink: 1;
            margin: 4rem;
            padding: 4rem 10rem;
            background-color: #f6f6f6;
            border-radius: 14rem;
        }
    }
}

.hot {
    margin: 0 18rem;

    .title {
        padding: 10rem 0;
        font-weight: 600;
        font-size: 14rem;
    }
}

.box {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
}

.book {
    width: 46%;
    display: flex;
    margin: 0 0 20rem 0;

    .bookCover {
        flex-shrink: 0;
        width: 60rem;
        height: 80rem;

        .imgs {
            width: 100%;
            height: 100%;
            display: block;
        }
    }
}

.right {
    margin-left: 10rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .name {
        font-weight: 600;
        font-size: 12px;
    }

    .author {
        color: #a0abbe;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
}

.two {
    margin: 20rem 10rem;
}

.result {
    margin: 14rem 0;
    padding: 10px 0;
    display: flex;

    .cover {
        flex-shrink: 0;
        // width: 75rem;
        // height: 105rem;

        .auto-img {
            height: 100%;
            display: block;
        }
    }

    .right {
        margin-left: 12rem;
        color: #9ca7bb;
        display: flex;
        flex-direction: column;
        justify-content: space-between;


        .name {
            font-size: 16rem;
            color: #509372;
        }


        .intro {
            color: #9ca7bb;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }
    }
}
</style>
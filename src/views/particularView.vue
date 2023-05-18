<template>
    <div class="particular">

        <nav class="navbar">
            <van-nav-bar title="书籍详情" border left-arrow @click-left="$router.back(), show()" fixed z-index="10">
                <template #right>
                    <van-icon @click="$router.push('/search')" name="search" size="16" />
                    <div class="index" @click="$router.push('/'), show()">首页</div>
                </template>
            </van-nav-bar>
        </nav>

        <div class="content">
            <div class="heard">
                <div class="cover">
                    <van-image :src="book.coverImage" width="93rem" height="130rem">
                        <template v-slot:error>暂无封面</template>
                    </van-image>
                </div>
                <div class="right">
                    <div class="title">{{ bookDemo.title }}</div>
                    <div class="author">作者：{{ bookDemo.author?.name }}</div>
                    <div class="author">分类：{{ bookDemo['pris:book']?.category }}</div>
                    <div class="words">字数：{{ DigitalConversion }}</div>
                    <div class="click-rate">
                        {{ bookDemo['pris:subscribe']?.clicks }}
                        <van-rate v-model="value" :size="12" color="#ffd21e" void-icon="star" void-color="#999" />
                    </div>
                    <div class="impower">授权方：{{ bookDemo['pris:book']?.authorizer }}</div>
                </div>
            </div>

            <div class="button-group">
                <van-button class="read" color="#3C98C9" size="small" @click="readImmediately">{{ read }}</van-button>
                <van-button class="join" plain color="#3C98C9" size="small" v-if="bookshelfState"
                    @click="joinBookshelf">放入书架</van-button>
                <van-button class="join" plain color="#3C98C9" size="small" v-else @click="joinBookshelf">已在书架</van-button>
            </div>

            <div class="latest" @click="novelDetail(LatestChapter.uuid)">
                <i class="nov">最新</i>
                <div class="chapter">
                    <div class="name">{{ LatestChapter.title }}</div>
                    <div class="update">{{ bookDemo.updated?.split("T")[0] }}更新</div>
                </div>
            </div>

            <div class="summary">
                <div class="introduction">内容简介</div>
                {{ bookDemo?.summary }}
            </div>

            <div class="catalogue">
                <div class="name">目录<i>(共{{ catalogue.length }}章)</i></div>
                <div class="sequence" @click="row">
                    <div class="positive" v-if="state">
                        <div class="text">正序</div>
                        <van-icon name="down" size="14" />
                    </div>
                    <div class="inverted" v-else>
                        <div class="text">倒序</div>
                        <van-icon name="back-top" size="14" />
                    </div>
                </div>
            </div>

            <van-list>
                <!-- 章节 -->
                <van-cell :class="{ active: extrude == item.uuid }" @click="novelDetail(item.uuid)"
                    v-for="(item, index) in (catalogue.slice(0, 10))" :key="index" :title="item.title" />
            </van-list>

            <div class="more-demo" @click="allChapters">
                <van-button plain hairline color="#888" size="small" block>更多目录<van-icon name="arrow" /></van-button>
            </div>

        </div>

        <!-- 全部·章节 -->
        <div class="directory" v-show="listState">
            <div class="nav">
                <van-nav-bar fixed title="目录" left-arrow left-text="返回" size="16" right-text="首页"
                    @click-left="listState = false" @click-right="$router.push('/'), show()" />
            </div>
            <van-list>
                <van-cell :class="{ active: extrude == item.uuid }" class="v-list" @click="novelDetail(item.uuid)"
                    v-for="(item, index) in catalogue" :key="index" :title="item.title">
                </van-cell>
            </van-list>
        </div>

    </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
    props: ['id', 'title',],

    data() {
        return {
            // 书籍封面
            book: {},
            // 评分
            value: 0,
            // 最新章节
            LatestChapter: {},
            // 书籍详情
            bookDemo: {},
            // 目录
            catalogue: [],
            // 正倒序
            state: false,
            // 是否显示全部目录
            listState: false,
            // 书本是否添加到书架
            bookshelfState: true

        }
    },
    methods: {
        ...mapMutations(['show', 'hide']),
        row() {
            this.state = !this.state
            // 数组反转
            this.catalogue = this.catalogue.reverse()
        },

        novelDetail(contentId) {
            this.$toast.loading({
                message: '加载中...',
                forbidClick: true,
            })

            this.$router.push({
                name: 'chapter',
                params: {
                    id: this.id,
                    unid: contentId,
                    catalogue: this.catalogue
                }
            })
        },

        joinBookshelf() {

            let bookshelfList = JSON.parse(localStorage.bookshelfList || "[]")
            bookshelfList = [this.book, ...bookshelfList.filter((h) => h.title !== this.book.title)]
            localStorage.bookshelfList = JSON.stringify(bookshelfList)

            this.$toast.success('放入成功');

            if (!localStorage.bookshelfList) {
                return
            }

            let index = JSON.parse(localStorage.bookshelfList).findIndex((o) => o.sourceUuid == this.id)

            if (index != -1) {
                this.bookshelfState = false
            }
        },

        // 阅读历史记录
        readImmediately() {

            if (!localStorage.historyId) {
                return
            }

            let index = JSON.parse(localStorage.historyId).findIndex((o) => o.bookId == this.id)

            if (index == -1) {
                this.$router.push({
                    name: 'chapter',
                    params: {
                        id: this.id,
                        unid: this.catalogue[0].uuid,
                        catalogue: this.catalogue
                    }
                })

            } else {

                this.$router.push({
                    name: 'chapter',
                    params: {
                        id: JSON.parse(localStorage.historyId)[index].bookId,
                        unid: JSON.parse(localStorage.historyId)[index].contentId,
                        catalogue: this.catalogue
                    }
                })
            }

        },

        // 显示全部目录
        allChapters() {
            this.listState = true;
        }
    },
    created() {
        this.hide()

        this.axios.get(`https://apis.netstart.cn/yunyuedu/book/getsub.json?id=${this.id}&title=${this.title}`).then((data) => {
            this.bookDemo = data.data.feed.entry
            this.value = Number(this.bookDemo['pris:ranking'].value)
        })

        this.axios.get(`https://apis.netstart.cn/yunyuedu/reader/book/info.json?source_uuid=${this.id}&size=20`).then(({ data }) => {
            this.book = data.data.book
            this.catalogue = [...data.data.catalog]
            // 获取数组最后一章
            this.LatestChapter = (this.catalogue).at(-1)
        })

        if (!localStorage.bookshelfList) {
            return
        }
        let index = JSON.parse(localStorage.bookshelfList).findIndex((o) => o.sourceUuid == this.id)
        if (index != -1) {
            this.bookshelfState = false
        }

    },
    computed: {
        DigitalConversion() {
            return (this.bookDemo['pris:book']?.words / 10000).toFixed(1) + '万';
        },

        read() {
            let name = '立即阅读'

            if (!localStorage.historyId) {
                return name
            }

            let index = JSON.parse(localStorage.historyId).findIndex((o) => o.bookId == this.id)

            if (index != -1) {
                name = '继续阅读'
            }
            return name
        },

        extrude() {
            if (!localStorage.historyId) {
                return
            }

            let [book] = JSON.parse(localStorage.historyId).filter(o => o.bookId == this.id)
            return book?.contentId
        }

    },


}
</script>

<style lang="scss" scoped>
.particular {
    position: relative;
    margin-bottom: 20rem;

    .directory {
        width: 100%;
        height: 100%;
        position: fixed;
        background-color: #fff;
        top: 0;
        left: 0;
        z-index: 10;
        overflow: auto;

        .nav {
            height: 46px;
        }

        .v-list {
            background-color: #FAF7F5;
        }
    }
}

.active {
    font-size: 18rem;
    font-weight: 600;
    color: #008000;
}

.navbar {
    height: 46px;

    .index {
        font-size: 14rem;
        margin-left: 10rem;
        font-weight: 500;
    }
}

.content {
    margin: 0 10rem;
}

.heard {
    display: flex;

    .cover {
        margin-right: 20rem;
    }
}

.right {
    color: #888;
    font-size: 12rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    .title {
        color: #000;
        font-weight: 600;
        font-size: 16rem;
    }
}

.button-group {
    margin: 10rem 0;
    display: flex;
    justify-content: space-between;

    .read,
    .join {
        width: 46%;
    }
}

.latest {
    display: flex;
    background-color: #EBE8E6;
    padding: 10rem;

    .nov {
        height: 20rem;
        line-height: 20rem;
        padding: 0 4rem;
        margin-right: 4rem;
        font-size: 12rem;
        color: #fff;
        background-color: #88C2BD;
    }
}

.chapter {

    .name {
        line-height: 20rem;
        color: #3A98C9;
        font-size: 16rem;
    }

    .update {
        padding: 4rem 0;
        color: #888;
    }
}

.summary {
    font-size: 14rem;
    line-height: 18rem;
    color: #888;
    padding-bottom: 20rem;
    border-bottom: 1px solid #dfdfdf;

    .introduction {
        padding: 16rem 0 10rem 0;
        color: #000;
        font-size: 18rem;
        font-weight: 700;
    }
}


.catalogue {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .name {
        margin: 10rem 0;
        line-height: 26rem;
        font-size: 18rem;
        font-weight: 600;
        color: #000;

        i {
            font-size: 12rem;
            font-weight: 300;
            color: #888
        }
    }

}

.positive,
.inverted {
    display: flex;
    align-items: center;
    font-weight: 900;
    color: #3A98C9;

    .text {
        margin-right: 4rem;
    }
}
</style>
<template>
    <div class="chapter-content" :class="ModeSwitching" @click="showPopup">

        <div class="content">
            <van-popup :overlay="false" v-model="showed" :lock-scroll="false" position="top" :style="{ height: '8%' }">
                <van-nav-bar class="nav" left-arrow @click-left="$router.back()" @click-right="$router.push('/'), show()">
                    <template #right>
                        <van-icon name="wap-home" size="26" color="#008000" />
                    </template>
                </van-nav-bar>
            </van-popup>

            <!-- 小说内容 -->
            <div class="pay" v-show="loadedState">内容正在加载中...</div>

            <div v-show="!loadedState" class="details" ref="matter">
                <div class="deta-content" v-html="content"></div>
            </div>

            <van-popup class="popup" :overlay="false" v-model="showed" :lock-scroll="false" position="bottom"
                :style="{ height: '8%' }">

                <div @click.stop="catalogues" class="action">
                    <van-icon class="icon" name="orders-o" size="20" />
                    <div>目录</div>
                </div>
                <!-- @click.stop="$router('/books')" -->
                <div class="action" @click="$router.push('/books'), show()">
                    <van-icon class="icon" name="bar-chart-o" size="20" />
                    <div>书架</div>
                </div>

                <div @click="pattern = !pattern" class="action" v-show="pattern">
                    <van-icon class="icon" name="bulb-o" size="20" />
                    <div>日间模式</div>
                </div>

                <div @click="pattern = !pattern" class="action" v-show="!pattern">
                    <van-icon class="icon" name="closed-eye" size="20" />
                    <div>夜间模式</div>
                </div>

                <div class="action">
                    <van-icon class="icon" name="setting-o" size="20" />
                    <div>设置</div>
                </div>
            </van-popup>

            <!-- animate__delay-0.1s 持续时间 -->
            <transition enter-active-class="animate__animated animate__fadeInLeft"
                leave-active-class="animate__animated animate__fadeOutLeft ">
                <div class="cata" v-show="catalogueState">
                    <!-- 全部章节 -->
                    <van-list>
                        <van-cell :class="{ active: assistId == item.uuid }" @click="read(item.uuid)"
                            v-for="(item, index) in (catalogue)" :key="index" :title="item.title" />
                    </van-list>
                </div>
            </transition>

        </div>

    </div>
</template>

<script>
import { mapMutations } from 'vuex';
import BScroll from '@better-scroll/core'
import PullDown from "@better-scroll/pull-down";
import PullUp from '@better-scroll/pull-up';
BScroll.use(PullDown);
BScroll.use(PullUp);


export default {
    props: ['unid', 'catalogue', 'id'],
    data() {
        return {
            // 记录当前阅读章节ID
            assistId: null,
            content: null,
            // content: [],
            showed: false,
            // 日夜模式切换
            pattern: false,
            catalogueState: false,
            // 显示加载状态
            loadedState: true,
            index: null,
            bScroll: null,
            historyList: [],
        }
    },

    created() {
        this.assistId = this.unid;
        this.axios.get(`https://apis.netstart.cn/yunyuedu/reader/book/content.json?source_uuid=${this.id}&content_uuid=${this.unid}`).then((res) => {
            this.content = res.data?.data?.content || '<h3 class="pay">vip章节，请购买VIP</h3>'
            this.loadedState = false

            // 重新计算 BScroll ，当页面渲染完成
            this.$nextTick(() => {
                this.bScroll.refresh()
            })
        })
        // 获取当前阅读数组的下标
        this.index = this.catalogue.findIndex((o) => o.uuid == this.unid)
    },

    methods: {
        ...mapMutations(['show', 'hide']),

        // 初始化betterScroll
        initialBScroll() {
            this.bScroll = new BScroll(this.$refs.matter, {
                click: true,
                bounce: true,
                pullUpLoad: true,//上拉加载更多

                pullDownRefresh: {
                    threshold: 20,//触发pullingDown事件的位置
                    stop: -10//下拉回弹后停留的位置
                }
            })
        },

        showPopup() {
            this.showed = !this.showed
            if (this.catalogueState) {
                this.catalogueState = false
            }
        },

        catalogues() {
            this.catalogueState = !this.catalogueState
        },

        read(item) {
            this.assistId = item
            this.loadedState = true

            this.$toast.loading({
                message: '加载中...',
                forbidClick: true,
            })

            this.axios.get(`https://apis.netstart.cn/yunyuedu/reader/book/content.json?source_uuid=${this.id}&content_uuid=${item}`).then((res) => {
                this.content = res.data?.data?.content || '<h3 class="pay">vip章节，请购买VIP</h3>'
                // this.content.push(res.data?.data?.content || '<h3 class="pay">vip章节，请购买VIP</h3>')
                this.loadedState = false

                this.$nextTick(() => {
                    this.bScroll.refresh()
                })
            })

            // 获取当前阅读数组的下标
            this.index = this.catalogue.findIndex((o) => o.uuid === item)
        },

        // 下拉加载
        pullingDownHandler() {

            if (this.index <= 0) {
                this.bScroll.finishPullDown() //每次下拉结束后，需要执行这个操作
                return
            }

            // 轻提示
            this.$toast.loading({
                message: '加载中...',
                forbidClick: true,
            })

            this.index--;

            if (this.index < 0) {
                this.bScroll.finishPullDown() //每次下拉结束后，需要执行这个操作
                return
            }

            // 当前章节ID
            this.assistId = this.catalogue[this.index].uuid

            this.axios.get(`https://apis.netstart.cn/yunyuedu/reader/book/content.json?source_uuid=${this.id}&content_uuid=${this.assistId}`).then((res) => {
                this.content = res.data?.data?.content || '<h3 class="pay">vip章节，请购买VIP</h3>'
                this.$nextTick(() => {
                    this.bScroll.refresh() //当滚动区域的dom结构有变化时，需要执行这个操作
                })
            })

            this.bScroll.finishPullDown() //每次下拉结束后，需要执行这个操作
        },

        // 上拉加载
        pullingUpHandler() {
            if (this.catalogue.length - 1 == this.index) {
                console.log('这已是最后一章');
                this.bScroll.finishPullUp();//每次上拉结束后，需要执行这个操作
                return
            }

            this.index += 1;

            this.assistId = this.catalogue[this.index].uuid

            this.loadedState = true
            this.$toast.loading({
                message: '加载中...',
                forbidClick: true,
            })

            this.axios.get(`https://apis.netstart.cn/yunyuedu/reader/book/content.json?source_uuid=${this.id}&content_uuid=${this.assistId}`).then((res) => {
                this.content = res.data?.data?.content || '<h3 class="pay">vip章节，请购买VIP</h3>'
                this.loadedState = false

                this.$nextTick(() => {
                    this.bScroll.refresh()
                    // 重新计算开始滚动位置
                    // scrollTo(x轴坐标, y轴坐标, 动画时长, undefined)
                    this.bScroll.scrollTo(0, 0, 0, undefined)
                })
            })
            this.bScroll.finishPullUp();//每次上拉结束后，需要执行这个操作
        }
    },

    mounted() {
        this.initialBScroll()
        //监听下拉刷新
        this.bScroll.on("pullingDown", this.pullingDownHandler);
        //上拉加载更多
        this.bScroll.on("pullingUp", this.pullingUpHandler);
    },

    computed: {
        ModeSwitching() {
            let demo = 'daytime';
            if (!this.pattern) {
                return demo = 'night'
            }
            return demo
        }
    },

    watch: {
        assistId(n) {
            let history = JSON.parse(localStorage.historyId || "[]")
            history = [{ bookId: this.id, contentId: n }, ...history.filter((h) => h.bookId !== this.id)]
            localStorage.historyId = JSON.stringify(history)
        }
    },

    beforeDestroy() {
        // 销毁bScroll
        this.bScroll.destroy()
    }
}
</script>

<style lang="scss">
.chapter-content {
    height: 100%;

    &.daytime {
        color: #787878;
        background-color: #2F2F2F;
    }

    &.night {
        background-color: #F7F5F2;
        color: #000;
    }

    .pay {
        height: 100vh;
        padding: 30rem 0;
        font-size: 30rem;
        font-weight: 600;
        text-align: center;
    }

    .details {
        height: 100vh;
        overflow: hidden;
        font-size: 16rem;
        line-height: 20rem;
    }

    .m-content {
        font-family: "Arial", "Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;

        h1,
        h2,
        h3 {
            padding: 60rem 0 20rem 0;
            font-size: 1.3em;
            font-weight: 600;
        }

        p {
            line-height: 36rem;
            padding-bottom: 20rem;
            // 首行缩讲
            text-indent: 30rem;
        }

        .yd-fullscreen {
            width: 360rem auto;
            height: 90vh;

            .paragraph-img {
                width: 100%;
                height: 100%;
                display: block;
            }
        }
    }


    .content {
        padding: 0 10rem;
        position: relative;
        z-index: 99999;
    }

    .popup {
        display: flex;
        align-items: center;
        justify-content: space-around;

        .action {
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .icon {
            margin-bottom: 4rem;
        }
    }

    .cata {
        width: 80%;
        background-color: #FBF7F3;
        position: fixed;
        top: 54rem;
        left: 0;
        bottom: 53rem;
        overflow: scroll;
    }

    .active {
        font-size: 18rem;
        font-weight: 600;
        color: #008000;
    }

}
</style>
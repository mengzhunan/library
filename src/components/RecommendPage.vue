<template>
    <div class="recommend">
        <van-swipe class="my-swipe" :autoplay="5000" indicator-color="white">
            <van-swipe-item v-for="data in RotationChart" :key="data.indexNo">
                <img class="auto-img" :src="data.materialImg" alt="">
            </van-swipe-item>
        </van-swipe>

        <div class="nav_box">
            <div class="list" v-for="ele in res" :key="ele.navId" @click="navigation(ele.navId)">
                <div class="icon">
                    <img :src="ele.navIcon" alt="">
                </div>
                <div class="text">{{ ele.navName }}</div>
            </div>
        </div>

        <div class="book_express">
            <TitleStyle name="新书速递" more="查看全部" />
            <NewBook :books="books"/>
        </div>

        <div class="hot">
            <TitleStyle name="畅销热门" more="查看更多" />
            <!-- <ConvergenceMedia :hot="hot" /> -->
            <NewConvergenceMedia :hot="hot" />
        </div>

        <div class="activity">
            <TitleStyle name="官方活动" more="更多活动" />
            <div class="act-content" v-for="act in activity" :key="act.subjectId">
                <div class="img">
                    <img class="auto-img" :src="act.subjectCover" alt="">
                </div>
                <div class="img-title">{{ act.subjectTitle }}</div>
                <div class="identify">
                    <div class="cover">
                        <img :src="act.authorAvatar" alt="" class="auto-img">
                    </div>
                    <div class="author">{{ act.authorName }}</div>
                </div>
            </div>
        </div>

        <!-- 图书推荐广告 -->
        <van-swipe :autoplay="10000" indicator-color="white">
            <van-swipe-item class="rec_swipe" v-for="data in recommendation" :key="data.indexNo">
                <img class="auto-img" :src="data.materialImg" alt="">
            </van-swipe-item>
        </van-swipe>

        <div class="SelectedBook" v-if="SelectedBook.length == 1">

            <TitleStyle name="馆长精选书单" more="更多书单" />

            <div class="s_book" v-for="ele in SelectedBook" :key="ele.postId">
                <div class="s_img_box">
                    <div class="s_cover" v-for="(bg, index)  in ele.bookCoverList " :key="index">
                        <img class="auto-img" :src="bg" alt="">
                    </div>
                </div>

                <div class="s_text">
                    <div class="up">
                        <div class="s_til">{{ ele.booklistName }}</div>
                        <div class="s_con">{{ ele.booklistIntro }}</div>
                    </div>
                    <div class="down">
                        <div class="s_tol">共{{ ele.bookCnt }}本</div>
                        <div class="s_pro">{{ ele.readCnt }} 人在看</div>
                    </div>
                </div>
            </div>
        </div>

        <ReadingHighlights />

        <div class="selection">
            <TitleStyle name="小说精选" more="更多好书" />
            <SelectedNovels :book="selection" />
        </div>

        <div class="scriptures">
            <TitleStyle name="文学经典" more="更多好书" />
            <SelectedNovels :book="scriptures" />
        </div>

        <div class="media">
            <TitleStyle name="融合媒体书" more="" />
            <div class="rich">让你轻松读懂</div>
            <ConvergenceMedia :hot="media" />
        </div>

        <!-- 达人讲书馆组件 -->
        <storytellerPage />
        <!-- 好物精选组件 -->
        <fineGoods />

        <div class="assault">
            <TitleStyle name="人生逆袭" more="更多好书" />
            <ConvergenceMedia :hot="assault" />
        </div>

        <div class="heat">
            <TitleStyle name="经济管理" more="更多好书" />
            <ConvergenceMedia :hot="heat" />
        </div>

        <div class="economics">
            <TitleStyle name="心里热读" more="更多好书" />
            <SelectedNovels :book="economics" />
        </div>

        <div class="historia">
            <TitleStyle name="历史传记" more="更多好书" />
            <SelectedNovels :book="historia" />
        </div>

        <div class="science">
            <TitleStyle name="社会科学" more="更多好书" />
            <SelectedNovels :book="science" />
        </div>

        <expressPage />

    </div>
</template>

<script>
import { mapMutations } from "vuex";
import qs from "qs";
import ReadingHighlights from "@/components/ReadingHighlights.vue"
import SelectedNovels from "@/components/SelectedNovels.vue"
import ConvergenceMedia from "@/components/ConvergenceMedia.vue"
import storytellerPage from "@/components/storytellerPage.vue"
import fineGoods from "@/components/fineGoods.vue"
import expressPage from "@/components/expressPage.vue"
import TitleStyle from '@/components/TitleStyle.vue'
import NewBook from '@/components/NewBook.vue'
import NewConvergenceMedia from "@/components/NewConvergenceMedia.vue"


export default {
    components: {
        ReadingHighlights,
        SelectedNovels,
        ConvergenceMedia,
        storytellerPage,
        fineGoods,
        expressPage,
        TitleStyle,
        NewBook,
        NewConvergenceMedia
    },
    data() {
        return {
            res: null, //导航
            RotationChart: null, //顶部轮播图
            books: [],
            book: null, //新书速递
            hot: null, //畅销热门
            recommendation: null, //图书推荐广告
            SelectedBook: [],
            activity: null, //官方活动
            selection: null, //小说精选
            scriptures: null, //文学精选
            media: null, //融合媒体书
            assault: null, //人生逆袭
            heat: null, //心里热读
            economics: null, //经济管理
            historia: null, //历史传记
            science: null, //社会科学
        }
    },

    created() {
        // 轮番图
        this.axios({
            method: "POST",
            url: "https://api.zglibrary.com/adv/info/all",
            data: qs.stringify({
                channel: "99",
                sign: "06FD743656330477CFD8E055045C90F0",
                nonce: "0ROeZdc6QEYg1rQt",
                timestamp: "1671874438764"
            }),
            headers: {
                "content-type": "application/x-www-form-urlencoded"
            },
        }).then((res) => {
            this.RotationChart = res.data.data.records[6].platformAdvConfigVO.advMaterialVOs
            this.recommendation = res.data.data.records[5].platformAdvConfigVO.advMaterialVOs
        })

        // 导航
        this.axios({
            method: "POST",
            url: "https://api.zglibrary.com/find/v2/recommend/newResource",
            data: qs.stringify({
                from: "APP",
                sectionId: "2",
                layoutId: "1",
                dateSource: "2",
                sign: "196AF7D80AC5D5D4C580B45BEAC342C5",
                nonce: "TSS6wJxSufJGOvgk",
                timestamp: "1671854981516"
            }),
            headers: {
                "content-type": "application/x-www-form-urlencoded"
            },
        }).then((res) => {
            this.res = res.data.data.records
        })

        // 新书速递
        this.axios.get('https://apis.netstart.cn/yunyuedu/source/v2/searchBook.json?catId=11').then((res) => {
            this.books = res.data.list.slice(0, 9)
        })

        // 畅销热门
        this.axios.get('https://apis.netstart.cn/yunyuedu/source/v2/searchBook.json?catId=1').then((res) => {
            this.hot = res.data.list.slice(0, 12)
        })

        // 馆长精选书单
        this.axios({
            method: "POST",
            url: "https://api.zglibrary.com/find/v2/recommend/newResource",
            data: qs.stringify({
                from: "APP",
                sectionId: "9",
                layoutId: "1",
                dateSource: "10",
                sign: "433E4319C0CDB16134D0087B6FFA5E51",
                nonce: "W86hMUbiXurgxTHN",
                timestamp: "1671697136272"
            }),
            headers: {
                "content-type": "application/x-www-form-urlencoded"
            },
        }).then((SelectedBook) => {
            this.SelectedBook = SelectedBook.data.data.records
        })

        // 官方活动
        this.axios({
            method: "POST",
            url: "https://api.zglibrary.com/find/v2/recommend/newResource",
            data: qs.stringify({
                from: "APP",
                sectionId: "13",
                layoutId: "1",
                dateSource: "14",
                sign: "EAD23F3C22E3D68157F3AA34CFF6BFC5",
                nonce: "i7k5jVS0A6jh7BTl",
                timestamp: "1671697136089"
            }),
            headers: {
                "content-type": "application/x-www-form-urlencoded"
            },
        }).then((activity) => {
            this.activity = activity.data.data.records
        })

        // 小说精选
        this.axios({
            method: "POST",
            url: "https://api.zglibrary.com/find/v2/recommend/newResource",
            data: qs.stringify({
                from: "APP",
                sectionId: "121",
                layoutId: "1",
                dateSource: "4",
                sign: "3BB98C06B84DABFF8EBD92216700BE9D",
                nonce: "a8agDSgGRapnt1dn",
                timestamp: "1671697136860"
            }),
            headers: {
                "content-type": "application/x-www-form-urlencoded"
            },
        }).then((selection) => {
            // console.log('selection=>', selection);
            this.selection = selection.data.data.records
        })

        // 文学经典
        this.axios({
            method: "POST",
            url: "https://api.zglibrary.com/find/v2/recommend/newResource",
            data: qs.stringify({
                from: "APP",
                sectionId: "120",
                layoutId: "1",
                dateSource: "4",
                sign: "F7653F446C672B619FD55AD6CE51D7D5",
                nonce: "SRfLK5S0GQrgWIEk",
                timestamp: "1671697137057"
            }),
            headers: {
                "content-type": "application/x-www-form-urlencoded"
            },
        }).then((scriptures) => {
            this.scriptures = scriptures.data.data.records
        })

        //融合媒体书
        this.axios({
            method: "POST",
            url: "https://api.zglibrary.com/find/v2/recommend/newResource",
            data: qs.stringify({
                from: "APP",
                sectionId: "33",
                layoutId: "1",
                dateSource: "17",
                sign: "60C7B62153BB1EA108C16B9956ADB0A6",
                nonce: "4YU14uVNGGvL8vC6",
                timestamp: "1671697137255"
            }),
            headers: {
                "content-type": "application/x-www-form-urlencoded"
            },
        }).then((media) => {
            this.media = media.data.data.records
        })

        // 人生逆袭
        this.axios({
            method: "POST",
            url: "https://api.zglibrary.com/find/v2/recommend/newResource",
            data: qs.stringify({
                from: "APP",
                sectionId: "30",
                layoutId: "1",
                dateSource: "17",
                sign: "0EE26CE6322597D91CB0E79F79073EC5",
                nonce: "9L4hiGU9dGIuB70O",
                timestamp: "1671697137850"
            }),
            headers: {
                "content-type": "application/x-www-form-urlencoded"
            },
        }).then((assault) => {
            this.assault = assault.data.data.records
        })

        // 心里热读
        this.axios({
            method: "POST",
            url: "https://api.zglibrary.com/find/v2/recommend/newResource",
            data: qs.stringify({
                from: "APP",
                sectionId: "31",
                layoutId: "1",
                dateSource: "17",
                sign: "24C248D6211685BE9F0F90F2158118D0",
                nonce: "R5QOrbh4e8in05hQ",
                timestamp: "1671697138043"
            }),
            headers: {
                "content-type": "application/x-www-form-urlencoded"
            },
        }).then((heat) => {
            this.heat = heat.data.data.records
        })

        // 经济管理
        this.axios({
            method: "POST",
            url: "https://api.zglibrary.com/find/v2/recommend/newResource",
            data: qs.stringify({
                from: "APP",
                sectionId: "127",
                layoutId: "1",
                dateSource: "4",
                sign: "80A3870B9CF64F66A88A19B3907513D4",
                nonce: "EyQ9mANYusvJAXGO",
                timestamp: "1671697138247"
            }),
            headers: {
                "content-type": "application/x-www-form-urlencoded"
            },
        }).then((economics) => {
            this.economics = economics.data.data.records
        })

        // 历史传记
        this.axios({
            method: "POST",
            url: "https://api.zglibrary.com/find/v2/recommend/newResource",
            data: qs.stringify({
                from: "APP",
                sectionId: "128",
                layoutId: "1",
                dateSource: "4",
                sign: "31457FA0168E77E185496F0E40AA9B8B",
                nonce: "gE5vbKJcgKR6BXsU",
                timestamp: "1671697138455"
            }),
            headers: {
                "content-type": "application/x-www-form-urlencoded"
            },
        }).then((historia) => {
            this.historia = historia.data.data.records
        })

        // 社会科学
        this.axios({
            method: "POST",
            url: "https://api.zglibrary.com/find/v2/recommend/newResource",
            data: qs.stringify({
                from: "APP",
                sectionId: "129",
                layoutId: "1",
                dateSource: "4",
                sign: "32E7F9A6556F6745C40E8DA4A39EF979",
                nonce: "GrhFS6uPgBzzX2h5",
                timestamp: "1671697138663"
            }),
            headers: {
                "content-type": "application/x-www-form-urlencoded"
            },
        }).then((science) => {
            this.science = science.data.data.records
        })

    },

    methods: {
        ...mapMutations(['show', 'hide']),
        navigation(event) {
            this.hide();
            if (event == 1) {
                this.$router.push({ path: '/stack', query: { id: event } });
            } else if (event == 2) {
                this.$router.push({ path: '/bookList', query: { id: event } });
            } else if (event == 5) {
                this.$router.push({ path: '/reading', query: { id: event } });

            } else if (event == 3) {
                this.$router.push({ path: '/narrate', query: { id: event } });

            } else {
                this.$router.push({ path: '/vip', query: { id: event } });
            }
        }
    }


}
</script>

<style lang="scss" scoped>
.recommend {
    overflow: scroll;
    height: 100%;
    padding: 0 10px;

    .auto-img {
        width: 100%;
        height: 100%;
        border-radius: 2px;
        display: block;
    }

    .my-swipe {
        height: 150rem;
        border-radius: 4rem;

        .auto-img {
            width: 100%;
            height: 100%;
            display: block;
            border-radius: 4rem;
        }
    }
}

.rec_swipe {
    height: 290rem;
    width: 100vh;

    .auto-img {
        width: 100%;
        height: 100%;
        display: block;
        border-radius: 4rem;
    }
}

.nav_box {
    margin: 20rem 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.list {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .icon {
        width: 36rem;
        height: 36rem;

        img {
            width: 100%;
        }
    }

    .text {
        margin: 6rem 0;
        color: #777
    }
}

.SelectedBook {
    margin: 30rem 0;

    .s_book {
        position: relative;
        display: flex;
        justify-content: space-between;

        .s_img_box {
            width: 108rem;
            height: 108rem;
            margin-right: 20rem;
        }
    }

    .s_cover {
        width: 76rem;
        height: 108rem;
        box-sizing: border-box;
        border-radius: 6px 4px 4px 6px;
        margin-right: 10rem;

        &:nth-child(1) {
            position: absolute;
            top: 0;
            left: 0;
            z-index: 5;
        }

        &:nth-child(2) {
            width: 70rem;
            height: 100rem;
            position: absolute;
            top: 8rem;
            left: 14rem;
            z-index: 4;
        }

        &:nth-child(3) {
            width: 50rem;
            height: 78rem;
            position: absolute;
            top: 31rem;
            left: 42rem;
            z-index: 3;
        }
    }

}

.s_text {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .up {
        .s_til {
            color: #000;
            font-weight: bold;
            font-size: 14rem;
            letter-spacing: 0rem;
        }

        .s_con {
            color: #bbb;
        }
    }

    .down {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #bbb;
    }
}

.activity {
    padding-top: 10rem;
}

.act-content {
    margin-top: 10rem;
    padding-bottom: 50rem;

    .img-title {
        font-size: 14rem;
        font-weight: bold;
        margin: 8rem 0;
    }
}

.identify {
    display: flex;
    padding: 0 0 4rem;
    border-bottom: 1px solid #ccc;

    .cover {
        width: 18rem;
        height: 18rem;
        margin-right: 6rem;

        .auto-img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            display: block;
        }
    }
}

.rich {
    color: #E2C48E;
    margin: 0 0 12rem 6rem;
}

.heat {
    margin: 30rem 0;
}
</style>
<!-- 社区 -->
<template>
    <div>
        <div class="nav">
            <van-tabs class="tabs" color="#F5C265" swipeable>
                <van-tab to="community" title="圈子"></van-tab>
                <van-tab to="topic" title="话题"></van-tab>
                <van-tab to="attention" title="关注"></van-tab>
                <van-tab to="abstracts" title="书摘"></van-tab>
            </van-tabs>
        </div>

        <router-view :circle="discoveryCircle" :essay="latestEssay" :dynamic="dynamic" />
    </div>
</template>

<script>
import qs from 'qs'
export default {
    data() {
        return {
            // 最新短文
            latestEssay: [],
            // 发现圈子
            discoveryCircle: [],
            // 最热动态
            dynamic: []

        }
    },
    created() {
        this.$axios.get('https://api.zglibrary.com/post/circle/getCircleListByLike?from=APP&limit=9&nonce=m7rkD1P9tDM4onz0&timestamp=1675241848452&sign=A549B5E52CC11CA4149435EF34D6B215').then((res) => {
            this.discoveryCircle = res.data.data.records
        })

        this.axios({
            method: "POST",
            url: "https://api.zglibrary.com/community/app/article/page",
            data: qs.stringify({
                sortType: "create_desc",
                size: "3",
                from: "APP",
                current: "1",
                scene: "home_recommend",
                sign: "509B04BE62CEFD8999BF55A7D8064EAD",
                nonce: "Dza5AbYvY0NdaHey",
                timestamp: "1675241848206"
            }),
            headers: {
                "content-type": "application/x-www-form-urlencoded"
            },
        }).then((res) => {
            this.latestEssay = res.data.data.records
        })

        this.axios({
            method: "POST",
            url: "https://api.zglibrary.com/post/circle/getHomePagePostV2",
            data: qs.stringify({
                size: "10",
                from: "APP",
                current: "1",
                sign: "683BE7C49D8E99E2A69879EA2F8AEA55",
                nonce: "rDkkk8VEKBvyk1yl",
                timestamp: "1675241848618"
            }),
            headers: {
                "content-type": "application/x-www-form-urlencoded"
            },
        }).then((res) => {
            this.dynamic = res.data.data.records
        })

    },
}
</script>

<style lang="scss" scoped>
.nav {
    width: 100%;
    height: 44px;
    background-color: #fff;
    position: sticky;
    top: 0;
    left: 0;

    .tabs {
        padding-left: 20rem;
        width: 54%;
    }
}
</style>
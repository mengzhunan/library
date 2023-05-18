<!-- 借阅馆 -->
<template>
    <div class="borrow">
        <van-swipe class="my-swipe" :autoplay="5000" indicator-color="white">
            <van-swipe-item v-for="data in all" :key="data.indexNo">
                <img class="auto-img" :src="data.materialImg" alt="">
            </van-swipe-item>
        </van-swipe>
        <TitleReuse :res="res" />
    </div>
</template>

<script>
import qs from "qs";
import TitleReuse from "@/components/borrow/TitleReuse.vue"

export default {
    components: {
        TitleReuse
    },
    data() {
        return {
            all: [],
            res: [],
        }
    },
    created() {
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
            this.all = res.data.data.records[6].platformAdvConfigVO.advMaterialVOs
        })

        this.axios({
            method: "POST",
            url: "https://api.zglibrary.com/find/v2/recommend/newResource",
            data: qs.stringify({
                from: "APP",
                sectionId: "90",
                layoutId: "2",
                dateSource: "2",
                sign: "EAF1595ED9BF2E647345EBF1E90BAF9B",
                nonce: "up1Fa2EtEty74uMz",
                timestamp: "1674791692184"
            }),

            headers: {
                "content-type": "application/x-www-form-urlencoded"
            },
            
        }).then((res) => {
            this.res = res.data.data.records
        })
    },

}
</script>

<style lang="scss" scoped>
.my-swipe {
    margin-top: 16rem;
    height: 150rem;
    border-radius: 4rem;

    .auto-img {
        width: 100%;
        height: 100%;
        display: block;
        border-radius: 4rem;
    }
}
</style>
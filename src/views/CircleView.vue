<template>
    <div class="circle">

        <div class="essay">
            <subTitle text="最新短文" />
            <div>
                <latestEssay v-for="(e, index) in essay" :key="index" :e="e" />
            </div>
        </div>
        <div class="entry">
            <subTitle text="发现圈子" />
            <div>
                <entryCnt :circle="circle" />
            </div>
        </div>

        <div class="behavior">
            <hottestBehavior :d="dynamic" />
        </div>

        <van-divider :style="{ color: '#9CA7BA', borderColor: '#ECEFF1', padding: '0 10px' }">
            以下为精选内容
        </van-divider>

    </div>
</template>

<script>
import latestEssay from '@/components/community/latestEssay.vue'
import subTitle from '@/components/community/subTitle.vue'
import entryCnt from '@/components/community/entryCnt.vue'
import hottestBehavior from '@/components/community/hottestBehavior.vue'

export default {
    props: ['circle', 'essay', 'dynamic'],
    components: {
        latestEssay,
        subTitle,
        entryCnt,
        hottestBehavior
    }
}
</script>

<style lang="scss" scoped>
.circle {
    background-color: #F6F6F6;

    .essay,.behavior,.entry{
        padding: 0 10rem;
    }
    .essay,.behavior {
        background-color: #fff;
    }

    .entry{
        background-color: #fff;
    }
}
</style>
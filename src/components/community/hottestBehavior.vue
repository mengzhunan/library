<template>
    <div class="dynamic">
        <div class="top">
            <subTitle text="最热动态" />
            <div @click="num">换一换</div>
        </div>

        <div class="heard">
            <div class="circle">
                <div class="avatar">
                    <img :src="d[i]?.circleAvatar" alt="" class="auto-img">
                </div>
                <div class="right">
                    <div class="name">来自<span>{{ d[i]?.circleName }}</span></div>
                    <div class="time">由{{ d[i]?.authorInfo.nickName }}发布 <span>{{
                        d[i]?.createTime.split(" ")[0]
                    }}更新</span></div>
                </div>
            </div>
        </div>

        <div class="content">
            {{ d[i]?.postContent }}
        </div>
        <div class="media">
            <div class="map" :class="imgSize" v-for="(i, index) in d[i]?.mediaFiles" :key="index">
                <img :src="i" alt="" class="auto-img">
            </div>
        </div>
    </div>
</template>

<script>
import subTitle from '@/components/community/subTitle.vue'

export default {
    props: ['d'],
    components: {
        subTitle
    },
    data() {
        return {
            i: 0
        }
    },
    methods: {
        num() {
            this.i = Math.floor(Math.random() * this.d.length)
        }
    },
    computed: {
        // 处理图片
        imgSize() {
            let res
            for (let i = 0; i < this.d.length - 1; i++) {
                if (this.d[i]?.mediaFiles < 1) {
                    res = 'one'
                } else if (this.d[i]?.mediaFiles < 3) {
                    res = 'two'
                } else {
                    res = 'much'
                }
            }

            return res

        }
    }
}
</script>

<style lang="scss" scoped>
.top {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.circle {
    display: flex;
    align-items: center;
    margin-top: 8rem;

    .avatar {
        width: 36rem;
        height: 36rem;
        margin-right: 6rem;

        .auto-img {
            width: 100%;
            border-radius: 3rem;
            display: block;
        }
    }
}

.right {
    color: #0B1931;
    line-height: 18px;

    .name {
        font-size: 12rem;

        &>span {
            font-size: 14rem;
        }
    }

    .time {
        color: #777
    }
}

.content {
    margin: 20rem 0;
    color: #838B98;
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.media {
    display: flex;
    flex-wrap: wrap;
}

.map {
    margin: 2rem;

    &.one {
        width: 165rem;
        height: 200rem;
    }

    &.two {
        width: 100rem;
        height: 102rem;
    }

    &.much {
        width: 100rem;
        height: 102rem;
    }

    .auto-img {
        width: 100%;
        height: 100%;
        border-radius: 4rem;
        display: block;
    }
}
</style>
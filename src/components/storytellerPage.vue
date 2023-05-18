<template>
    <div class="storyteller">

        <div class="title-box">
            <div class="title">
                <div class="name">达人讲书馆</div>
                <div class="details">
                    <div class="more">查看全部</div>
                    <div class="icon-right">
                        <img src="../assets/right.png" alt="" class="auto-img">
                    </div>
                </div>
            </div>
            <div class="rich">VIP会员 全场达人讲书免费听</div>
        </div>

        <div class="book" v-for="ele in books" :key="ele.courseId">
            <div class="cover">
                <img class="auto-img" :src="ele.courseCover" alt="">
                <div class="hear">
                    <img src="../assets/voicebook.png" class="auto-img" alt="">
                </div>
            </div>
            <div class="right">
                <div class="bookName">{{ ele.courseName }}</div>
                <div class="content">{{ ele.courseIntro }}</div>
                <div class="foot">
                    <div class="play">
                        <img src="../assets/playCircle.png" alt="" class="auto-img">
                    </div>
                    <span class="tol">{{ ele.playCnt }}次收听</span>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import qs from "qs";

export default {

    data() {
        return {
            books: null
        }
    },
    created() {
        this.axios({
            method: "POST",
            url: "https://api.zglibrary.com/find/v2/recommend/newResource",
            data: qs.stringify({
                from: "APP",
                sectionId: "5",
                layoutId: "1",
                dateSource: "6",
                sign: "9996376FEE2285B09E5666EA923BB406",
                nonce: "rkD3wf4fFLiVYUlB",
                timestamp: "1671697137452"
            }),
            headers: {
                "content-type": "application/x-www-form-urlencoded"
            },
        }).then((res) => {
            this.books = res.data.data.records
        })
    }

}
</script>

<style lang="scss" scoped>
.title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 6rem;

    .name {
        font-size: 18px;
        color: #000;
        font-weight: 600;
    }
}

.details {
    display: flex;
    align-items: center;
    color: #999;

    .icon-right {
        margin-left: 2rem;
        width: 16rem;
        height: 16rem;

        .auto-img {
            width: 100%;
            display: block;
        }
    }
}

.rich {
    color: #E2C48E;
    margin: 0 0 12rem 6rem;
}

.book {
    margin-top: 16rem;
    display: flex;
    align-items: center;
    height: 100%;
}

.cover {
    flex-shrink: 0;
    width: 76rem;
    height: 108rem;
    box-sizing: border-box;
    border-radius: 6px 4px 4px 6px;
    margin-right: 6rem;
    position: relative;

    .auto-img {
        width: 100%;
    }

    .hear {
        width: 18rem;
        height: 18rem;
        position: absolute;
        bottom: 10rem;
        right: 4rem;
        background: #F5C265;
    }
}

.right {
    display: flex;
    flex-direction: column;
    margin-left: 10rem;
    height: 88rem;

    .bookName {
        font-weight: 700;
        font-size: 16px;
        color: #000;
    }

    .content {
        color: #999;
    }
}

.foot {
    flex: 1;
    display: flex;
    align-items: flex-end;

    .play {
        margin-right: 4rem;
        width: 16px;
        height: 16px;

        .auto-img {
            width: 100%;
            display: block
        }
    }

    .tol {
        color: #999;
    }
}
</style>
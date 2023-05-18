<template>
    <div class="common">
        <div class="book" v-for="ele in common" :key="ele.bookId">
            <div class="cover">
                <img :src="ele.bookCover" alt="" class="auto-img">
            </div>
            <div class="introduce">
                <div class="la_item">
                    <div class="label">共读</div>
                    <div class="title">{{ ele.bookName }}</div>
                </div>
                <div class="content">{{ ele.bookIntro }}</div>
                <div class="participation">
                    <div class="box">
                        <div class="icon">
                            <img src="../img/book.png" alt="">
                        </div>
                        <div class="text">{{ ele.totalPlan }}个共读挑战</div>
                    </div>
                    <div class="box">
                        <div class="icon">
                            <img src="../img/book.png" alt="">
                        </div>
                        <div class="text">{{ ele.totalJoin }}人参与</div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import qs from "qs"
export default {
    data() {
        return {
            common: null,
        }
    },
    created() {
        this.axios({
            method: "POST",
            url: "https://api.zglibrary.com/coreading/plan/hotReadingPlanBook",
            data: qs.stringify({
                size: "20",
                from: "APP",
                current: "1",
                sign: "236C5A227C2FAE1CA8EE209D9E150806",
                nonce: "ugONG0pvL082pBh9",
                timestamp: "1671715900644"
            }),
            headers: {
                "content-type": "application/x-www-form-urlencoded"
            },
        }).then((res) => {
            this.common = res.data.data.records
        })
    }
}
</script>

<style lang="scss" scoped>
.common {
    height: 80vh;
    overflow: scroll;
    padding: 0 20rem;
}

.book {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 120rem;
    margin: 20rem 0;
    padding: 10rem 0;
    box-shadow: -1rem -1rem 2rem #ddd inset;

    &:last-child {
        margin-bottom: 30rem;
    }
}

.cover {
    flex-shrink: 0;
    width: 68rem;
    height: 90rem;
    margin-right: 16rem;

    .auto-img {
        border-radius: 4rem 2rem 2rem 4rem;
        width: 100%;
        height: 100%;
        display: block;
    }
}

.introduce {
    height: 90rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0 10rem;
}

.la_item {
    display: flex;
    align-items: center;

    .label {
        padding: 1rem 4rem;
        text-align: center;
        color: #F2A88C;
        border: 1px solid #F2A88C;
        margin-right: 6rem;
    }

    .title {
        font-weight: 600;
        font-size: 14rem;
        color: #000;
    }
}

.content {
    color: #999;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.participation {
    color: #D5A87D;
    display: flex;
    align-items: center;

    .box {
        margin-right: 10rem;
        display: flex;
        align-items: center;
    }

    .icon {
        width: 18rem;
        height: 18rem;
        margin-right: 2rem;

        img {
            width: 100%;
        }
    }
}
</style>
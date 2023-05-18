<template>
    <div class="reading">
        <div class="title">
            <div class="title_up">
                <div class="name">共读精选</div>
                <div class="details">
                    <div class="more">更多共读</div>
                    <div class="icon-right">
                        <img src="../assets/right.png" alt="" class="auto-img">
                    </div>
                </div>
            </div>
            <div class="rich">加入共读,摆脱孤“读”</div>
        </div>

        <div class="book" v-for="ele in books" :key="ele.bookId">
            <div class="cover"><img class="auto-img" :src="ele.bookCover" alt=""></div>
            <div class="right">
                <div class="bookName">{{ ele.bookName }}</div>
                <div class="content">{{ ele.bookIntro }}</div>
                <div class="foot">
                    <div class="people">
                        <div class="head" v-for="(cov, index) in ele.readUserAvatar" :key="index">
                            <img class="auto-img" :src="cov" alt="">
                        </div>
                    </div>
                    <span>{{ ele.readUserNickName == null ? null : ele.readUserNickName[0] + '等...' }}</span>
                    <span class="tol">{{ ele.totalJoin }}人在读</span>
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
            books: [],
        }
    },
    created() {
        this.axios({
            method: "POST",
            url: "https://api.zglibrary.com/find/v2/recommend/newResource",
            data: qs.stringify({
                from: "APP",
                sectionId: "6",
                layoutId: "1",
                dateSource: "8",
                sign: "6A50FCE1E534E00909F4EC2A5E5576E2",
                nonce: "sRUmDgvr1DEJAozN",
                timestamp: "1671697136469"
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
.reading {
    margin: 15rem 0;
    padding: 20rem 0 10rem 0;
    background-color: #F0F3F6;
    border-radius: 2rem;
}

.title_up {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .name {
        font-size: 16px;
        font-weight: 600;
        color: #000;
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
}

.rich {
    color: #E2C48E;
    margin: 4rem 0;
}

.book {
    margin-top: 10rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;

    .cover {
        flex-shrink: 0;
        width: 76rem;
        height: 108rem;
        box-sizing: border-box;
        border-radius: 6px 4px 4px 6px;
        margin-right: 6rem;

        .auto-img {
            width: 100%;
        }
    }

    .right {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 108rem;

        .bookName {
            font-weight: 700;
            font-size: 16px;
            color: #000;
        }

        .content {
            color: #999;
        }
    }
}

.foot {
    display: flex;

    .people {
        display: flex;

    }

    .head {
        width: 16rem;
        height: 16rem;
        border-radius: 50%;

        &:nth-child(2) {
            position: relative;
            left: -4rem;
        }

        &:nth-child(3) {
            position: relative;
            left: -8rem;
        }

        .auto-img {
            border-radius: 50%;
            width: 100%;
        }
    }

    .tol {
        color: #999;
    }
}
</style>
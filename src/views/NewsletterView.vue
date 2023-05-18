<!-- 书讯 -->
<template>
    <div class="letter">
        <div class="module" v-for="(ele, index) in letter" :key="index">
            <div class="header">
                <div class="left">
                    <div class="author">
                        <img :src="ele.authorAvatar" alt="" class="auto-img">
                    </div>
                    <div class="name">{{ ele.authorName }}</div>
                </div>
                <div class="right">
                    <div class="time">{{ ele.createTime.split(" ")[0] }}</div>
                </div>
            </div>
            <div class="title">{{ ele.subjectTitle }}</div>
            <div class="banner">
                <img class="auto-img" :src="ele.subjectCover" alt="">
            </div>
        </div>
    </div>
</template>

<script>
import qs from "qs"

export default {
    data() {
        return {
            letter: null,
        }
    },
    created() {
        this.axios({
            method: "POST",
            url: "https://api.zglibrary.com/post/subject/page",
            data: qs.stringify({
                size: "15",
                from: "APP",
                current: "1",
                subjectType: "2",
                sign: "1E8BD6EE019F0DFA901067BD578CE553",
                nonce: "X9VzXWa62i4LwyPv",
                timestamp: "1671716595561"
            }),
            headers: {
                "content-type": "application/x-www-form-urlencoded"
            },
        }).then((res) => {
            // console.log("res=>", res);
            this.letter = res.data.data.records
        })
    }
}
</script>

<style lang="scss" scoped>
.letter {
    height: 80vh;
    overflow: scroll;
    padding: 0 10rem;
}

.module {
    padding: 10rem 0;
    box-shadow: 0 -1rem 1rem #ddd inset;
    margin: 10rem 0;

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .time {
            color: #999;
            font-size: 12rem;
        }
    }

    .title {
        font-weight: bold;
        font-size: 14rem;
        margin: 14rem 0;
    }

    .banner {
        width: 100%;
        height: 156rem;

        .auto-img {
            width: 100%;
            border-radius: 8rem;
            display: block;
        }
    }
}

.left {
    display: flex;
    align-items: center;

    .author {
        width: 34rem;
        height: 34rem;
        border-radius: 50%;

        .auto-img {
            width: 100%;
            border-radius: 50%;
            display: block;
        }
    }

    .name {
        color: #999;
        font-style: 12rem;
        margin-left: 10rem;
    }
}
</style>
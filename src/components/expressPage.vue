<template>
    <div class="express">

        <TitleStyle name="好书速递" more="查看全部" />

        <div class="book" v-for="ele in express" :key="ele.bookId">
            <div class="left">
                <div class="cover">
                    <img :src="ele.bookCover" alt="" class="auto-img">
                </div>
            </div>
            <div class="right">
                <div class="name">{{ ele.bookName }}</div>
                <div class="author">{{ ele.bookAuthor }}</div>
                <div class="category">{{ ele.firstCategoryName }}>{{ ele.secondCategoryName }}</div>
                <div class="intro">{{ ele.bookIntro }}</div>
                <div class="cnt">{{ ele.readCnt }}人在读</div>
            </div>
        </div>
    </div>
</template>

<script>
import qs from 'qs'
import TitleStyle from '@/components/TitleStyle.vue'

export default {
    data() {
        return {
            express: null,
        }
    },
    components: {
        TitleStyle
    },
    created() {
        this.axios({
            method: "POST",
            url: "https://api.zglibrary.com/find/v2/recommend/newResource",
            data: qs.stringify({
                from: 'APP',
                sectionId: "15",
                layoutId: '1',
                dateSource: "16",
                sign: "4633EB3084E14AC777025B9DFA84E089",
                nonce: "yWa50xiBLKVDGuxd",
                timestamp: "1671697138871"
            }),
            headers: {
                "content-type": "application/x-www-form-urlencoded"
            },
        }).then((res) => {
            this.express = res.data.data.records
        })
    }
}
</script>

<style lang="scss" scoped>
.express {

    .book {
        height: 146rem;
        margin-bottom: 30rem;
        display: flex;
    }

    .left {
        margin-right: 10rem;

        .cover {
            width: 80rem;
            height: 114rem;
            border-radius: 4rem;
            box-shadow: -1rem 2rem 1rem 1rem rgb(236, 236, 236);

            .auto-img {
                width: 100%;
                height: 100%;
                border-radius: 4rem;
                display: block;
            }
        }
    }


    .right {
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .name {
            font-weight: bold;
            font-size: 14rem;
        }

        .author {
            font-weight: bold;
            font-size: 12rem;
        }

        .category,
        .intro,
        .cnt {
            font-size: 12rem;
            color: #A5AFC1;
        }

        .intro {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }
    }

}
</style>
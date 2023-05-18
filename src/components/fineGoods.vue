<template>
    <!-- 好物精选 -->
    <div class="good">
        <div class="title-box">
            <div class="title">
                <div class="name">好物精选</div>
                <div class="details">
                    <div class="more">更多好物</div>
                    <div class="icon-right">
                        <img src="../assets/right.png" alt="" class="auto-img">
                    </div>
                </div>
            </div>
            <div class="rich">新年好物，等你pick!</div>
        </div>
        
        <div class="book_box">
            <div class="content" v-for="ele in article" :key="ele.prodId">
                <div class="cover">
                    <img class="auto-img" :src="ele.pic" alt="">
                </div>
                <div class="designation">{{ ele.prodName }}</div>
                <div class="price"><span class="integer">￥{{ ele.price }}</span><span>.00</span></div>
            </div>
        </div>

    </div>
</template>

<script>
import qs from "qs";

export default {
    data() {
        return {
            article: null
        }
    },
    created() {
        this.axios({
            method: 'POST',
            url: 'https://api.zglibrary.com/find/v2/recommend/newResource',
            data: qs.stringify({
                from: "APP",
                sectionId: "4",
                layoutId: "1",
                dateSource: "5",
                sign: "09EBE22278B72C6C447DEEA202B32C03",
                nonce: "3WHWYp5W3kMPcPTk",
                timestamp: "1671697137641"
            }),
            headers: {
                "content-type": "application/x-www-form-urlencoded"
            }
        }).then((res) => {
            this.article = res.data.data.records
        })
    }

}
</script>

<style lang="scss" scoped>
.good {
    margin: 30rem 0;
}

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

.book_box {
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
}

.content {
    margin: 6rem 16rem;

    .cover {
        width: 75rem;
        height: 75rem;
        box-sizing: border-box;
        border-radius: 6px 4px 4px 6px;

        .auto-img {
            width: 100%;
            height: 100%;
            border-radius: 2px;
            display: block;
        }
    }

    .designation {
        height: 34rem;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        color: #000;
        font-weight: 600;
        margin: 8rem 0 0 0;
        width: 84rem;
    }

    .price {
        color: #f00;

        .integer {
            font-size: 14rem;
        }
    }
}
</style>
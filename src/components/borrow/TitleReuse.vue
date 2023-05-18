<template>
    <div class="child">

        <div class="nav_box">
            <div class="list" v-for="ele in res" :key="ele.navId" @click="navigation(ele.navId)">
                <div class="icon">
                    <img :src="ele.navIcon" alt="">
                </div>
                <div class="text">{{ ele.navName }}</div>
            </div>
        </div>

        <div class="book_express">
            <TitleStyle name="热门借阅" more="查看更多" />
            <NewBook :books="book" />
        </div>

    </div>
</template>

<script>
import TitleStyle from '@/components/TitleStyle.vue'
import NewBook from "../NewBook.vue"

export default {
    props: ['res'],
    components: {
        TitleStyle,
        NewBook
    },
    data() {
        return {
            book: [],
        }
    },
    created() {
        this.axios.get('https://apis.netstart.cn/yunyuedu//store/rankList.json?rankType=20&uuid=b5648dd3c4f24d9796f590cd81ca076e&all=0').then((res) => {
            this.book = res.data.list
        })
    },
    methods: {
        navigation(event) {
            console.log(event);
        }
    }
}
</script>

<style lang="scss" scoped>
.nav_box {
    padding: 20rem 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.list {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .icon {
        width: 36rem;
        height: 36rem;

        img {
            width: 100%;
        }
    }

    .text {
        margin: 6rem 0;
        color: #777
    }
}

.book_express {
    margin: 0 10rem;
}
</style>
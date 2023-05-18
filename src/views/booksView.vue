<template>
    <div>
        <div class="hear">
            <div class="location">
                <div class="title">书架</div>
                <van-icon name="plus" size="20" @click="$router.push('/search')" />
            </div>
        </div>
        <div class="custom" v-show="!book.length">
            <van-empty description="书架为空" />
        </div>
        <div class="content" v-show="book.length">
            <div class="module" v-for="ele in book" :key="ele.sourceUuid" @click="$event => detail(ele)">
                <div class="cover">
                    <img class="auto-img" :src="ele.coverImage" alt="">
                </div>
                <div class="name">{{ ele.title }}</div>
                <van-badge v-show="delState">
                    <template #content>
                        <van-icon @click.stop="del(ele.sourceUuid)" name="cross" class="badge-icon" />
                    </template>
                </van-badge>
            </div>
            <van-button class="icon" color="#888" @click="delState = !delState" plain hairline type="info" block>{{
                management }}</van-button>
        </div>

    </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
    data() {
        return {
            book: [],
            delState: false
        }
    },

    created() {

        if (!localStorage.bookshelfList) {
            return
        }
        this.book = JSON.parse(localStorage.bookshelfList)
    },
    methods: {
        ...mapMutations(["hide", "show"]),

        detail(event) {
            this.hide();
            this.$router.push(`/particular/${event.sourceUuid}/${event.title}`);
        },

        del(k) {
            let bookshelfList = JSON.parse(localStorage.bookshelfList)
            bookshelfList = bookshelfList.filter(id => id.sourceUuid !== k)
            this.book = bookshelfList
            localStorage.bookshelfList = JSON.stringify(bookshelfList)
        }
    },

    computed: {
        management() {
            if (this.delState == false) {
                return '管理书架'
            } else {
                return '取消管理'
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.hear {
    height: 48rem;
    line-height: 48rem;
    box-sizing: border-box;

    .location {
        width: 100%;
        box-sizing: border-box;
        padding: 0 10rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: #fff;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 10;
    }

    .title {
        font-weight: 600;
        font-size: 16rem;
    }
}

.content {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 50px;

    .icon {
        margin: 10rem;
    }
}

.module {
    margin: 16rem 0;
    width: 33%;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;

    .cover {
        width: 82rem;
        height: 122rem;

        .auto-img {
            border-radius: 4rem;
            height: 100%;
            display: block;
        }
    }

    .name {
        width: 82rem;
        font-size: 12rem;
        margin-top: 10rem;
    }
}

.badge-icon {
    position: absolute;
    top: -10rem;
    right: 2rem;
    display: block;
    font-size: 16rem;
    padding: 2rem;
    border-radius: 12rem;
    background-color: #f00;
}
</style>
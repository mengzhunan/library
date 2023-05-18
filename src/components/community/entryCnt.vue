<template>
    <div class="entry">
        <div class="en">
            <div class="en-c" v-for="c in circle" :key="c.circleId">
                <div class="avatar">
                    <img :src="c.circleAvatar" alt="" class="auto-img">
                </div>
                <div class="cnt">
                    <div class="title">{{ c.circleName }}</div>
                    <div class="post">{{ c.postCount }}篇内容</div>
                </div>
                <div class="join">加入</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['circle']
}
</script>

<style lang="scss" scoped>
.entry {
    width: 100%;
    overflow: scroll;
}

.en {
    width: 200%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}

.en-c {
    width: 32%;
    margin: 10rem 0;
    padding-bottom: 6px;
    border-bottom: 1px solid #dedede;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.avatar {
    width: 44rem;
    height: 44rem;
    margin-right: 10rem;

    .auto-img {
        border-radius: 4rem;
        width: 100%;
        height: 100%;
        display: block;
    }
}

.cnt {
    flex: 1;
    flex-shrink: 0;

    .title {
        font-size: 16ren;
        color: #000;
        padding: 4rem 0;
    }

    .post {
        font-size: 12rem;
        color: #999;
    }
}

.join {
    padding: 0 6rem;
    text-align: center;
    color: #999;
    border-radius: 15rem;
    border: 1px solid #999;
}
</style>
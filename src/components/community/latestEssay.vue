<template>
    <div class="module">
        <div class="circle">
            <div class="avatar">
                <img :src="e.circleAvatar" alt="" class="auto-img">
            </div>
            <div class="right">
                <div class="name">来自<span>{{ e.circleName }}</span></div>
                <div class="time">由{{ e.authorName }}发布 <span>{{ e.createTime.split(" ")[0] }}更新</span></div>
            </div>
        </div>
        <div class="title">{{ e.title }}</div>
        <div class="content">
            <div class="summary">{{ e.rawContent }}</div>
            <div class="cover">
                <img :src="e.cover" alt="" class="auto-img">
            </div>
        </div>

    </div>
</template>

<script>
export default {
    props: ['e']
}
</script>

<style lang="scss" scoped>
.module {
    padding-bottom: 10rem;
    border-bottom:1px solid #E5E8EB
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
}

.title {
    font-size: 16rem;
    font-weight: 600;
    margin: 6rem 0;
    padding: 8rem 0 4rem 0;
}

.content {
    display: flex;
    justify-content: space-between;

    .summary {
        width: 70%;
        height: 48rem;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .cover {
        width: 26%;
        height: 50rem;

        .auto-img {
            width: 100%;
            height: 100%;
            border-radius: 4rem;
            display: block;
        }
    }
}
</style>
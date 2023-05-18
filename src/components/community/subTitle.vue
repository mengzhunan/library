<template>
    <div>
        <div class="title">{{ text }}</div>
    </div>
</template>

<script>
export default {
    props: ['text']
}
</script>

<style lang="scss" scoped>
.title {
    margin: 12rem 0;
    font-size: 16px;
    font-weight: 600;
    color: #000;
}
</style>
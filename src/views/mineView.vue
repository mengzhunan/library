<template>
    <div>
        <div v-show="state">
            <section class="top" @click="login">
                <div class="cover"></div>
                <div class="login-btn">
                    <div class="text">立即登录/注册</div>
                    <div class="subhead">限时注册领取50本开馆纪念藏书</div>
                </div>
                <van-icon name="arrow" size="18" color="#008000" />
            </section>
            <section class="record">
                <div class="cowry">
                    <div class="num">0</div>
                    <div class="text">藏书贝</div>
                </div>
                <div class="cowry">
                    <div class="num">0</div>
                    <div class="text">知识币</div>
                </div>
                <div class="cowry">
                    <div class="num">0<span class="minute">分钟</span></div>
                    <div class="text">本月读书</div>
                </div>
            </section>
            <div class="content">
                <section>
                    <div class="title">我的书馆</div>
                    <div class="library">
                        <div class="strata">
                            <van-icon class="icon" name="column" />
                            <div class="text">藏书</div>
                        </div>
                        <div class="strata">
                            <van-icon class="icon" name="graphic" />
                            <div class="text">知识</div>
                        </div>
                        <div class="strata">
                            <van-icon class="icon" name="friends" />
                            <div class="text">共读</div>
                        </div>
                        <div class="strata">
                            <van-icon class="icon" name="printer" />
                            <div class="text">书单</div>
                        </div>
                    </div>
                </section>

                <section>
                    <div class="title">我的账户</div>
                    <div class="library">
                        <div class="strata">
                            <van-icon class="icon" name="paid" />
                            <div class="text">钱包</div>
                        </div>
                        <div class="strata">
                            <van-icon class="icon" name="description" />
                            <div class="text">订单</div>
                        </div>
                        <div class="strata">
                            <van-icon class="icon" name="sign" />
                            <div class="text">预约</div>
                        </div>
                        <div class="strata">
                            <van-icon class="icon" name="point-gift-o" />
                            <div class="text">礼物</div>
                        </div>
                        <div class="strata">
                            <van-icon class="icon" name="coupon-o" />
                            <div class="text">卡卷</div>
                        </div>
                        <div class="strata">
                            <van-icon class="icon" name="award-o" />
                            <div class="text">勋章</div>
                        </div>
                    </div>
                </section>
            </div>
        </div>

        <div v-show="false" class="login">

        </div>

    </div>
</template>

<script>
export default {
    data() {
        return {
            state: true,
        }
    },

    methods: {
        login() {
            console.log('登录页面');
        }
    },

    created() {

    },

}
</script>

<style lang="scss" scoped>
.top {
    padding: 20rem 10rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.cover {
    box-sizing: border-box;
    border: 1px solid #008000;
    width: 40rem;
    height: 40rem;
    border-radius: 24rem;
    background-color: #dedede;
    margin-right: 16rem;
}

.login-btn {
    flex: 1;

    .text {
        font-size: 18rem;
        padding: 4rem 0;
        font-weight: 600;
        color: #000;
    }

    .subhead {
        font-size: 12rem;
        color: #9e9e9e;
    }
}

.record {
    display: flex;
    align-items: center;
    justify-content: space-around;

    .cowry {
        text-align: center;
        padding: 4rem 0;
        margin: 0 20rem;

        .num {
            font-size: 18rem;
            color: #000;
            font-weight: 600;
        }

        .minute {
            font-size: 14rem;
        }

        .text {
            color: #9e9e9e
        }
    }
}

.content {
    margin: 20rem 10rem;

    .title {
        font-size: 18rem;
        font-weight: 700;
        color: #000;
        padding: 10rem 0;
    }
}

.library {
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    .strata {
        text-align: center;
        margin: 0 44rem 20rem 20rem;

        .icon {
            font-size: 20rem;
            padding: 6rem 0;
            color: #6DB193;
        }

        .text {
            color: #000;
        }
    }
}

.login {
    position: relative;
    z-index: 999;
    width: 100%;
    height: 100vh;
    background-color: #E2E2ED;
}
</style>
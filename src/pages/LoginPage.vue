<script setup lang="ts">
import { ref } from 'vue';
import Cookies from 'js-cookie'
import { toast } from '@/utils/toast';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

const router = useRouter();
const { t: $t } = useI18n();

const password = ref('');
const onSubmitBtnClick = () => {
    Cookies.set('PASSWORD', password.value);
    toast($t("login.setting_success"), 'success');
    setTimeout(() => {
        if (window.history.state.back) {
            router.back();
        } else {
            router.replace({ path: '/' })
        }
    }, 1000);
}
</script>

<template>
    <div class="cursor-default flex flex-col items-center">
        <div id="board">
            <h1 class="text-lg">{{ $t("login.login_title") }}</h1>
            <input class="my-5 px-2 py-1 w-64 border-2 rounded" type="password" v-model="password"
                :placeholder="$t('login.password_placeholder')">
            <button id="submit-button" class="btn" @click="onSubmitBtnClick">{{ $t("login.login_button") }}</button>
        </div>
    </div>
</template>

<style scoped>
#board {
    @apply rounded-lg flex flex-col bg-gray-100 border-2 border-gray-200 my-5 mx-2 p-4 justify-center items-center dark:(bg-dark-100 border-dark-300 text-gray-400);
}

.btn {
    @apply rounded cursor-pointer outline-none bg-green-500 text-white text-lg py-1 px-4 transition w-64 hover:bg-green-600;
}
</style>
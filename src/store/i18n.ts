import { defineStore } from 'pinia'
import { ref } from 'vue'

const useI18nStore = defineStore(
    'i18n',
    () => {
        const locale = ref(navigator.language.slice(0, 2) || 'en');
        function setLocale(newLocale: string) {
            locale.value = newLocale
        }

        return { locale, setLocale }
    },
    {
        persist: true,
    }
)

export default useI18nStore

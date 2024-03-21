import { createI18n } from 'vue-i18n'
import LocalZh from './zh'
import LocalEn from './en'

const i18n = createI18n({
    locale: navigator.language.slice(0, 2) || 'en',
    fallbackLocale: 'en',
    legacy: false,
    messages: {
        zh: LocalZh,
        en: LocalEn
    }
})

export default i18n
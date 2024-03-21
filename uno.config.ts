// uno.config.ts
import { defineConfig, presetUno, presetIcons, transformerDirectives } from 'unocss'

export default defineConfig({
    presets: [
        presetUno(),
        presetIcons(
            {
                extraProperties: {
                    'display': 'inline-block',
                    'vertical-align': 'middle',
                },
            }
        ),
    ],
    transformers: [
        transformerDirectives(),
    ],
})
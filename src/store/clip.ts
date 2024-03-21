import { defineStore } from 'pinia'
import { ref } from 'vue'

const useClipStore = defineStore(
    'clip',
    () => {
        const visibility = ref("private");
        function setVisibility(newVisibility: string) {
            visibility.value = newVisibility
        }

        return { visibility, setVisibility }
    },
    {
        persist: true,
    }
)

export default useClipStore

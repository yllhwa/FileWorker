<script setup lang="ts">
import { onBeforeMount, ref, type Ref } from 'vue';
import { formatBytes } from '@/utils/utils';
import { DeleteFile, ListFiles } from '@/api';
import type { _Object } from '@aws-sdk/client-s3';

let uploadedFiles: Ref<_Object[]> = ref([]);

function decodeKey(key: string) {
    return decodeURIComponent(key)
}

const refreshFiles = async () => {
    const res = await ListFiles();
    if (res.hasOwnProperty('Contents') && res.Contents) {
        uploadedFiles.value = res.Contents;
    } else {
        uploadedFiles.value = [];
    }
};

onBeforeMount(async () => {
    await refreshFiles();
});

const onDeleteFileClick = async (key?: string) => {
    if (!key) {
        return;
    }
    await DeleteFile(key);
    await refreshFiles();
};

const onDownloadClick = (key?: string) => {
    if (!key) {
        return;
    }
    const link = document.createElement('a');
    link.href = `/${key}`;
    link.download = decodeKey(key);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

const onCopyDownloadLinkClick = async (key?: string) => {
    if (!key) {
        return;
    }
    const url = `${window.location.origin}/${key}`;
    await navigator.clipboard.writeText(url);
};
</script>

<template>
    <div class="flex flex-col items-center mt-5">
        <h1 class="text-lg">{{ $t("page_title.filemanage") }}</h1>
        <div class="px-4 py-4 max-w-screen-md w-4/5">
            <div v-for="file in uploadedFiles" :key="file.Key"
                class="w-full flex flex-row items-center mt-4 rounded border-1 border-gray-300 px-2 py-1">
                <div class="w-10 h-10 i-mdi-file-document-outline"></div>
                <div class="flex flex-col title">
                    <div class="text-lg font-semibold" :title="decodeKey(file.Key!)">{{ decodeKey(file.Key!) }}</div>
                    <div class="text-sm text-gray">{{ formatBytes(file.Size ?? 0) }}</div>
                </div>
                <div class="ml-auto flex gap-2">
                    <div class="w-6 h-6 i-mdi-download cursor-pointer"
                        @click="onDownloadClick(file.Key)" title="下载"></div>
                    <div class="w-6 h-6 i-mdi-content-copy cursor-pointer"
                        @click="onCopyDownloadLinkClick(file.Key)" title="拷贝下载链接"></div>
                    <div class="w-6 h-6 i-mdi-trash-can-outline cursor-pointer"
                        @click="onDeleteFileClick(file.Key)" title="删除"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
html,
body,
#app {
    margin: 0;
    padding: 0;
    background-color: #f8f9fa;
}
.title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>

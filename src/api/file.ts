import axios from 'axios';

const PutFile = async (
    filename: string,
    file: File | string,
    visibility: string,
    type: string = "file",
    onUploadProgress?: (progress: number) => void
) => {
    const url = `/${filename}`;
    const headers = {
        'x-store-visibility': visibility,
        'x-store-type': type,
    };

    // 根据文件大小动态设置超时时间（大文件需要更长的超时）
    let timeout = 30000; // 默认30秒
    if (file instanceof File) {
        // 大文件设置更长的超时 (每10MB增加1分钟)
        timeout = Math.max(300000, Math.ceil(file.size / (10 * 1024 * 1024)) * 60000);
    }

    const response = await axios.put(url, file, {
        headers,
        timeout,
        onUploadProgress: (progressEvent) => {
            if (onUploadProgress && progressEvent.total) {
                const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
                onUploadProgress(progress);
            }
        }
    });
    return response.data;
}

const PatchFile = async (filename: string, visibility?: string) => {
    const url = `/${filename}`;
    const headers: { [key: string]: any } = {};
    if (visibility) {
        headers['x-store-visibility'] = visibility;
    }
    const response = await axios.patch(url, {}, { headers });
    return response.data;
}

const DeleteFile = async (filename: string) => {
    const url = `/${filename}`;
    const response = await axios.delete(url);
    return response.data;
}

export { PutFile, PatchFile, DeleteFile }
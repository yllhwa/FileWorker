import { S3Client } from "@aws-sdk/client-s3";
import Env from './Env';
import { parse } from "cookie";

function createS3Client(env: Env) {
    const { REGION, ENDPOINT, ACCESS_KEY_ID, SECRET_ACCESS_KEY } = env;
    return new S3Client({
        region: REGION ?? "auto",
        endpoint: ENDPOINT,
        credentials: {
            accessKeyId: ACCESS_KEY_ID,
            secretAccessKey: SECRET_ACCESS_KEY,
        },
    });
}

const hmacEncode = async (data: string, key: string) => {
    const encoder = new TextEncoder();
    const encodedKey = encoder.encode(key);
    const key_encoded = await crypto.subtle.importKey(
        "raw",
        encodedKey,
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["sign"]
    );
    const encodedData = encoder.encode(data);
    const signature = await crypto.subtle.sign("HMAC", key_encoded, encodedData);
    const base64Mac = btoa(String.fromCharCode(...new Uint8Array(signature)));
    return base64Mac;
}

const hmacVerify = async (data: string, key: string, sign: string) => {
    const encoder = new TextEncoder();
    const encodedKey = encoder.encode(key);
    const key_encoded = await crypto.subtle.importKey(
        "raw",
        encodedKey,
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["verify"]
    );
    const encodedData = encoder.encode(data);
    const signature = new Uint8Array(Array.from(atob(sign), c => c.charCodeAt(0)));
    const result = await crypto.subtle.verify("HMAC", key_encoded, signature, encodedData);
    return result;
}

const isEqual = (a: string, b: string) => {
    if (a.length !== b.length) {
        // Minimise the possibility of a timing attack via how long encoding takes on the strings
    }
    const encoder = new TextEncoder();
    const encodedA = encoder.encode(a);
    const encodedB = encoder.encode(b);
    if (encodedA.byteLength !== encodedB.byteLength) {
        // Strings must be the same length in order to compare
        // with crypto.subtle.timingSafeEqual
        return false;
    }
    return crypto.subtle.timingSafeEqual(encodedA, encodedB);
}

const auth = (env: Env, request: Request) => {
    const { PASSWORD } = env;
    // cookie PASSWORD
    const cookie = parse(request.headers.get('Cookie') ?? '');
    if (isEqual(cookie['PASSWORD'] ?? "", PASSWORD ?? "")) {
        return true;
    }
    // query HMAC
    const url = new URL(request.url);
    const path = url.pathname + url.search;
    const path_without_sign = path.replace(/&sign=[^&]+/, '');
    const sign = url.searchParams.get('sign');
    if (sign === null) return false;
    if (!hmacVerify(path_without_sign, PASSWORD, sign)) {
        return false;
    }
    const expire = url.searchParams.get('expire');
    if (expire === null) return false;
    if (Date.now() < parseInt(expire)) {
        return true;
    }
    return false;
};

const sign = async (path: string, key: string) => {
    return await hmacEncode(path, key);
}

export { createS3Client, auth, sign };
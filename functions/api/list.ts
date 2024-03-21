import { ListObjectsV2Command } from "@aws-sdk/client-s3";

import Env from "../utils/Env";
import { createS3Client } from "../utils/utils";


export const onRequestGet: PagesFunction<Env> = async (context) => {
    const { env, request } = context;
    const { BUCKET } = env;
    const querys = new URL(request.url).searchParams;
    const maxKeys = querys.get("MaxKeys");
    const prefix = querys.get("Prefix");
    const continuationToken = querys.get("ContinuationToken");

    const s3 = createS3Client(env);
    const command = new ListObjectsV2Command({
        Bucket: BUCKET!,
        MaxKeys: maxKeys ? parseInt(maxKeys) : undefined,
        Prefix: prefix,
        ContinuationToken: continuationToken
    });
    let response;
    try {
        response = await s3.send(command);
    } catch (e) {
        return new Response("Not found", { status: 404 });
    }
    return new Response(JSON.stringify(response), { status: 200 });
}
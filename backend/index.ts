import {serve} from 'std/http/server.ts';
import {config} from './config.ts';
import {CheckedError} from './model/checked-error.ts';
import {getStationInfo} from './handler/get-station-info.ts';

export type Handler<T> = (request: Request) => Promise<T>;

const handlerMap: { [pathname: string]: Handler<any> } = {
    '/': getStationInfo,
} as const;

const buildResponse = (status: number, body?: any) =>
    new Response(!!body ? JSON.stringify(body) : null, {
        status,
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
    });

const handler = async (request: Request): Promise<Response> => {
    const {pathname} = new URL(request.url);

    if (!Object.keys(handlerMap).includes(pathname))
        return buildResponse(404);

    try {
        const response = await handlerMap[pathname](request);
        return buildResponse(200, response);
    } catch (error) {
        if (error instanceof CheckedError)
            return buildResponse(error.statusCode, {error: error.message});

        console.error('Caught unchecked error: ', error);
        return buildResponse(500);
    }
};

await serve(handler, {port: config.PORT});

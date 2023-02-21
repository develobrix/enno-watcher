import {Station} from '../model/index.ts';
import {config} from '../config.ts';

export type StationInfoRequest = {
    station: Station,
};

export type StationInfoResponse = {
    abfahrt: {
        linie: string,
        ziel: string,
        gleis?: string,
        gleiswechsel?: string,
        zeit: string,
        prognosemin: string,
        ausfall: string,
        ursachetext?: string,
    }[],
};

let cookie: string | undefined;

const fetchCookie = (): Promise<string> =>
    fetch(`${config.ENNO_API.HOST}${config.ENNO_API.SET_COOKIE_PATH}`)
        .then(response => response.headers.get('set-cookie')!);

const fetchStationInfo = async (request: StationInfoRequest, retry = false): Promise<StationInfoResponse> => {
    if (!cookie)
        cookie = await fetchCookie();

    const result = await fetch(
        `${config.ENNO_API.HOST}${config.ENNO_API.STATION_INFO_PATH
            .replace('%STATION%', request.station)
            .replace('%TIMESTAMP%', `${Date.now()}`)}`,
        {
            headers: {cookie},
        })
        .then(response => response.json())

    if (!retry && result === 'not allowed') {
        console.log('Got "not allowed" response from Enno API. Trying again with refreshed cookie...');
        cookie = await fetchCookie();
        return fetchStationInfo(request, true);
    }

    if (!Array.isArray(result.abfahrt))
        throw new Error(`Unexpected response from Enno API: ${result}`);

    return result;
};

export const Api = {
    fetchStationInfo,
};

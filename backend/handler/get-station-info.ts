import {Api, StationInfoResponse} from '../api/index.ts';
import {Line, Station} from '../model/index.ts';
import {CheckedError} from '../model/checked-error.ts';
import {removeUndefinedProperties} from '../util/remove-undefined-properties.ts';

export type StationInfo = {
    departures: {
        line: Line,
        target: Station,
        platform?: string,
        newPlatform?: string,
        time: string,
        delay: number,
        reason?: string,
        cancelled: boolean,
    }[],
}

const isValidStation = (station: string): station is Station =>
    Object.keys(Station).includes(station);

const mapToStationInfo = (stationInfoResponse: StationInfoResponse): StationInfo => ({
    departures: stationInfoResponse.abfahrt
        .map(abfahrt => ({
            line: abfahrt.linie as Line,
            target: Object.entries(Station).find(([_, value]) => value === abfahrt.ziel)?.[0] as Station,
            time: abfahrt.zeit,
            delay: Number.parseInt(abfahrt.prognosemin),
            cancelled: abfahrt.ausfall === 'true',
            ...removeUndefinedProperties({
                platform: abfahrt.gleis,
                newPlatform: abfahrt.gleiswechsel,
                reason: abfahrt.ursachetext,
            }),
        })),
});

export const getStationInfo = async (request: Request): Promise<StationInfo> => {
    const {searchParams} = new URL(request.url);

    const station = searchParams.get('station') || '';
    if (!isValidStation(station))
        throw new CheckedError({
            statusCode: 401,
            message: `Invalid station parameter: ${station}`,
        });

    const apiResponse = await Api.fetchStationInfo({station});

    return mapToStationInfo(apiResponse);
};

export type Config = {
    PORT: number,
    ENNO_API: {
        HOST: string,
        SET_COOKIE_PATH: string,
        STATION_INFO_PATH: string,
    }
};

export const config: Config = {
    "PORT": 1337,
    "ENNO_API": {
        "HOST": "https://www.der-enno.de",
        "SET_COOKIE_PATH": "",
        "STATION_INFO_PATH": "/livedata/etc?type=stationsauskunft&bhf=%STATION%&product=enno&_=%TIMESTAMP%",
    },
};

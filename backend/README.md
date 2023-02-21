# 🚉🔎 Enno Watcher Backend

This API written in Deno
serves as the backend for the [Enno Watcher app]
to fetch real-time information about delays and cancellations of [Enno](https://www.der-enno.de) trains.

### Prerequisites

- [Deno](https://deno.land/) 1.30.3 or later

### How to ...

#### 🔧 ... configure it
Check `config.ts` and set the `PORT` you want to serve the app at.

#### 🏃 ... run it
```shell
deno task run
```

#### 🧑‍💻 ... use it
Right now the app offers only a single endpoint `http://localhost:1337?station={STATION}`
where `{STATION}` is one of the following values:

- `HBS` - Braunschweig Hbf
- `HCAL` - Calberlah
- `HDEH` - Dedenhausen
- `HDOG` - Dollbergen
- `HF` - Fallersleben
- `HGI` - Gifhorn
- `HH` - Hannover Hbf
- `HHI` - Hildesheim Hbf
- `HHEP` - Hoheneggelsen
- `HIMS` - Immensen-Arpke
- `HLER` - Lehrte
- `HLFG` - Leiferde
- `HBST` - Lengede-Broistedt
- `HMRS` - Meinersen
- `HWED` - Weddel
- `HWOB` - Wolfsburg Hbf
- `HWWI` - Woltwiesche

🖤🤍💜

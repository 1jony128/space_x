export interface ILaunch {
    id: string // +
    name: string // +
    date_local: string // +
    success: boolean | null// +
    upcoming: boolean // еще не вылетел
    booked: boolean
    type: string
}

export interface ILaunchFetch {
    id: string // +
    name: string // +
    date_local: string // +
    success: boolean // +
    upcoming: boolean // еще не вылетел
    static_fire_date_unix: number
    static_fire_date_utc: string
    auto_update: boolean
    capsules: string[]
    cores: [{ core: string; flight: number; gridfins: false; legs: false; reused: false; landing_attempt: false; landing_success: null; landing_type: null; landpad: null; }]
    crew: []
    date_precision: string
    date_unix: number
    date_utc: string
    details: string
    failures: [{ time: number; altitude: null; reason: string; }]
    fairings: {}
    flight_number: number
    launch_library_id: number | null
    launchpad: string
    links: {
        patch:{large: string, small: string}, 
        reddit:{},
        flickr:{}, 
        presskit:null,
        webcast: string,
        youtube_id: string,
        article: string,
        wikipedia: string
    }
    net: boolean
    payloads: [string]
    rocket: string
    ships: []
    tbd: boolean
    window: number
}
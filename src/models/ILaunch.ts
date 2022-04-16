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
    cores: []
    crew: []
    date_precision: string
    date_unix: number
    date_utc: string
    details: string
    failures: []
    fairings: {}
    flight_number: number
    launch_library_id: number
    launchpad: string
    links: {}
    net: boolean
    payloads: []
    rocket: string
    ships: []
    tbd: boolean
    window: number
}
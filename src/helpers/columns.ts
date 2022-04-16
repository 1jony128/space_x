


export interface IColumn {
    name: string;
    draggable: boolean;
}

export const columns: IColumn[]= [
    {
        name: "pastLaunches",
        draggable: false,
    },
    {
        name: "launches",
        draggable: true,
    },
    {
        name: "myLaunches",
        draggable: true,
    },
]
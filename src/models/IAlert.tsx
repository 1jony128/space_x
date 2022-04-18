import { AlertColor } from "@mui/material";

export interface IAlert {
    text: string;
    severity: AlertColor;
    show: boolean;
}
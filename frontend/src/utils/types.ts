export enum ToastType {
    Success = "Success",
    Error   = "Error",
    Info    = "Info"
}

export enum EventType {
    TargetAdded = "TargetAdded",
    TargetRemoved = "TargetRemoved",
    FileUploaded = "FileUploaded"
}

export interface Target {
    ip: string,
    port: string
}


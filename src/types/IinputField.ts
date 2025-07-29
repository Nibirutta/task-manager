import type { ChangeEvent, ElementType } from "react"

interface IinputField {
    id: string,
    value: string,
    label: string,
    placeholder: string,
    Icon?: ElementType,
    errorMessage?: string,
    isValid?: boolean,
    onChange : (event: ChangeEvent<HTMLInputElement>) => void
}

export type { IinputField }
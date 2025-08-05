import type { ChangeEvent, ElementType, InputHTMLAttributes } from "react"

interface IinputField extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value' | 'id'> {
    id: string,
    value: string,
    label: string,
    placeholder: string,
    Icon?: ElementType,
    errorMessage?: string,
    isValid?: boolean,
    onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export type { IinputField }
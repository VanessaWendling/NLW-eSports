import { InputHTMLAttributes, LabelHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> { }


export function Input(props: InputProps) {
    return (
        <input
            {...props}
            className="bg-zinc-900 px-4 rounded text-sm placeholder:text-zinc-500 p-4"
        />
    )
}
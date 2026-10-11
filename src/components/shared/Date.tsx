'use client'

import { useEffect, useState } from "react"

export default function DateComponent() {
    const [date, setDate] = useState('');
    useEffect(() => {
        setDate(
            new Date().toLocaleDateString('bn-BD', {
                dateStyle: 'full'
            })
        )
    },[]);
    return(
        <div>{date}</div>
    )
}
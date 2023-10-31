'use client'

import React, { useEffect } from "react"
import EmptyState from "./components/EmptyState"

interface ErroStateProps {
    error:Error
}
const ErrorState:React.FC<ErroStateProps>=({
    error
})=>{
    useEffect(() => {
      console.error(error)
    }, [error])

    return (
        <EmptyState 
        title="Uh Oh"
        subtitle="Somthing went wrong"
        />
    )
    
}
export default ErrorState;
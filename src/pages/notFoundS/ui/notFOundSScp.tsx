import React, { useEffect } from 'react'
import styles from './notFoundSStl.module.css'
import { OwnProps } from './notFoundSTs.interface'
import { useNavigate } from 'react-router-dom'

const NotFoundSComp: React.FC<OwnProps> = () => {

    const navigate = useNavigate()

    useEffect(() => {
        navigate('/')
    }, [])

    


    return (
        <div>
            not found
        </div>
    )
}

export default NotFoundSComp
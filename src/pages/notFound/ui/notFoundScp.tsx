import React, { useEffect } from 'react'
import styles from './notFoundStl.module.css'
import { OwnProps } from './notFoundTs.interface'
import { useNavigate } from 'react-router-dom'

const NotFound: React.FC<OwnProps> = () => {

    const navigate = useNavigate()


    useEffect(() => {
        navigate('/user-page')
    }, [])

    return (
        <div>
            not found
        </div>
    )
}

export default NotFound
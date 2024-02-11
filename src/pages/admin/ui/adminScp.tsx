import React, { useEffect } from 'react'
import styles from './adminStl.module.css'
import { OwnProps } from './adminTs.interface'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AppStateType } from 'entities/store/redux-store'

const AdminComp: React.FC<OwnProps> = () => {

    const isAdminItem = useSelector((state: AppStateType) => state.adminR.isAdmin)
    const navigate = useNavigate()

    if (!isAdminItem) {
        navigate('/')
    }


    useEffect(() => {
        navigate('/all-exams')
    }, [])

    return (
        <div>
            This is admin page
        </div>
    )
}

export default AdminComp
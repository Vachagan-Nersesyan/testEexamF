import React, { useEffect, useState } from 'react'
import styles from './headerStl.module.css'
import { OwnProps } from './headerTs.interface'
import logo from '../images/1.png'
import pic from '../images/2.png'

import { Col, Row } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AppStateType, useAppDispatch } from 'entities/store/redux-store'
import { changeStudentNumInfo } from 'entities/adminR/adminReducer'
import { AllTeacherInfoType } from 'entities/adminR/adminReducerTs.interface'
import { logOutFunc } from 'entities/adminR/adminThunk'

const HeaderComp: React.FC<OwnProps> = () => {

    const navigate = useNavigate()

    const isAdminItem = useSelector((state: AppStateType) => state.adminR.isAdmin)

    const dispatch = useDispatch()
    const aDispatch = useAppDispatch()

    const currentTeacherInfo = useSelector((state: AppStateType) => state.adminR.curentTeacherInfo)
    const [currentTeacherInfoHk, setCurrentTeacherInfoHk] = useState<AllTeacherInfoType | null>(currentTeacherInfo)
    useEffect(() => {
        setCurrentTeacherInfoHk(currentTeacherInfo)
    }, [currentTeacherInfo])

    const logOutFuncComp: () => void = () => {
        navigate('/')
        aDispatch(logOutFunc({ info: currentTeacherInfoHk?.password }))
    }

    const logoPicItem = useSelector((state: AppStateType) => state.adminR.instituteLogo)
    const [logoPicItemHk, setLogoPicItemHk] = useState<string>(logoPicItem)
    useEffect(() => {
        setLogoPicItemHk(logoPicItem)
    }, [logoPicItem])

    const instNameItem = useSelector((state: AppStateType) => state.adminR.instituteName)
    const [istNameItem, setIstNameItem] = useState<string>(instNameItem)
    useEffect(() => {
        setIstNameItem(instNameItem)
    }, [instNameItem])


    return (
        <div className={styles.homepage_navbar}>
            <Row>
                <Col span={12} className={styles.homepage_navbar_first_col}>
                    <div className={styles.homepage_navbar_logo}>
                        {/* <img src={logoPicItem} alt="" /> */}
                        <img src={`data:image/png;base64,${logoPicItemHk}`} alt="" />
                    </div>
                    <div className={styles.homepage_navbar_name}>
                        {istNameItem}
                    </div>
                </Col>
                <Col span={12} className={styles.homepage_navbar_sec_col} >
                    <div onClick={logOutFuncComp} className={styles.homepage_navbar_sec_col_1}>
                        <img src={pic} alt="" />
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default HeaderComp
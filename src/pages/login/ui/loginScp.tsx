import React, { useEffect, useState } from 'react'
import styles from './loginStl.module.css'
import { OwnProps } from './loginTs.interface'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AppStateType, useAppDispatch } from 'entities/store/redux-store'

import { isPasswordValidFunc } from 'entities/adminR/adminThunk'
import { AllTeacherInfoType } from 'entities/adminR/adminReducerTs.interface'
import loader from '../images/2.gif'
import { Tabs, TabsProps } from 'antd'
import { initClassCurrentNameFunc } from 'entities/student/studentReducer'

const LoginComp: React.FC<OwnProps> = () => {

    const loadComp = useSelector((state: AppStateType) => state.adminR.loading)
    const [loadCompHk, setLoadCompHk] = useState<boolean>(loadComp)
    useEffect(() => {
        setLoadCompHk(loadComp)
    }, [loadComp])

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(initClassCurrentNameFunc({ name: '' }))
    }, [])

    const navigate = useNavigate()

    const LoginFunc = () => {
        navigate('/student')
    }

    const [isAdminPassword, setIsAdminPassword] = useState<string>('')


    const isAdminItem = useSelector((state: AppStateType) => state.adminR.curentTeacherInfo)


    const [isPasswordRight, setIsPasswordRight] = useState<boolean | undefined>(isAdminItem?.isAuth)

    useEffect(() => {
        setIsPasswordRight(isAdminItem?.isAuth)
      
    }, [isAdminItem])

    if (isPasswordRight) {
        navigate('/workspace')
    }

  

    const aDispatch = useAppDispatch()

    const sendPasswordCompFunc = () => {
        aDispatch(isPasswordValidFunc({ info: isAdminPassword }))
    }

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: (
                <div className={styles.login_content_text_item_2_2_title}>
                    Եթե ուսանող էք'
                </div>
            ),
            children: (
                <div className={styles.login_content_text_item_2_2}>
                    <div className={styles.login_content_text_item_3_1}>
                        Խնդրում ենք սեղմեք այստեղ'
                    </div>
                    <button type='submit' onClick={LoginFunc}>
                        Մուտք
                    </button>
                </div>
            ),
        },
        {
            key: '2',
            label: (
                <div className={styles.login_content_text_item_2_2_title}>
                    Եթե ուսուցիչ էք
                </div>
            )
            ,
            children: (
                <div className={styles.login_content_text_item_3}>
                    <div className={styles.login_content_text_item_3_1}>
                        Խնդրում ենք գրեք գաղտնաբառը
                    </div>
                    <div className={styles.login_content_text_item_3_2}>
                        <input type="text" onChange={(e) => setIsAdminPassword(e.target.value)} />
                    </div>
                    <div className={styles.login_content_text_item_3_3}>
                        <button onClick={sendPasswordCompFunc}>Հաստատել</button>
                    </div>
                </div>
            ),
        }
    ];

    return (
        <div className={styles.login_content}>
            <div className={styles.login_content_container}>
                <div className={styles.login_content_container_cont}>
                    
                    <div className={styles.login_content_container_title}>
                        ԳԹՀ
                    </div>
                    <div className={styles.login_content_text_item_1}>
                        <span>Բարի գալուստ</span>
                    </div>
                    {
                        loadCompHk
                            ?
                            <div className={styles.login_content_text_item_loader}>
                                <img src={loader} alt="" />
                            </div>

                            :

                            <div className={styles.login_content_text_item_2}>
                                <Tabs defaultActiveKey="1" items={items} />
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default LoginComp
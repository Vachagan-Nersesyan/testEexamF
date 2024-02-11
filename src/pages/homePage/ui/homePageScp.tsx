import React, { useEffect } from 'react'
import styles from './homePageStl.module.css'
import { OwnProps } from './homePageTs.interface'
import { Typewriter } from 'react-simple-typewriter'
import { Row, Col } from 'antd';

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { initClassCurrentNameFunc } from 'entities/student/studentReducer';


const HomePage: React.FC<OwnProps> = () => {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(initClassCurrentNameFunc({ name: '' }))

    }, [])

    const navigate = useNavigate()

    const loginFunc: () => void = () => {
        navigate('/login')
    }

    return (
        <div className={styles.homepage_content}>
            <div className={styles.homepage_navbar}>
                <Row>
                    <Col span={12} className={styles.homepage_navbar_first_col}>
                       
                    </Col>
                    <Col span={12} className={styles.homepage_navbar_sec_col}>
                        
                        <div className={styles.homepage_navbar_sec_col_2}>
                            <button onClick={loginFunc}>
                                Մուտք / Գրանցում
                            </button>
                        </div>
                    </Col>
                </Row>
            </div>
            <div className={styles.homepage_text_content}>
                <Typewriter
                    words={[
                        'Ստեղծիր հարցաշարեր', 'Ստեղծիր թեստերի արտաքին տեսք'
                    ]}
                    loop={true}
                    cursor
                    cursorStyle='_'
                    typeSpeed={70}
                    deleteSpeed={50}
                    delaySpeed={1000}
                />
            </div>
        </div>
    )
}



export default HomePage
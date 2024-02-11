import React, { useEffect, useState } from 'react'
import styles from './userPageStl.module.css'
import { OwnProps } from './userPageTs.interface'
import { Col, DatePicker, Input, Row, Select } from 'antd'
import { FaUser } from 'react-icons/fa6'
import { AppStateType } from 'entities/store/redux-store'
import { useSelector } from 'react-redux'
import { AllTeacherInfoType } from 'entities/adminR/adminReducerTs.interface'

const UserPage: React.FC<OwnProps> = () => {

    const teacherSlfInfoContent = useSelector((state: AppStateType) => state.adminR.curentTeacherInfo)

    const [teacherSlfInfoContentHk, setTeacherSlfInfoContentHk] = useState<AllTeacherInfoType | null>(teacherSlfInfoContent)

    useEffect(() => {
        setTeacherSlfInfoContentHk(teacherSlfInfoContent)
    }, [teacherSlfInfoContent])


    return (
        <div className={styles.user_page_content}>
            <div className={styles.user_page_content_container}>
                <div className={styles.user_page_content_title}>
                    Իմ էջը
                </div>
                <Row>
                    <Col span={4} className={styles.user_page_info_content_col}>
                        <div className={styles.user_page_info_content}>
                            <div className={styles.user_page_info_content_in_item_1_ic}>
                                <FaUser />
                            </div>
                            <div className={styles.user_page_info_content_in_item_2}>
                                <div className={styles.user_page_info_content_in_item_2_item_1}>
                                    {teacherSlfInfoContentHk?.name}
                                </div>
                                <div className={styles.user_page_info_content_in_item_2_item_1}>
                                    {teacherSlfInfoContentHk?.lastName}
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col span={14} className={styles.user_page_info_content_col_s}>
                        <div className={styles.user_page_info_content_in_item_1}>
                            <div className={styles.user_page_info_content_in_item_1_1}>
                                Ազգանուն։
                            </div>
                            <div className={styles.user_page_info_content_in_item_1_2}>
                                <Input />
                            </div>
                        </div>
                        <div className={styles.user_page_info_content_in_item_1}>
                            <div className={styles.user_page_info_content_in_item_1_1}>
                                Անուն
                            </div>
                            <div className={styles.user_page_info_content_in_item_1_2}>
                                <Input />
                            </div>
                        </div>
                        <div className={styles.user_page_info_content_in_item_1}>
                            <div className={styles.user_page_info_content_in_item_1_1}>
                                Հայրանուն
                            </div>
                            <div className={styles.user_page_info_content_in_item_1_2}>
                                <Input />
                            </div>
                        </div>
                        <div className={styles.user_page_info_content_in_item_1}>
                            <div className={styles.user_page_info_content_in_item_1_1}>
                                Հեռախոսահամար
                            </div>
                            <div className={styles.user_page_info_content_in_item_1_2}>
                                <Input type='number' />
                            </div>
                        </div>
                        <div className={styles.user_page_info_content_in_item_2_3}>
                            <div className={styles.user_page_info_content_in_item_2_1}>
                                <div className={styles.user_page_info_content_in_item_1_1}>
                                    Ծննդյան օրը
                                </div>
                                <div className={styles.user_page_info_content_in_item_1_2}>
                                    <DatePicker />
                                </div>
                            </div>
                            <div className={styles.user_page_info_content_in_item_2_1_c}>
                                <div className={styles.user_page_info_content_in_item_1_1}>
                                    Սեռ
                                </div>
                                <div className={styles.user_page_info_content_in_item_1_2}>
                                    <Select
                                        className={styles.user_page_info_content_in_item_1_2_slct}
                                        options={[
                                            {
                                                value: 'առական',
                                                label: 'Արական',
                                            },
                                            {
                                                value: 'իգական',
                                                label: 'Իգական',
                                            }
                                        ]}
                                    />
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </div >
    )
}

export default UserPage
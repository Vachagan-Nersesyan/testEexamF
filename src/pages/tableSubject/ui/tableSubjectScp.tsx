import React from 'react'
import styles from './tableSubjectStl.module.css'
import { OwnProps } from './tableSubjectTs.interface'
import { NavLink } from 'react-router-dom'
import { Col, Row } from 'antd'

const TableSubjectComp: React.FC<OwnProps> = () => {

    const examTypeArr = [
        {
            id: 0,
            name: 'Միասնական քննություն'
        },
        {
            id: 1,
            name: 'Միջանկյալ քննություն'
        }
    ]

    return (
        <div className={styles.table_subject_content}>
            <div className={styles.table_subject_content_title}>
                Քննությունները ըստ տեսակների
            </div>
            <Row className={styles.table_subject_content_row}>
                {
                    examTypeArr.map((val) => {
                        return (
                            <Col span={5} className={styles.table_subject_content_col}>
                                <NavLink to={`/table-subjects/type/${val.name}`}>
                                    {val.name}
                                </NavLink>
                            </Col>
                        )
                    })
                }
            </Row>


        </div>
    )
}

export default TableSubjectComp
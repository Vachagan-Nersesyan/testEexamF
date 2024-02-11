export interface InitialStateType {
    loading: boolean,
    error: string | null,

    password: string,
    isAdmin: boolean,

    allTeacherInfo: Array<AllTeacherInfoType>,

    curentTeacherInfo: AllTeacherInfoType | null,
    instituteName: string,
    instituteLogo: string,

}


export interface AllTeacherInfoType {
    name: string,
    lastName: string,
    password: string,
    isAuth: boolean
}
import Organization from './model/Organization'

export default interface State {
    user: { "_id"?: string,
            "firstName": string,
            "lastName": string,
            "email": string,
            "password"?: string,
            "organizations"?: Organization[]
        },
    token: string,
    organizations: any,
}

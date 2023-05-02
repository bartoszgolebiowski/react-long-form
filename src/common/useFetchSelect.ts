import {
    useQuery,
} from '@tanstack/react-query'
import { SelectKeysUsers, SelectKeysPosts, FormSelectKeyUsers, AllSelectKeys } from "../formConfig"

const DELAY_IN_MS = 1000;

function delay<T>(res: T): Promise<T> { return new Promise((resolve) => setTimeout(() => resolve(res), DELAY_IN_MS)) }

function fetcher<T>(section: AllSelectKeys): Promise<T> {
    const url = `/${section}.json`
    return fetch(url).then((res) => res.json()).then((res => delay(res as T)))
}

const emptyOption = {
    id: "",
    value: "",
}
function selectUser<T extends UserResponse>(res: T) {
    return [emptyOption, ...res.map((item) => ({ id: item.id, value: item.email }))]
}

type UserResponse = {
    "id": number,
    "email": string
}[]

function useFetchUser(
    name: SelectKeysUsers,
) {
    const queryKey = [name]
    const query = useQuery({ queryKey, queryFn: () => fetcher<UserResponse>(name), select: selectUser })
    return query
}

type PostResponse = {
    "userId": number
    "id": number
    "title": string
}[]

function selectPost(userId: string) {
    return function <T extends PostResponse>(res: T) {
        return [emptyOption, ...res.filter((item) => item.userId === Number(userId)).map((item) => ({ id: item.id, value: item.title }))]
    }
}

function useFetchPost(
    name: SelectKeysPosts,
    userId: string,
) {
    const queryKey = [name, userId]
    const query = useQuery({ queryKey, queryFn: () => fetcher<PostResponse>(name), enabled: !!userId, select: selectPost(userId) })
    return query
}


function useSelect(nestedValues: FormSelectKeyUsers) {
    return {
        'section-1-select-name-3': useFetchUser('section-1-select-name-3'),
        'section-2-select-name-3': useFetchUser('section-2-select-name-3'),
        'section-3-select-name-3': useFetchUser('section-3-select-name-3'),
        'section-4-select-name-3': useFetchUser('section-4-select-name-3'),
        'section-5-select-name-3': useFetchUser('section-5-select-name-3'),

        "section-1-select-name-4": useFetchPost("section-1-select-name-4", nestedValues["section-1-select-name-3"]),
        "section-2-select-name-4": useFetchPost("section-2-select-name-4", nestedValues["section-2-select-name-3"]),
        "section-3-select-name-4": useFetchPost("section-3-select-name-4", nestedValues["section-3-select-name-3"]),
        "section-4-select-name-4": useFetchPost("section-4-select-name-4", nestedValues["section-4-select-name-3"]),
        "section-5-select-name-4": useFetchPost("section-5-select-name-4", nestedValues["section-5-select-name-3"]),
    } as const
}

export type SelectOptions = ReturnType<typeof useSelect>
export default useSelect
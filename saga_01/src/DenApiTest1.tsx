import {useEffect, useState} from "react";
import axios from "axios";

const URL = 'https://64e1203150713530432cf864.mockapi.io/api/v1/accounts'

export type UsersType = Array<UserType>

export type UserType = {
    owner: string
    movements: Array<number>
    pin: number
    movementsDates: Array<string>
    id: string
    completed?: boolean
    balance: number
}

export type filterTermType = 'rich' | 'poor' | 'all'


export const DenApiTest1 = () => {


    const [users, setUsers] = useState<UsersType>([]) //готовим локальный стейт для массива объектов юзеров
    const [filterTerm, setFilterTerm] = useState<filterTermType>('all') //готовим стейт для хранения инфы, какой из фильтров выбран


    for (let user of users) { //добавляем в каждого юзера расчет баланса счета
        user.balance = user.movements.reduce((sum: number, value: number) => sum + value, 0)
    }

    useEffect(() => { //получаем юзеров с сервера и обновляем инфу в стейте
        axios
            .get(URL)
            .then((responce) => {
                setUsers(responce.data)
            })
    }, [])

    const filterUser = users.filter((user: UserType) => {
        if (filterTerm === 'all') return user
        return filterTerm === 'rich'
            ? user.balance >= 100000
            : user.balance < 100000
    })


    const usersList = filterUser.map((user: UserType) => {

        return (
            <div key={user.id} className="bankUserCard">
                <div>
                    <span><b>Имя: </b></span>
                    <span>{user.owner}</span>
                </div>
                <div>
                    <span><b>Баланс: </b></span>
                    <span>{user.balance}</span>
                </div>
            </div>
        )
    })

    return (
        <div>
            <div className={'bankButtons'}>
                <button onClick={() => {
                    setFilterTerm('all')
                }}>Все
                </button>
                <button onClick={() => {
                    setFilterTerm('rich')
                }}>Богатые
                </button>
                <button onClick={() => {
                    setFilterTerm('poor')
                }}>Бедные
                </button>
            </div>
            <div className={'bankUserCards'}>
                {usersList}
            </div>

        </div>
    );
};
import {useEffect, useState} from "react";
import axios from 'axios';

export type GetTodolistsResponce = {
    pagesCount: number
    page: number
    pageSize: number
    totalCount: number
    items: TodolistType[]
}

export type TodolistType = {
    isImportant: boolean
    id: string
    title: string
    description: string
    addedDate: string
    order: number
    images: ImagesType
}

export type ImagesType = {
    main: ImageType[]
}

export type ImageType = {
    url: string
    width: number
    height: number
    fileSize: number
}

export const DimichLesson = () => {

    const [todolists, setTodolists] = useState<TodolistType[]>([])

    useEffect(() => {
        axios.get<GetTodolistsResponce>('https://todolists.samuraijs.com/api/1.0/todolists?pageNumber=1&pageSize=10')
            .then((response) => {
                setTodolists(response.data.items)
            })
    }, [])

    return (
        <>
            <div className={'data'}>
                {
                    todolists.map((todolist) => {

                        const imageUrl = todolist.images.main.length > 1 ? todolist.images.main[1].url : 'https://placeholder.co/48'

                        return (
                            <div key={todolist.id}>
                                {<img src={imageUrl} alt=""/>}
                                <h3>
                                    {todolist.isImportant ? '🔥' : ''}
                                    {todolist.title.toUpperCase()}
                                </h3>
                                <div>{todolist.description}</div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
};
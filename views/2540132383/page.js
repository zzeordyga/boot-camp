'use client'

import {useEffect, useState} from "react";

export default function MainPage()
{
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(res => res.json())
            .then(data => setData(data))
            .catch(err => console.error('Failed to fetch Data:', err));
    }, []);

    return(
        <>
            <div className='listContainer'>
                <table>
                    <thead>
                    <tr>
                        <th>User Id</th>
                        <th>Title</th>
                        <th>Message</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data && data.map(posts=> (
                        <tr key={posts.id}>
                            <td>{posts.userId}</td>
                            <td>{posts.title}</td>
                            <td>{posts.body}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}
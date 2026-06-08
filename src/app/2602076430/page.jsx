'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import './style.css'

const Index = () => {
    const [count, setCount] = useState(0)

    const headingRef = useRef(null)

    useEffect(() => {
        console.log('Component telah dimount')

        if (headingRef.current) {
            headingRef.current.style.color = 'coral'
        }
    }, [])

    const doubledCount = useMemo(() => {
        return count * 2
    }, [count])

    return (
        <div className="page">
            <div className="card">
                <h1 ref={headingRef} className="title">
                    Ferry Febrian - 2602076430
                </h1>

                <p className="description">
                    Hello, I'm a fresh graduate with valuable experience as
                    an Intern @Kawan Lama and currently working as a
                    Developer @NTT.
                </p>

                <div className="counter-container">
                    <div className="counter-box">
                        <strong>Count:</strong> {count}
                    </div>

                    <div className="counter-box">
                        <strong>Doubled Count:</strong> {doubledCount}
                    </div>
                </div>

                <button
                    className="button"
                    onClick={() => setCount(count + 1)}
                >
                    Increment
                </button>
            </div>
        </div>
    )
}

export default Index
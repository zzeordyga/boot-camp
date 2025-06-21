import React, { useState, useEffect, useRef, useMemo } from 'react';

export default function Index() {
    const [side, setSide] = useState(0);
    const [refresh, setRefresh] = useState(0);

    useEffect(() => {
        document.title = `Clicked ${refresh} times`;
    }, [side]);

    const perimeter = useMemo(() => side * 4, [side]);
    const area = useMemo(() => side * side, [side]);

    const handleClickIncrease = () => {
        setSide((prev) => prev + 1);
        setRefresh((previous) => previous + 1);
    };

    const handleClickDecrease = () => {
        setSide((prev) => prev - 1);
        setRefresh((previous) => previous + 1);
    };

    return (
        <div className="bg-amber-100 flex-col items-center justify-items-center p-6 min-h-screen font-sans">
            <h1 className="text-2xl font-bold text-center mb-2">Vincentius Justine Gozali - 2540120692</h1>
            <p className="mb-4">
                Computer Science is the study of computation, programming, and information processing. It covers a wide range of topics including algorithms, software development, data structures, artificial intelligence, and cybersecurity. As a Computer Science student, I learn how to design efficient systems, solve complex problems, and build software that powers technology in every aspect of modern life.
            </p>
            <p className="mb-4">
                refresh counter : <strong>{refresh}</strong>
            </p>

            <div className="bg-blue-100 w-1/4 flex-col justify-items-center p-6 rounded-3xl">
                <h2 className="text-xl font-bold text-center mb-6">Square Calculator</h2>
                <div className="flex w-full justify-evenly">
                    <button
                        onClick={handleClickIncrease}
                        className="bg-blue-600 text-white px-4 py-2 min-w-14 rounded hover:bg-blue-700"
                    >
                        +
                    </button>
                    <button
                        onClick={handleClickDecrease}
                        className="bg-blue-600 text-white px-4 py-2 min-w-14 rounded hover:bg-blue-700"
                    >
                        -
                    </button>
                </div>
                <p className="mt-4 m-auto text-gray-700">
                    Square Side : <strong>{side}</strong>
                </p>
                <p className="mt-4 m-auto text-gray-700">
                    Square Perimeter : <strong>{perimeter}</strong>
                </p>
                <p className="mt-4 m-auto text-gray-700">
                    Square Area : <strong>{area}</strong>
                </p>
            </div>


        </div>
    );
}
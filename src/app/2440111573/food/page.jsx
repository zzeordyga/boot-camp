'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';

// import '../style.css'; 

export default function FoodPage() {
    const [foodImage, setFoodImage] = useState(null);
    const [selected, setSelected] = useState('random');
    const [apiLink, setApiLink] = useState('https://foodish-api.com/api/')

    const category = ['random', 'pizza', 'burger', 'rice', 'pasta', 'dessert'];


    const fetchFood = async () => {
        console.log(apiLink);
        const response = await fetch(apiLink);
        const result = await response.json();
        setFoodImage(result.image);
        
    }

    useEffect(() => {
        if(selected === 'random'){
            setApiLink('https://foodish-api.com/api/');
        }else{
            setApiLink('https://foodish-api.com/api/images/'+selected);
        }
        fetchFood();
    }, [selected])

    useEffect(() => {
        fetchFood();
    }, []);

    return (
        <>
        <div className="flex flex-col items-center justify-center min-h-screen w-full p-5">
            <div className="mb-8 w-full text-center">
            <h2 className="text-xl font-semibold">Food Generator</h2>
            </div>
            <div className="mb-8">
            <div className="p-6 bg-green shadow-lg rounded-lg text-center">
                <img
                src={foodImage || 'https://placehold.co/450x300?text=Loading+Food+Image'}
                alt="Random food image"
                className="max-w-xs mb-4"
                width="450"
                height="300"
                />
            </div>
            </div>
            <div className="mb-8">

            <select
                value={selected}                    
                onChange={(e) => setSelected(e.target.value)}
                className="border rounded-md p-2"
            >
                {category.map((cat) => (

                    <option key={cat} value={cat}>
                        {cat.toUpperCase()}
                    </option>

                ))}

            </select>

            <button
               
                onClick={fetchFood}
            >
                Generate Random Food
            </button>
            </div>
            <div className="mb-8">
            <Link
                href="/2440111573"
                className="text-blue-500 hover:text-blue-700 underline"
            >
                Back to Main Page
            </Link>
            </div>
        </div>
        </>
    );
}
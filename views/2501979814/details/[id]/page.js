'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function DetailPage() {
  const { id } = useParams();
  const [dog, setDog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetch(`https://dogapi.dog/api/v2/breeds/${id}`)
        .then(res => res.json())
        .then(data => {
          setDog(data.data?.attributes || null);
          setLoading(false);
        })
        .catch(err => {
          console.error("Error fetching detail:", err);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (!dog) return <div className="p-6 text-red-500">Dog not found.</div>;
  console.log(dog)
  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">{dog.name}</h1>
      <p className="mb-3 text-gray-700">{dog.description || 'No description available.'}</p>
      <p><strong>Life Span:</strong> {dog.life.min} - {dog.life.max} years</p>
      <p><strong>Hypoallergenic:</strong> {dog.hypoallergenic ? 'Yes' : 'No'}</p>
      <div className='mt-5'>
        <h2 className='font-bold text-lg'>Dog Weights</h2>

        <div className='flex mt-5'>
          <div className='border-r p-2 w-32'>
            <p><strong>Male</strong></p>
            <p className='mt-3'>{dog.male_weight.min} kg - {dog.male_weight.max} kg</p>
          </div>

          <div className='p-2 w-32'>
            <p><strong>Female</strong></p>
            <p className='mt-3'>{dog.female_weight.min} kg - {dog.female_weight.max} kg</p>

          </div>
        </div>
      </div>
      

      <Link href="/">
        <button className="mt-5 bg-pink-300 font-medium px-3 py-2 text-white rounded-lg cursor-pointer">← Back</button>
      </Link>
    </div>
  );
}

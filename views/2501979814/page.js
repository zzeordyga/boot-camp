// import { useState, useEffect } from "react";
'use client';
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [dogData, setDogData] = useState([]);

  useEffect(() => {
    fetch('https://dogapi.dog/api/v2/breeds')
      .then(res => res.json())
      .then(data => setDogData(data.data))
      .catch(err => console.error('Failed to fetch dog breeds:', err));
  }, []);


  console.log(dogData);
  return (
    <div>
      <h1 className="text-center font-bold text-4xl">Welcome tou Dog Pedia</h1>
      <p className="text-center text-md text-gray mt-5">When the litlle ones can become your part of the family</p>

      <div className="w-full mt-10">
        <table className="min-w-full bg-white border rounded-md shadow">
          <thead className="text-left">
            <tr>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Description</th>
              <th className="px-4 py-2 border">Hypoallergenic</th>
              <th className="px-4 py-2 border">Facts</th>
            </tr>
          </thead>
          <tbody>
            {dogData.map((value, idx) => (
              // console.log(value)
              <tr key={idx} className="border hover:bg-gray-50">
                <td className="py-2 px-4 border">{value.attributes.name}</td>
                <td className="py-2 px-4 border">{value.attributes.description?.slice(0, 100) || '-'}</td>
                <td className="py-2 px-4 text-center border">
                  {value.attributes.hypoallergenic ? 'Yes' : 'No'}
                </td>
                <td className="text-center p-5">
                  <Link href={`/details/${value.id}`}>
                    <div className="flex justify-center">
                      <button className="bg-pink-300 font-medium px-3 py-2 text-white rounded-lg cursor-pointer">View Facts</button>
                    </div>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

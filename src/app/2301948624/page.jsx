'use client'
import { useEffect, useMemo, useRef, useState } from 'react'

export default function StudentTable() {
  const [students, setStudents] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [sortKey, setSortKey] = useState('name')
  const [sortAsc, setSortAsc] = useState(true)
  const [gridView, setGridView] = useState(false)

  const searchInputRef = useRef(null)

  useEffect(() => {
    fetch('/students.json')
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((err) => console.error('Gagal memuat data mahasiswa:', err))
  }, [])

  const filteredAndSortedStudents = useMemo(() => {
    const filtered = students.filter((student) =>
      `${student.name} ${student.nim} ${student.studyProgram}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )

    const sorted = [...filtered].sort((a, b) => {
      const aVal = a[sortKey] || ''
      const bVal = b[sortKey] || ''
      return sortAsc
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal))
    })

    return sorted
  }, [students, searchTerm, sortKey, sortAsc])

  return (
    <div className='min-h-screen bg-gray-50'>
    <div className="p-4 max-w-screen-xl mx-auto">
      {/* Judul halaman */}
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Daftar Mahasiswa
      </h1>

      {/* Search & Actions */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
        <input
          ref={searchInputRef}
          type="text"
          placeholder="Cari nama, NIM, atau jurusan..."
          className="w-full md:w-1/2 p-2 border border-gray-300 rounded shadow-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => {
              setSortKey('name')
              setSortAsc(sortKey === 'name' ? !sortAsc : true)
            }}
            className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Sort Nama {sortKey === 'name' && (sortAsc ? '↑' : '↓')}
          </button>
          <button
            onClick={() => {
              setSortKey('nim')
              setSortAsc(sortKey === 'nim' ? !sortAsc : true)
            }}
            className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            Sort NIM {sortKey === 'nim' && (sortAsc ? '↑' : '↓')}
          </button>
          <button
            onClick={() => setGridView((prev) => !prev)}
            className="px-3 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
          >
            {gridView ? 'Tabel View' : 'Grid View'}
          </button>
        </div>
      </div>

      {/* Tampilan data */}
      {gridView ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAndSortedStudents.map((student, index) => (
            <div
              key={index}
              className="border rounded-lg shadow-sm p-4 bg-white hover:shadow-md transition"
            >
              <h2 className="text-lg font-semibold mb-1">{student.name}</h2>
              <p className="text-sm text-gray-700">NIM: {student.nim}</p>
              <p className="text-sm text-gray-700 mb-1">
                Jurusan: {student.studyProgram}
              </p>
              <p className="text-xs text-gray-600">
                <strong>Tambahan:</strong>{' '}
                {student.additionalData
                  ? Object.entries(student.additionalData)
                      .map(([k, v]) => `${k}: ${v}`)
                      .join(', ')
                  : 'Tidak ada'}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="w-full text-sm table-auto border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2">Nama</th>
                <th className="border px-4 py-2">NIM</th>
                <th className="border px-4 py-2">Jurusan</th>
                <th className="border px-4 py-2">Tambahan</th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedStudents.map((student, index) => (
                <tr key={index} className="text-center hover:bg-gray-50">
                  <td className="border px-4 py-2">{student.name}</td>
                  <td className="border px-4 py-2">{student.nim}</td>
                  <td className="border px-4 py-2">{student.studyProgram}</td>
                  <td className="border px-4 py-2">
                    {student.additionalData
                      ? Object.entries(student.additionalData)
                          .map(([k, v]) => `${k}: ${v}`)
                          .join(', ')
                      : 'Tidak ada'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
    </div>
  )
}

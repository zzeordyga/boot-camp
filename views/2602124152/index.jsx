import { useState, useEffect, useRef, useMemo } from 'react'

export default function MyPage() {
  const [bio, setBio] = useState('Computer Science BINUS, one')
  const [likes, setLikes] = useState(0)
  const inputRef = useRef(null)

  useEffect(() => {
    document.title = `Charles Cahyadi — ${likes} likes`
  }, [likes])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const bioLength = useMemo(() => bio.length, [bio])

  return (
    <div>
      <h3>Charles Cahyadi - 2602124152</h3>
      <p>{bio} <small>({bioLength} chars)</small></p>

      <input
        ref={inputRef}
        value={bio}
        onChange={e => setBio(e.target.value)}
      />

      <div style={{ marginTop: 8 }}>
        <button onClick={() => setLikes(l => l + 1)}>Like</button>
        <span style={{ marginLeft: 8 }}>{likes}</span>
      </div>
    </div>
  )
}
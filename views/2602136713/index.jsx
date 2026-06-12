import { useEffect, useMemo, useState } from 'react'
import './index.css'

function index() {
  const [number1, setNumber1] = useState(0);
  const [number2, setNumber2] = useState(0);
  const [render, setRender] = useState(false);

  const result = useMemo(() => {
    console.log("multiply results calculation");
    const hasil = number1 * number2;
    return hasil;
  }, [number1, number2]);

  const cumulativeResult = useMemo(() => {
    console.log("Cumulative Result Calculation")
    let hasilPerkalianKumulatif = 0;

    for(let i = 1; i <= result; i++){
      let hasilKali = i * result;
      hasilPerkalianKumulatif = hasilPerkalianKumulatif + hasilKali;
    };

    return hasilPerkalianKumulatif;
  }, [result]);

  useEffect(() => {
    document.title = `2602136713 - Result : ${result}`;
  }, [result])

  const handleClickIncreaseNumber1 = () => {
    setNumber1(number1 + 1);
  }

  const handleClickIncreaseNumber2 = () => {
    setNumber2(number2 + 1);
  }

  const handleClickDecreaseNumber1 = () => {
    setNumber1(number1 - 1);
  }

  const handleClickDecreaseNumber2 = () => {
    setNumber2(number2 - 1);
  }

  const handleClickRender = () => {
    setRender(prevRender => !prevRender);
    console.log(render);
  }

  return (
    <>
      <div id="center">
        <h1>Kevin Petersen - 2602136713</h1>
        <p>
          I'm an Undergraduate Computer Science Student at Bina Nusantara University with a 
          passion for software and web development from frontend into backend perspective. 
          I love building modern and interactive website applications using the modern tools 
          and technology stacks.
        </p>

        <div id="multiplyApp">
          <h1>Multiply App</h1>
          <div id="boxInput">
              <div className="number-box">
                <input value={number1} type="text" readOnly />

                <button className="btn-add" onClick={handleClickIncreaseNumber1}>Tambah</button>
                <button className="btn-subtract" onClick={handleClickDecreaseNumber1}>Kurang</button>
              </div>

              <div className="number-box">
                <input value={number2} type="text" readOnly />

                <button className="btn-add" onClick={handleClickIncreaseNumber2}>Tambah</button>
                <button className="btn-subtract" onClick={handleClickDecreaseNumber2}>Kurang</button>
              </div>
          </div>

          <div>
            <h1>Results : {result}</h1>
            <h1>Cumulative Results : {cumulativeResult}</h1>
          </div>
        </div>

        <div className="resultSection">
          <button onClick={handleClickRender}>Try to Render</button>
        </div>
      </div>
    </>
  )
}

export default index
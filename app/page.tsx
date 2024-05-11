"use client"
import { useRef, useState } from "react";
import { ApiResponse } from "./models/apiresponse";
import { FiThermometer } from "react-icons/fi";
import { FiSearch } from "react-icons/fi";
import { FiSunset } from "react-icons/fi";
import { FiChevronsUp } from "react-icons/fi";
import { FiChevronsDown } from "react-icons/fi";
import { FiWind } from "react-icons/fi";
import { FiCloud } from "react-icons/fi";


const APIKEY = "5c86490ff1685b81ccc2dcc182a48a32";

export default function Home() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [city, setCity] = useState<ApiResponse | null>(null);

  const fetchData = async () => {
    if (!inputRef.current) {
      return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputRef.current.value}&units=metric&appid=${APIKEY}`;

    fetch(url)
      .then((res) => res.json())
      .then((data: ApiResponse) => {
        setCity(null);
        console.log(data);
        setCity(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="bg-sky-200 h-screen grid place-items-center">
      <div className="bg-white w-100 p-4 rounded-md text-gray-900">
        <div className="flex items-center justify-between">
          <input
            type="text"
            ref={inputRef}
            placeholder="Ingrese la ubicación"
            className="text-xl border-b p-1 border-gray-200 font-semibold uppercase"
          />
          <button onClick={fetchData}>
            <div className="w-9">
              <FiSearch size={30} />
            </div>
          </button>
        </div>

        <div>
          <div className="text-center flex flex-col gap-6 mt-10">
            {city ? (
              <>
                <p className="text-xl font-semibold">{city.name}</p>
                <p className="text-sm">{city.sys.country}</p>
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col items-center justify-center p-4">
                    <FiThermometer size={40} />
                    <p className="text-md font-bold"> Temperatura</p>
                    <p className="text-sm">{city.main.temp}</p>
                  </div>

                  <div className="flex flex-col items-center justify-center p-4">
                    <FiChevronsUp size={40} />
                    <p className="text-md font-bold">Máx</p>
                    <p className="text-sm">{city.main.temp_max}</p>
                  </div>

                  <div className="flex flex-col items-center justify-center p-4">
                    <FiChevronsDown size={40} />
                    <p className="text-md font-bold">Mín</p>
                    <p className="text-sm">{city.main.temp_min}</p>
                  </div>

                  <div className="flex flex-col items-center justify-center p-4">
                    <FiSunset size={40} />
                    <p className="text-md font-bold"> Presión</p>
                    <p className="text-sm">{city.main.pressure}</p>
                  </div>

                  <div className="flex flex-col items-center justify-center p-4">
                    <FiWind size={40} />
                    <p className="text-md font-bold"> Aire</p>
                    <p className="text-sm">{city.wind.speed}</p>
                  </div>

                  <div className="flex flex-col items-center justify-center p-4">
                    <FiCloud size={40} />
                    <p className="text-md font-bold"> Sensación</p>
                    <p className="text-sm">{city.main.feels_like}</p>
                  </div>

                </div>
              </>

            ) : (
              <div className="text-center flex flex-col items-center justify-center h-full">
                <FiCloud size={40} />
                <p className="text-xl pt-5">Revisa el Clima</p>
              </div>

            )}

          </div>
        </div>
      </div>
    </div>
  );
}

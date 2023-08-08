'use client'
import React, { useState } from 'react';


export const GlobalContext = React.createContext({
    weatherData: {},
    loading: true,
    setWeatherData: () => { },
    setLoading: () => { },
});

export const GlobalContextProvider = (props) => {
    const [weather, setWeather] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    return (
        <GlobalContext.Provider
            value={{
                weatherData: weather,
                loading: isLoading,
                setWeatherData: setWeather,
                setLoading: setIsLoading,
            }}
        >
            {props.children}
        </GlobalContext.Provider>
    );
};
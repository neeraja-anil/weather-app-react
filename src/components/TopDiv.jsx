import React, { useState, useContext } from 'react'
import { styled } from '@mui/system'
import { Box, IconButton, InputBase, Typography } from '@mui/material'
import FlexBetween from './FlexBetween'
import { Search } from '@mui/icons-material'
import axios from 'axios'
import { GlobalContext } from '../context'

// Conditionally rendering bg Image 
const Background = styled(Box)(({ background = '' }) => ({
    backgroundImage: background === 'Rain' ? `url('images/rainy.jpg')`
        : background === 'Clouds' ? `url('images/cloud.jpg')`
            : background === 'Thunderstorm' ? `url('images/Thunder.jpg')`
                : background === 'Snow' ? `url('images/snow.jpg')`
                    : background === 'Winter' ? `url('images/winter.jpg')`
                        : background === 'Clear' ? `url('images/sunny.jpg')`
                            : background === 'Mist' ? `url('images/cloudy.jpg')`
                                : `url('images/cloud.jpg')`,
    height: '45vh',
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    padding: "1.5rem 1.5rem 0.75rem 1.5rem",
    opacity: '0.5',
    borderRadius: '1rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around'

}))



const TopDiv = () => {
    const [city, setCity] = useState('')
    const { setWeatherData, weatherData } = useContext(GlobalContext)
    const API = process.env.REACT_APP_API
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    // SEARCH Cities
    const handleSearch = async () => {
        try {
            const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API}`)
            console.log(data)
            setWeatherData(data)
        } catch (error) {
            console.log(error.message)
        }

    }
    const isWeatherData = Object.keys(weatherData).length > 0;
    // const timezone = weatherData?.timezone
    // Current date and time
    let d = new Date((new Date().getTime()))
    d.toISOString()
    console.log(weatherData);

    return (
        <>
            <Background background={isWeatherData && weatherData?.weather[0]?.main}>
                <Box display='flex' justifyContent='center'>
                    {/* SEARCH CITIES */}
                    <FlexBetween gap='3rem' borderRadius='2rem' border='1px solid white' padding='0.1rem 1.5rem'>
                        <InputBase placeholder='Search cities...' onChange={(e) => setCity(e.target.value)} />
                        <IconButton onClick={handleSearch}>
                            <Search />
                        </IconButton>
                    </FlexBetween>
                </Box>
                <Box >
                    <FlexBetween gap='4rem' pb='2rem'>
                        <Box>
                            {isWeatherData &&
                                <>
                                    {/* Weather Icon */}
                                    <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt="" />
                                    <Typography variant='h3' sx={{ color: 'black' }}>
                                        {weatherData.main.temp} &#8451;
                                    </Typography>
                                    <Typography variant='h5' sx={{ color: 'black' }}>{weatherData.name}</Typography>
                                </>
                            }

                        </Box>
                        <Box>
                            <Typography variant='h4' sx={{ color: 'black' }}>{`${d.getHours()}:${d.getMinutes()}`}</Typography>
                            <Typography variant='h6' sx={{ color: 'black' }}>{`${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()} ${weekday[d.getDay()]}`}</Typography>
                        </Box>
                    </FlexBetween>
                </Box>
            </Background>
        </>
    )
}

export default TopDiv
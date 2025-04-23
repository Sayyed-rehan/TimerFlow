import React, { useEffect, useState } from "react";
import "./Home.css";
import { Box, Typography, TextField, Button, InputLabel, Select, IconButton, MenuItem, Stack, FormControl, Grid } from "@mui/material";
import TimerUI from "../../Components/TimerUI/TimerUI";
import { useNavigate } from "react-router"

const Home = () => {

    const nav = useNavigate()
    const [inputs, setinputs] = useState({
        hours: "",
        minutes: "",
        seconds: "",
    });


    const [user_data, setuser_data] = useState({
        title: "",
        category: "",
        timer: null,
        duration: null,
        status: 'Running'
    })

    const [stored_data, setstored_data] = useState(JSON.parse(localStorage.getItem('time_logs')) || [])




    const handleInputs = (e) => {
        setinputs({ ...inputs, [e.target.name]: e.target.value });
    };

    const handleAddTime = () => {
        let total_time_inSec = (+inputs.seconds + +inputs.minutes * 60 + +inputs.hours * 3600);
        setuser_data({ ...user_data, timer: total_time_inSec, duration: total_time_inSec });
        setinputs({
            hours: "",
            minutes: "",
            seconds: "",
        })



        localStorage.setItem('time_logs', JSON.stringify([...stored_data, { ...user_data, timer: total_time_inSec, duration: total_time_inSec }]))
        setstored_data([...stored_data, { ...user_data, timer: total_time_inSec, duration: total_time_inSec }])

    };



    const handleCategoryChange = (e) => {
        setuser_data({ ...user_data, category: e.target.value })
    }

    const updateLocalStoreage = (index, updatetime, updateStatus = 'Running') => {
        console.log(index, updatetime)
        let local_Storage_data = JSON.parse(localStorage.getItem('time_logs')) || []
        local_Storage_data[index] = { ...local_Storage_data[index], timer: updatetime, status: updateStatus }
        setstored_data(local_Storage_data)
        localStorage.setItem('time_logs', JSON.stringify(local_Storage_data))
    }

    useEffect(() => {

    }, [])






    return (
        <Box className="home-container">

            <Stack direction='row' sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '2vh' }}>
                <TextField
                    label="hours"
                    value={inputs.hours}
                    name="hours"
                    onChange={handleInputs}
                    type='number'

                />
                <TextField
                    label="mins"
                    value={inputs.minutes}
                    name="minutes"
                    onChange={handleInputs}
                    type='number' defaultValue='0'

                />
                <TextField
                    label="Seconds"
                    value={inputs.seconds}
                    name="seconds"
                    onChange={handleInputs}
                    type='number'
                />

                <TextField label='title' value={user_data.title} onChange={(e) => setuser_data({ ...user_data, title: e.target.value })} />
                <FormControl sx={{ width: '200px' }}>
                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                    <Select
                        value={user_data.category}
                        label="Category"
                        onChange={handleCategoryChange}
                    >
                        <MenuItem value={'Workout'}>Workout</MenuItem>
                        <MenuItem value={'Study'}>Study</MenuItem>
                        <MenuItem value="Break">Break</MenuItem>
                    </Select>
                </FormControl>

            </Stack>
            <Stack direction='row' spacing={10}>
                <Button onClick={handleAddTime} variant='contained' 
                disabled={inputs.seconds < 0 || inputs.minutes < 0 || inputs.hours < 0 || !user_data.title ||!user_data.category }>
                    Add Timer
                </Button>
                <Button onClick={() => nav("/history")} variant='contained' color="error">Go Timer Logs</Button>
            </Stack>





            {/* <Box className="timer-container">
                {
                    stored_data.map((item, index) => {
                        return <TimerUI
                            stored_data={item}
                            index={index}
                            updateLocalStoreage={updateLocalStoreage}
                        />
                    })
                }
            </Box> */}


            {/* <Box className="timer-table">
                {
                    stored_data.map((item, index)=>{
                        return <TimerTable
                            stored_data={item}
                            index={index}
                        />
                    })
                }
            </Box> */}
            <Box>
                <Grid container width='100vw' >
                    <Grid bgcolor='' size='grow' alignItems="center" sx={{ display: 'flex', flexDirection: 'column', gap: '2vw', alignItems: 'center' }}>
                        <Typography variant='h4'>Workout</Typography>

                        {
                            stored_data.map((item, index) => {
                                if (item.category == 'Workout' && item.status != 'Completed') {
                                    return <TimerUI
                                        stored_data={item}
                                        index={index}
                                        updateLocalStoreage={updateLocalStoreage}
                                    />
                                }
                            })
                        }
                    </Grid>
                    <Grid bgcolor='' size='grow' sx={{ display: 'flex', flexDirection: 'column', gap: '2vw', alignItems: 'center' }}>
                        <Typography variant='h4'>Study</Typography>


                        {
                            stored_data.map((item, index) => {
                                if (item.category == 'Study' && item.status != 'Completed') {
                                    return <TimerUI
                                        stored_data={item}
                                        index={index}
                                        updateLocalStoreage={updateLocalStoreage}
                                    />
                                }
                            })
                        }
                    </Grid>

                    <Grid bgcolor='' size='grow' sx={{ display: 'flex', flexDirection: 'column', gap: '2vw', alignItems: 'center' }}>
                        <Typography variant='h4' fontWeight='bold'>Break</Typography>
                        {
                            stored_data.map((item, index) => {
                                if (item.category == 'Break' && item.status != 'Completed') {
                                    return <TimerUI
                                        stored_data={item}
                                        index={index}
                                        updateLocalStoreage={updateLocalStoreage}
                                    />
                                }
                            })
                        }
                    </Grid>

                </Grid>
            </Box>


        </Box>
    );
};

export default Home;

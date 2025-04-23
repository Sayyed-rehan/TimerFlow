import React, { useEffect, useState } from 'react'
import "./TimerUI.css"
import { Box, Typography, TextField, Button, InputLabel, Select, IconButton, MenuItem, Stack, CircularProgress } from "@mui/material";
import swal from 'sweetalert';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import PauseIcon from '@mui/icons-material/Pause';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';


const TimerUI = ({ stored_data, index, updateLocalStoreage }) => {




    const [timer, settimer] = useState(stored_data.timer)
    const [progress, setProgress] = useState((Math.abs(stored_data.duration - timer) / stored_data.duration) * 100);





    let current_timer;

    const handleReset = () => {
        clearInterval(current_timer);
        settimer(stored_data.duration)
        updateLocalStoreage(index, stored_data.duration)

    }

    const handlePause = async () => {
        console.log("timer in pause", timer);
        clearInterval(current_timer);
        updateLocalStoreage(index, timer, 'Paused')
    }

    const handleResume = async () => {
        timer_logic()
        updateLocalStoreage(index, timer)

    }

    const timer_logic = () => {
        if (timer > 0) {
            current_timer = setInterval(() => {
                console.log('current time = ', timer);
                settimer((prev) => prev - 1)
                let percent = ((Math.abs(stored_data.duration - timer) / stored_data.duration) * 100)
                setProgress(percent)
                clearInterval(current_timer);
            }, 1000);

        } else {
            updateLocalStoreage(index, 0, 'Completed')
            clearInterval(current_timer);
            swal("Times Up!", `${stored_data.title}`, "success");

        }
    }




    useEffect(() => {
        if (stored_data.status == 'Running') {
            timer_logic()
        }

    }, [timer]);








    return (
        <Box className="timer-box" >
            <CircularProgress value={progress} variant="determinate" size="46vh" thickness="1" color='primary' className='prgress-bar' />
            <Typography variant="h2">{timer}</Typography>
            <Typography variant="h5">{stored_data.title}</Typography>


            <Stack direction='row'>

                <IconButton onClick={handleReset} color="error">
                    <RotateLeftIcon fontSize="large" />
                </IconButton>


                {timer ?
                    (stored_data.status == 'Paused'
                        ? <IconButton >
                            <PlayCircleOutlineIcon fontSize="large" onClick={handleResume} />
                        </IconButton>

                        : <IconButton >
                            <PauseIcon fontSize="large" onClick={handlePause} />
                        </IconButton>)
                    : null

                }
            </Stack>



        </Box>
    )
}

export default TimerUI
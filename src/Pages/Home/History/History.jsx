import React, { useEffect, useState } from 'react'
import { Box, Button, Stack, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import {useNavigate} from "react-router"

const History = () => {

  const nav = useNavigate()

  const [stored_data, setstored_data] = useState([])

  useEffect(() => {
    setstored_data(JSON.parse(localStorage.getItem('time_logs')) || [])
  }, [])

  return (
    <Box className="history-contianer">
    <Stack direction='row' alignItems='center' justifyContent='center' spacing={10}>
    <Typography variant='h5' fontWeight='bold' gutterBottom textAlign='center' p ='20px'>Completed Log History</Typography>
    <Button variant='contained' onClick={()=>nav("/")}>Go To Timers</Button>
    </Stack>
      <TableContainer component='Paper'>
        <Table>
          <TableRow v>
            <TableCell align='center'>Title</TableCell>
            <TableCell align='center'>Category</TableCell>
            <TableCell align='center'>Duration (Sec)</TableCell>
            <TableCell align='center'>Remaning Time</TableCell>
            <TableCell align='center'>Status</TableCell>
          </TableRow>
          <TableBody >
            {
              stored_data.map((item, index) => {
                if (item?.status == 'Completed') {
                  return <TableRow key={index} >
                    <TableCell align='center'>{item?.title}</TableCell>
                    <TableCell align='center'>{item?.category}</TableCell>
                    <TableCell align='center'>{item?.duration}</TableCell>
                    <TableCell align='center'>{item?.timer}</TableCell>
                    <TableCell align='center'>{item?.status}</TableCell>
                  </TableRow>
                }
              })
            }
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default History
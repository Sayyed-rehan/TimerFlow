import React from 'react'
import "./TimerTable.css"
import { Box,TableContainer,Table,TableBody,TableCell,TableHead,TableRow } from "@mui/material";

const TimerTable = ({stored_data}) => {
  return (
    <Box className="table-container">
        <TableContainer>
            <Table>
                <TableRow >
                    <TableCell>Name</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Remaining time</TableCell>
                    <TableCell>Status</TableCell>
                </TableRow>
            <TableBody >
                <TableCell>{stored_data.title}</TableCell>
                <TableCell>{stored_data.category}</TableCell>
                <TableCell>{stored_data.timer}</TableCell>
                <TableCell>Running</TableCell>
            </TableBody>
            </Table>
        </TableContainer>
    </Box>
  )
}

export default TimerTable
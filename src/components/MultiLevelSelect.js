import { Box, Button, Paper } from '@mui/material'
import React from 'react'

const Select = ({ id, name, children, onChange }) => {
    const [show, setShow] = React.useState(false)
    const [onHover, setOnHover] = React.useState(false);
    return (
        <Box sx={{ position: 'relative' }} onMouseOver={() => setShow(true)} onMouseLeave={() => setShow(false)}>
            <Button sx={{ minWidth: '10vw' }} onClick={() => onChange({ name, id })}>
                {name}
            </Button>
            {(show || onHover) && <Paper sx={{ position: "absolute", left: '100%', top: '0' }} elevation={4}>
                <Box onMouseLeave={() => setOnHover(false)} onMouseOver={() => setOnHover(true)}>
                    {children?.map((item, index) => (
                        <Select key={index} id={item.id} name={item.name} children={item.children} onChange={onChange} />
                    ))}
                </Box>
            </Paper>}
        </Box>
    )
}

export default function MultiLEvelSelect({ defaultValue, options, value, onChange }) {
    const [show, setShow] = React.useState(false)
    const [onHover, setOnHover] = React.useState(false);
    const handleChange = (e) => {
        onChange(e);
        setShow(false);
        setOnHover(false)
    }
    return (
        <Box sx={{ position: 'relative', width: '100%', border: '0.08rem solid #000000de', borderRadius: '0.2rem' }} >
            <Button onClick={() => setShow(true)} onMouseLeave={() => setShow(false)}>{value?.name || 'select'}</Button>
            {(show || onHover) && <Paper sx={{ position: "absolute", left: '0', top: '100%', zIndex: 5 }} elevation={4}
            >
                <Box onMouseLeave={() => setOnHover(false)} onMouseOver={() => setOnHover(true)}>
                    {options?.map((item, index) => (
                        <Select key={index} id={item.id} name={item.name} children={item.children} onChange={handleChange} />
                    ))}
                </Box>
            </Paper>}{defaultValue}
        </Box>
    )
}

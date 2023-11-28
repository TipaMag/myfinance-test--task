import {Box, Link} from "@mui/material"

export const About = () => {
    return (
        <Box sx={{display: 'flex', flexDirection: 'column'}}>
            <a href="https://github.com/TipaMag" target="_blank" rel="noopener noreferrer">
                Посилання на GitHub
            </a>

            <a href="https://robota.ua/my/resumes/17253154" target="_blank" rel="noopener noreferrer">
                Посилання на robota.ua
            </a>
        </Box>
    )
}
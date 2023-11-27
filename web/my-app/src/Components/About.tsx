import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { Box, Link, Paper } from '@mui/material';

export default function About() {

    return (
        <Grid
            item
            xs={12}
            md={8}
            sx={{
                mb: 5,
                '& .markdown': {
                    py: 3,
                },
            }}
        >
            <Typography variant='h6' >
                Welcome
            </Typography>
            <Divider sx={{ mb: 1 }} />
            <Typography variant='body1' sx={{ mb: 2 }}>
                This is your ultimate online destination for everything related to the phenomenal rock band, the Arctic Monkeys! Whether you're a die-hard fan or just discovering their music, this website is your go-to source for news, updates, and a community of like-minded enthusiasts.
            </Typography>
            <Typography variant='body1' sx={{ mb: 2 }}>
                This is more than just a website, it's a celebration of the Arctic Monkeys and the incredible community that surrounds them. Join us on this musical journey, and let's continue to rock together!
            </Typography>
        </Grid>

    );
}
import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { Box, Link, Paper } from '@mui/material';

export default function History() {

    return (
        <Grid
            item
            xs={12}
            md={8}
            sx={{
                '& .markdown': {
                    py: 3,
                },
            }}
        >
            <Typography variant='h6' >
                The Sheffield Roots (2002-2005)
            </Typography>
            <Divider sx={{mb: 1}} />
            <Typography variant='body1' sx={{mb: 2}}>
                Arctic Monkeys' journey begins in 2002 in Sheffield, England, when schoolmates Alex Turner, Jamie Cook, Andy Nicholson, and Matt Helders formed the band. Their early gigs in local venues gained attention, and the buzz around their energetic performances and witty lyrics soon caught the ears of music enthusiasts.
            </Typography>

            <Typography variant='h6' >
                "I Bet You Look Good on the Dancefloor" Breakthrough (2005)
            </Typography>
            <Divider sx={{mb: 1}} />
            <Typography variant='body1' sx={{mb: 2}}>
                The turning point came in 2005 with the release of their debut single, "I Bet You Look Good on the Dancefloor." The infectious track quickly climbed the charts, earning them the reputation as one of the fastest-rising indie bands. The single's success paved the way for their debut album.
            </Typography>
            <Typography variant='h6' >
                "Whatever People Say I Am, That's What I'm Not" (2006)
            </Typography>
            <Divider sx={{mb: 1}} />
            <Typography variant='body1' sx={{mb: 2}}>
                Arctic Monkeys' debut album, "Whatever People Say I Am, That's What I'm Not," hit the shelves in 2006 and became the fastest-selling debut album in UK chart history. The record's raw energy, sharp lyrics, and Turner's distinctive vocals solidified their status as a defining force in the mid-2000s indie rock scene.
            </Typography>
            <Typography variant='h6' >
                Favourite Worst Nightmare (2007)
            </Typography>
            <Divider sx={{mb: 1}} />
            <Typography variant='body1' sx={{mb: 2}}>
                The follow-up album, "Favourite Worst Nightmare," showcased the band's growth and experimentation while maintaining the signature sound that fans loved. It featured hits like "Fluorescent Adolescent" and further established Arctic Monkeys as a dominant force in the global music landscape.
            </Typography>
            <Typography variant='h6' >
                Humbug and the Josh Homme Collaboration (2009)
            </Typography>
            <Divider sx={{mb: 1}} />
            <Typography variant='body1' sx={{mb: 2}}>
                In a surprising move, the band worked with Josh Homme of Queens of the Stone Age on their third album, "Humbug." This collaboration marked a departure from their earlier sound, incorporating a darker and more psychedelic tone. The album reflected the band's willingness to evolve and explore new musical territories.
            </Typography>
            <Typography variant='h6' >
                Suck It and See (2011)
            </Typography>
            <Divider sx={{mb: 1}} />
            <Typography variant='body1' sx={{mb: 2}}>
                "Suck It and See" marked a return to a more accessible sound while retaining the lyrical wit and musical prowess that defined Arctic Monkeys. The album showcased a balance between the garage rock roots and the band's evolving maturity.
            </Typography>
            <Typography variant='h6' >
                AM and Mainstream Success (2013)
            </Typography>
            <Divider sx={{mb: 1}} />
            <Typography variant='body1' sx={{mb: 2}}>
                "AM," released in 2013, catapulted Arctic Monkeys into mainstream success worldwide. The album, with its sleek and seductive sound, featured hits like "Do I Wanna Know?" and "R U Mine?" The band's evolution into a more polished and versatile act demonstrated their ability to appeal to a broad audience.
            </Typography>
            <Typography variant='h6' >
                Tranquility Base Hotel & Casino (2018)
            </Typography>
            <Divider sx={{mb: 1}} />
            <Typography variant='body1' sx={{mb: 2}}>
                "Tranquility Base Hotel & Casino" marked another departure, this time into a more lounge and sci-fi-inspired territory. The album showcased Turner's continued growth as a songwriter and the band's ability to defy expectations, earning critical acclaim for their bold experimentation.
            </Typography>
            <Typography variant='h6' >
                The Long Road – Consistency and Evolution (2018-Present)
            </Typography>
            <Divider sx={{mb: 1}} />
            <Typography variant='body1' sx={{mb: 2}}>
                Arctic Monkeys continue to be a dynamic force in the music industry, blending innovation with consistency. Their journey from indie rock darlings to global superstars reflects a commitment to musical exploration and a refusal to be confined by genre boundaries. As they continue to evolve, the Arctic Monkeys' legacy remains firmly entrenched in the annals of modern rock history.
            </Typography>
        </Grid>
    );
}
import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { Box, Link, Paper, TextField, Button, Dialog, DialogTitle, DialogActions } from '@mui/material';
import { createAlbumRequest, getAlbumsRequest } from '../API/AlbumRequests';
import { Album } from '../Types/Album';
import { enqueueSnackbar } from 'notistack';
import AlbumElement from './AlbumElement';
import { isSigned } from '../API/LoginRequests';

export default function Albums() {
    const [albums, setAlbums] = React.useState<Album[]>([])



    const fetchAlbums = () => {
        getAlbumsRequest().then(function (response) {
            if (response.status >= 400 && response.status < 600) {
                enqueueSnackbar("Sorry, internal error occured", {
                    variant: 'error', anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'center'
                    },
                });
                return;
            }
            setAlbums(response.data.albums!);
        })
    }

    React.useEffect(() => {
        fetchAlbums();
    }, [])

    // create
    const [openCreate, setOpenCreate] = React.useState(false);
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const name = data.get('Name')!.toString();
        const date = data.get('date')!.toString();
        const image_url = data.get('Imege url')!.toString();
        if (name === '' || date == null || image_url === '') {
            return;

        }

        createAlbumRequest(name, date, image_url).then(function (response) {
            if (response.status >= 400 && response.status < 600) {
                enqueueSnackbar("Sorry, internal error occured", {
                    variant: 'error', anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'center'
                    },
                });
                return;
            }
            setOpenCreate(false)
            fetchAlbums();
        })
    }

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
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            {isSigned() ?
                <Button onClick={() => setOpenCreate(true)} sx={{ml: 'auto', mb: 3}}>
                    Create
                </Button> : <></>}
            <Dialog
                open={openCreate}
                onClose={() => setOpenCreate(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <Box component="form" onSubmit={handleSubmit} noValidate>
                    <DialogTitle id="alert-dialog-title">
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Name"
                            name="Name"
                            autoComplete="off"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="date"
                            type="date"
                            id="date"
                            autoComplete="off"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="imege url"
                            label="Imege url"
                            name="Imege url"
                            autoComplete="off"
                            autoFocus
                        />

                    </DialogTitle>
                    <DialogActions>
                        <Button onClick={() => setOpenCreate(false)}>Cancel</Button>
                        <Button type='submit' autoFocus>
                            Submit
                        </Button>
                    </DialogActions>
                </Box>
            </Dialog>
            <Grid container spacing={4}>
                {
                    albums?.map(a =>
                        <AlbumElement Album={a} key={a._id.$oid} RefetchAction={fetchAlbums}></AlbumElement>
                    )
                }
            </Grid>
        </Grid>
    );
}
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Dialog, DialogTitle, DialogActions, TextField } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Album } from '../Types/Album';
import { deleteAlbumRequest, updateAlbumRequest } from '../API/AlbumRequests';
import { enqueueSnackbar } from 'notistack';
import { isSigned } from '../API/LoginRequests';
import { useNavigate } from 'react-router-dom';
import { GetDateString } from '../Helpers/DateFormatHelper';


interface Props {
    Album: Album,
    RefetchAction: () => void
}

export default function AlbumElement(props: Props) {
    const navigator = useNavigate()
    // delete
    const [openDelete, setOpenDelete] = React.useState(false);
    const handleSubmitDelete = () => {
        deleteAlbumRequest(props.Album._id.$oid).then(function (response) {
            if (response.status >= 400 && response.status < 600) {
                enqueueSnackbar("Sorry, internal error occured", {
                    variant: 'error', anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'center'
                    },
                });
                return;
            }
            enqueueSnackbar("Deleted successfuly", {
                variant: 'success', anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'center'
                },
            });
            setOpenDelete(false);
            props.RefetchAction();
        })
    }


    // edit
    const [openEdit, setOpenEdit] = React.useState(false);
    const handleSubmitEdit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const name = data.get('Name')!.toString();
        const date = data.get('date')!.toString();
        const image_url = data.get('Imege url')!.toString();
        if (name === '' || date == null || image_url === '') {
            return;
        }

        updateAlbumRequest(props.Album._id.$oid, name, date, image_url).then(function (response) {
            if (response.status >= 400 && response.status < 600) {
                enqueueSnackbar("Sorry, internal error occured", {
                    variant: 'error', anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'center'
                    },
                });
                return;
            }
            setOpenEdit(false);
            props.RefetchAction();
        })
    }

    return (
        <Grid item xs={12} sm={6} md={4}>
            <Card
                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
            >
                <CardMedia
                    component="div"
                    sx={{
                        // 16:9
                        pt: '56.25%',
                    }}
                    image={props.Album.image_url}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                        {props.Album.name}
                    </Typography>
                    <Typography>
                        {GetDateString(new Date(props.Album.date))}
                    </Typography>
                </CardContent>
                <CardActions>

                <Button size="small" onClick={() => navigator("/Album/" + props.Album._id.$oid)}>View</Button>
                    {isSigned() ? <>
                        <Button size="small" onClick={() => setOpenDelete(true)}>Delete</Button>
                        <Button size="small" onClick={() => setOpenEdit(true)}>Edit</Button></>
                        : <></>}
                </CardActions>
            </Card>

            <Dialog
                open={openDelete}
                onClose={() => setOpenDelete(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Are You sure you want to delete this album?"}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={() => setOpenDelete(false)}>Cancel</Button>
                    <Button onClick={() => handleSubmitDelete()} autoFocus>Delete</Button>
                </DialogActions>
            </Dialog>


            <Dialog
                open={openEdit}
                onClose={() => setOpenEdit(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <Box component="form" onSubmit={handleSubmitEdit} noValidate>
                    <DialogTitle id="alert-dialog-title">
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Name"
                            name="Name"
                            autoComplete="off"
                            defaultValue={props.Album.name}
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
                            defaultValue={props.Album.date}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="imege url"
                            label="Imege url"
                            name="Imege url"
                            autoComplete="off"
                            defaultValue={props.Album.image_url}
                            autoFocus
                        />

                    </DialogTitle>
                    <DialogActions>
                        <Button onClick={() => setOpenEdit(false)}>Cancel</Button>
                        <Button type='submit' autoFocus>
                            Submit
                        </Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </Grid>
    );
}
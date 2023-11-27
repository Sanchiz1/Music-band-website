import { createBrowserRouter, RouterProvider, Outlet, redirect, useLocation, useNavigate } from 'react-router-dom';
import SignIn from './Sign-in';
import { Alert, Collapse, Container, IconButton } from '@mui/material';
import Header from './Header';
import Main from './Main';
import History from './History';
import About from './About';
import Albums from './Albums';
import AlbumPage from './AlbumPage';

const router = () => createBrowserRouter([
    {
        element: <Header />,
        children: [
            {
                path: "/",
                element: <Main />
            },
            {
                path: "/History",
                element: <History />
            },
            {
                path: "/About",
                element: <About />
            },
            {
                path: "/Albums",
                element: <Albums />
            },
            {
                path: "/Album/:id",
                element: <AlbumPage />
            }
        ]
    },
    {
        path: "/Sign-in",
        element: <SignIn />,
    }
])


export default function AppContent() {

    return (
        <>

            <Container maxWidth="lg">
                <RouterProvider router={router()} />
            </Container>
        </>
    );
}

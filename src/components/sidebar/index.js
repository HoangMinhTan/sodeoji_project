import { useContext, useState } from 'react';
import React from 'react'
import { Navbar, Container } from 'react-bootstrap';
import * as ROUTES from '../../constants/routes';
import UserContext from '../../context/user';
import useUser from '../../hooks/use-user';

import Dialog from '@material-ui/core/Dialog';
import MuiDialogActions from '@material-ui/core/DialogActions';
import { withStyles } from '@material-ui/core/styles';
import ChangePost from '../post/change-post';

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

export default function Sidebar() {
    const { user: loggedInUser } = useContext(UserContext);
    const { user } = useUser(loggedInUser?.uid);
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div className="bg-white h-screen w-full border-gray-primary border flex flex-col items-center sticky">
            <Navbar bg="primary" className="bg-blue-medium mx-auto w-full mt-4">
                <Container className="flex flex-col justify-center items-center">
                    <Navbar.Brand className="text-white text-xl" href={ROUTES.DASHBOARD}>ホーム</Navbar.Brand>
                </Container>
            </Navbar>
            <Navbar bg="primary" className="bg-blue-medium mx-auto w-full mt-4">
                <Container className="flex flex-col justify-center items-center">
                    <Navbar.Brand className="text-white text-xl" href={ROUTES.QUIZ}>クイズ</Navbar.Brand>
                </Container>
            </Navbar>
            <hr className="w-full mt-4" />
            {window.location.pathname.includes(ROUTES.DASHBOARD) ? (
                <>
                    <Navbar bg="primary" className="bg-blue-medium mx-auto w-full mt-4">
                        <Container className="flex flex-col justify-center items-center">
                            <Navbar.Brand>
                                <button className="text-white text-xl" onClick={handleClickOpen}>
                                    ポスト作成
                                </button></Navbar.Brand>
                            <Dialog open={open}>
                                <DialogActions>
                                    <ChangePost type="作成" handleClose={handleClose} />
                                </DialogActions>
                            </Dialog>
                        </Container>
                    </Navbar>
                    <hr className="w-full mt-4" />
                    <Navbar className="mx-auto w-full mt-2">
                        <Container className="flex flex-col justify-center items-center">
                            <Navbar.Brand className="text-xl">ポストフィルター</Navbar.Brand>
                        </Container>
                    </Navbar>
                    <Navbar bg="primary" className="bg-blue-medium mx-auto w-full mt-2">
                        <Container className="flex flex-col justify-center items-center">
                            <Navbar.Brand className="text-white text-xl" href={ROUTES.DASHBOARD}>全てのポスト</Navbar.Brand>
                        </Container>
                    </Navbar>
                    <Navbar bg="primary" className="bg-blue-medium mx-auto w-full mt-4">
                        <Container className="flex flex-col justify-center items-center">
                            <Navbar.Brand className="text-white text-xl" href={`/dashboard/post/${user?.username}`}>私のポスト</Navbar.Brand>
                        </Container>
                    </Navbar>
                    <Navbar bg="primary" className="bg-blue-medium mx-auto w-full mt-4">
                        <Container className="flex flex-col justify-center items-center">
                            <Navbar.Brand className="text-white text-xl" href={`/dashboard/save/${user?.username}`}>保存ポスト</Navbar.Brand>
                        </Container>
                    </Navbar>
                </>
            ) : window.location.pathname.includes(ROUTES.QUIZ) ? (
                <>
                <Navbar className="mx-auto w-full mt-2">
                        <Container className="flex flex-col justify-center items-center">
                            <Navbar.Brand className="text-xl">クイズフィルター</Navbar.Brand>
                        </Container>
                    </Navbar>
                    <Navbar bg="primary" className="bg-blue-medium mx-auto w-full mt-2">
                        <Container className="flex flex-col justify-center items-center">
                            <Navbar.Brand className="text-white text-xl" href={ROUTES.QUIZ_OPENNING}>利用可能</Navbar.Brand>
                        </Container>
                    </Navbar>
                    <Navbar bg="primary" className="bg-blue-medium mx-auto w-full mt-4">
                        <Container className="flex flex-col justify-center items-center">
                            <Navbar.Brand className="text-white text-xl" href={ROUTES.QUIZ_CLOSE}>利用終了</Navbar.Brand>
                        </Container>
                    </Navbar>
                    <Navbar bg="primary" className="bg-blue-medium mx-auto w-full mt-4">
                        <Container className="flex flex-col justify-center items-center">
                            <Navbar.Brand className="text-white text-xl" href={`/quiz/done/${user?.username}`}>実施済</Navbar.Brand>
                        </Container>
                    </Navbar>
                </>
            ) : null}
        </div>
    );
}
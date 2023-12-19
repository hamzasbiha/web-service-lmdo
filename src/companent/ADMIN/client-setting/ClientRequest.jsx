import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from "@mui/material/CircularProgress"
import './clientrequest.scss';
import * as icon from "@mui/icons-material";
import { getcurrentuserforservice } from '../../../redux/client/ClientSlice';
import { BaseUrl } from '../../../api/URL';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Skeleton from '../../pages/Home/ProdcutLayout/ListProdcuts/skeleton/Skeleton';

const ClientRequest = () => {
    const id = useParams().id;
    const navgation = useNavigate();
    const currentuser = useSelector(state => state.user.currentuser);
    const [load, setLoad] = useState(false);
    const [req, setReq] = useState('');  // Set an initial value
    const [showPdf, setShowPdf] = useState(false);
    const loading = useSelector(state => state.user.pending);

    const token = sessionStorage.getItem("access");
    const disaptch = useDispatch();

    useEffect(() => {
        disaptch(getcurrentuserforservice({ id: id, token: token }));
    }, []);

    const MangeClientRequest = async () => {
        // Check if req is not an empty string before making the request
        if (req.trim() !== '') {
            setLoad(true)
            console.log(req)
            const data = {
                request: req,
                email: currentuser.email,
                notifcation:'Notify'
            };
            try {
                const res = await axios.post(`${BaseUrl}/users/Request-user`, data, { headers: { Authorization: `Bearer ${token}` } });
                console.log(res.data);
                setLoad(false)
                navgation('/profile-admin/client-list');
            } catch (error) {
                console.log(error);
                setLoad(false)
            }
        }
    }


    return (
        <>
            <div className='client-req'>
                <div className="delivery-container">
                    <div className="top-delivery">
                        <h1>Demande - Client  <icon.Info /></h1>
                    </div>
                </div>
                {!load ? <div className='user-detalis'>
                    {!loading ? <div className='list-info'>
                        <span>Nom Client :  <b>{currentuser.fullname}</b> </span>
                        <span>Email :  <b>{currentuser.email}</b></span>
                        <span>tel : <b>{currentuser.fullname}</b></span>
                        <span>Nom Society: <b>{currentuser.fullname}</b></span>
                        <span>Numero Fiscal: <b>{currentuser.NumFiscal}</b></span>
                        <span>Adresse: <b>{currentuser.adresse}</b></span>
                        <span>PDF <button onClick={() => setShowPdf(!showPdf)}>{"View"}</button></span>
                        {showPdf && <div className='pdf-d'>

                            <Backdrop
                                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                                open={showPdf}

                            >
                                <button className='close-btn' onClick={() => setShowPdf(false)}>X</button>
                                <iframe src={currentuser.pdfs[0].pdffiles[0]} width="100%" height="800px" />

                            </Backdrop>
                        </div>}
                    </div> : <div><Skeleton type='card-info' /></div>}
                    <button className='req-btn acpt' onClick={() => { MangeClientRequest(); setReq('Accepted'); }}>Accept</button>
                    <button className='req-btn decli' onClick={() => { setReq('Declined'); MangeClientRequest(); }}>Decline</button>
                </div> : <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={load}

                >

                    <CircularProgress
                        sx={{
                            "--CircularProgress-size": "150px"
                        }}
                    />
                </Backdrop>}
            </div>

        </>
    )
}

export default ClientRequest

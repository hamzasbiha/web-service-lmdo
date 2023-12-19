import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import { fetchclient } from "../../../redux/admin/adminSlice";
import CommentsDisabledIcon from '@mui/icons-material/CommentsDisabled';
import MarkChatReadIcon from '@mui/icons-material/MarkChatRead';
import { Link } from "react-router-dom";
import "./client-list.scss";

const Clientlist = () => {
  const client = useSelector((state) => state.admin.clients);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "createdAt",
      headerName: "createdAt",
      width: 150,
      renderCell: (params) => {
        const createdAt = new Date(params.value);
        return new Intl.DateTimeFormat("en-US").format(createdAt);
      },
    },
    {
      field: "updatedAt",
      headerName: "updatedAt",
      width: 150,
      renderCell: (params) => {
        const updatedAt = new Date(params.value);
        return new Intl.DateTimeFormat("en-US").format(updatedAt);
      },
    },
    { field: "fullname", headerName: "FullName", width: 130 },
    { field: "email", headerName: "email", width: 130 },
    { field: "phonenumber", headerName: "phone", width: 130 },
    { field: "accountType", headerName: "accountType", width: 130 },
    {
      field: "verification",
      headerName: "verification",
      width: 130,
      renderCell: (params) => {
        const isVerified = params.row.verification;
        return isVerified === "verify" ? (
          <span className="verified">Verified</span>
        ) : (
          <span className="notverified">Not Verified</span>
        );
      },
    },
  ];
  const actionColums = [
    {
      field: "action",
      headerName: "Action",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link className="link" to={`order/${params.row.id}`}>
              <div className="viewButton">View</div>
            </Link>
          </div>
        );
      },
    }, {
      field: "action-2",
      headerName: "mangement",
      width: 150,

      renderCell: (params) => {
        const reqMode = params.row.request;
        console.log(params.row.notifcation)
        return <div className="cellAction">
          {reqMode === "Pending" ? (
            <Link className="link" to={`/profile-admin/client-request/${params.row.id}`}>
              <div className="req-btn">Client demande</div>
            </Link>
          ) : reqMode === "Accepted" ? (
            <div className="Acceptd-btn">Accepted</div>
          ) : reqMode === "Declined" ? (
            <div className="Declined-btn">Declined</div>
          ) : reqMode === "NoReq" && (
            <div className="status-btn">Pas de demande</div>
          )}


        </div>
      },
      sortComparator: (v1, v2, cellParams1, cellParams2) => {
        const orderMap = { Pending: 0, Accepted: 1, Refused: 2 };
        const order1 = orderMap[cellParams1.row.request];
        const order2 = orderMap[cellParams2.row.request];

        if (order1 < order2) {
          return -1;
        } else if (order1 > order2) {
          return 1;
        } else {
          return 0;
        }
      },


    }, {
      field: 'action-3',
      headerName: "Status",
      width: 150,
      renderCell: (params) => {
        const noti = params.row.notifcation
        return <div>
          {noti === "Notify" && <span><MarkChatReadIcon/></span>}
          {noti === "HasNotify" && <span><CommentsDisabledIcon/></span>}
        </div>
      }
    }
  ];
  return (
    <div className="client-list">
      <DataGrid
        className="data-client-grid"
        rows={client}
        columns={columns.concat(actionColums)}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
};

export default Clientlist;

import * as React from 'react';
import KaryawanService from '../services/KaryawanService';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import moment from 'moment/moment';
import RegisterModal from '../components/RegisterModal';
import UpdateModal from '../components/UpdateModal';

const KaryawanList = () => {
    const [karyawans, setKaryawans] = React.useState([]);
    const [createModal, setCreateModal] = React.useState(false);
    const [updateModal, setUpdateModal] = React.useState(false);
    const [karyawanData, setKaryawanData] = React.useState({ nama: '', alamat: '', tgllahir: '', divisi: '', status: '' });
    const [nik, setNik] = React.useState("");

    const columns = [{
        field: 'nik',
        headerName: 'NIK',
        flex: 1
    }, {
        field: 'nama',
        headerName: 'nama',
        flex: 1
    }, {
        field: 'alamat',
        headerName: 'Alamat',
        flex: 1
    }, {
        field: 'tgllahir',
        headerName: 'Tgl lahir',
        valueFormatter: (params) => moment(params.value).format('DD-MM-YYYY'),
        flex: 1
    }, {
        field: 'divisi',
        headerName: 'Divisi',
        flex: 1
    }, {
        field: 'status',
        headerName: 'Status karyawan',
        flex: 1
    }, {
        field: 'actions',
        headerName: 'Action',
        flex: 1,
        renderCell: (params) => (
            <div>
                <Button sx={{ marginRight: '4px' }} variant='contained' color='info' onClick={() => handleUpdate(params.row)}>Update</Button>
                <Button variant='contained' color='error' onClick={() => handleDelete(params.row)}>Delete</Button>
            </div>
        ),
    }]

    const KaryawanRegisterFields = [
        { name: "nama", label: "Nama", type: "text", required: true },
        { name: "alamat", label: "Alamat", type: "text", required: true },
        { name: "tgllahir", label: "Tanggal Lahir", type: "date" },
        {
            name: "divisi", label: "Divisi", type: "autocomplete", options: [
                {
                    id: "IT", name: "IT"
                }, {
                    id: "HRD", name: "HRD"
                }, {
                    id: "FINANCE", name: "FINANCE"
                }],
            required: true, labelFields: ["name"]
        },
        {
            name: "status", label: "Status Karyawan", type: "autocomplete", options: [
                {
                    id: "Tetap", name: "Tetap"
                }, {
                    id: "Kontrak", name: "Kontrak"
                }],
            required: true, labelFields: ["name"]
        }
    ];

    const KaryawanUpdateFields = [
        { name: "nama", label: "Nama", type: "text", required: true },
        { name: "alamat", label: "Alamat", type: "text", required: true },
        { name: "tgllahir", label: "Tanggal Lahir", type: "date" },
        {
            name: "divisi", label: "Divisi", type: "autocomplete", options: [
                {
                    id: "IT", name: "IT"
                }, {
                    id: "HRD", name: "HRD"
                }, {
                    id: "FINANCE", name: "FINANCE"
                }],
            required: true, labelFields: ["name"]
        },
        {
            name: "status", label: "Status Karyawan", type: "autocomplete", options: [
                {
                    id: "Tetap", name: "Tetap"
                }, {
                    id: "Kontrak", name: "Kontrak"
                }],
            required: true, labelFields: ["name"]
        }
    ];

    const createKaryawan = async (data) => {
        try {
            await KaryawanService.register(data);
            get();
        } catch (error) {
            console.error(error);
        }
        setCreateModal(false);
    }

    const updateKaryawan = async (data) => {
        try {
            await KaryawanService.update(nik, data);
            get();
        } catch (error) {
            console.error(error);
        }
        setUpdateModal(false);
    }

    const handleDelete = async (row) => {
        await KaryawanService.remove(row.nik);
        get();
    };

    React.useEffect(() => {
        get();
    }, []);

    const get = async () => {
        try {
            const res = await KaryawanService.get();
            setKaryawans(res.data.data);
        } catch (error) {
            console.error(error);
        }
    }

    const openCreateModal = () => {
        closeAllModal();
        setCreateModal(true);
    };

    const handleUpdate = (row) => {
        closeAllModal();
        setNik(row.nik)
        setKaryawanData({ nama: row.nama, alamat: row.alamat, tgllahir: moment(row.tgllahir).format('YYYY-MM-DD'), divisi: row.divisi, status: row.status })
        setUpdateModal(true)
    };

    const closeAllModal = () => {
        setCreateModal(false);
        setUpdateModal(false)
    };


    return (
        <>
            <Button onClick={openCreateModal} sx={{ marginBottom: '10px' }} variant='contained' color='success'>ADD KARYAWAN</Button>

            <DataGrid
                rows={karyawans}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 10,
                        },
                    },
                }}
                getRowId={(row) => row.nik}
                pageSizeOptions={[10]}
                disableRowSelectionOnClick
                width="100%"
            />

            <RegisterModal
                open={createModal}
                close={closeAllModal}
                fields={KaryawanRegisterFields}
                onSubmit={createKaryawan}
            />

            <UpdateModal
                open={updateModal}
                close={closeAllModal}
                fields={KaryawanUpdateFields}
                onSubmit={updateKaryawan}
                initialValues={karyawanData}
            />
        </>
    )
}

export default KaryawanList;
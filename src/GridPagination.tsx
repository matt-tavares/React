import { RouteComponentProps, Link } from '@reach/router'
import React, { useState, useEffect } from 'react';
import { GlobalStyle, SForm, STitle } from './StyledComponents'

import Spinner from 'react-bootstrap/Spinner';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import EditButton from '@material-ui/icons/Edit'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

const axios = require('axios');

// npm install react-bootstrap-table-next --save --legacy-peer-deps
// npm i --save-dev @types/react-bootstrap-table-next

// npm install react-bootstrap-table2-filter --save --legacy-peer-deps
// npm i --save-dev @types/react-bootstrap-table2-filter

// npm install react-bootstrap-table2-paginator --save --legacy-peer-deps
// npm i --save-dev @types/react-bootstrap-table2-paginator

// npm install react-bootstrap@next bootstrap@5.0.2

// npm install axios

// npm i @material-ui/icons

interface defSource extends RouteComponentProps { url: string}
type Student = {
    id_aluno: string,
    tx_nome: string,
    tx_sexo: string,
    dt_nascimento: string,
}
type GetStudentResponse = { data: Student[] }

export function GridPagination( props: defSource) {
    const [ isLoading, setIsLoading ] = useState(true)
    const [ data, setData ] = useState<any []>([])

    const paginationFactoryOptions = {
        pageStartIndex: 1,
        paginationSize: 5,
        showTotal: false,
        sizePerPageList: [
            {
                text: '5', value: 5
            },
            {
                text: '10', value: 10
            },
            {
                text: '15', value: 15
            },
            {
                text: 'All', value: data.length
            }
        ],
        withFirstAndLast: true,
        alwaysShowAllItens: true,
        firstPageText: 'Primeiro',
        prePageText: 'Anterior',
        nextPageText: 'Próximo',
        lastPageText: 'Último',
        nextPageTitle: 'Vá para o próximo',
        prePageTitle: 'Vá para o anterior',
        firstPageTitle: 'Vá para o primeiro',
        lastPageTitle: 'Vá para o último',
        hideSizePerPage: false,
        hidePageListOnlyOnePage: true,
        // onPageChange: (page, sizePerPage) => {}
        // onSizePerPageChange: (sizePerPage, page) => {}
        // paginationTotalRenderer: (from, to, size) => {...}
    }

    const colums = [
        {
            dataField: 'id_aluno',
            text: 'Matrícula',
            sort: true,
                  
        },
        {
            dataField: 'tx_nome',
            text: 'Nome',
            sort: true
        },
        {
            dataField: 'tx_sexo',
            text: 'sexo',
            sort: true
        },
        {
            dataField: 'dt_nascimento',
            text: 'Data de Nascimento',
            sort: true
        },
        {
            dataField: 'edit',
            isDummyField: true,
            text: 'Editar',
            formatter: (cellContent: any, row: any) => (
                <IconButton color='default' aria-label='add an alarm'>
                    <Link to={'/StudentEdit/edit/' + row.id_aluno}>
                        <EditButton color='action'/>
                    </Link>
                </IconButton>
            )
        },
        {
            dataField: 'delete',
            isDummyField: true,
            text: 'Apagar',
            formatter: (cell: any, row: any) => (
                <IconButton color='secondary' aria-label='add an alarm'>
                    <DeleteIcon onClick={() => {handleDeleteStudent(row.id_aluno)}} />
                </IconButton>
            )
        },
    ]

    useEffect(() => {
        async function getLines() {
            await axios.get(props.url)
            .then((res: GetStudentResponse) => {
                res.data.map(( _data ) => {
                    var year = _data.dt_nascimento.slice(0, 4)
                    var month = _data.dt_nascimento.slice(5, 7)
                    var day = _data.dt_nascimento.slice(8, 10)
                    var completeData = `${day}/${month}/${year}`
                    _data.dt_nascimento = completeData
                })
                setData(res.data)
                setIsLoading(false)
            })
            .catch((error: any) => {
                return <h1> ERRO!! {error.mensage}</h1>
            })
        }
        getLines()
    }, [isLoading])

    async function handleDeleteStudent(_id: string) {
        var _resultado = window.confirm("Você realmente quer apagar?")
        if (_resultado) {
            await axios.delete(props.url + _id)
            setIsLoading(true)
          } 
    }

    if (isLoading){
        return <div className="d-flex justify-content-center" style={{color: 'blue'}}>
                    <Spinner animation="border" variant="primary" />
                        <b> ==== C A R R E G A N D O ====</b>
                    <Spinner animation="border" variant="primary" />
               </div>
    } else {
        return <>
            <GlobalStyle />
            <SForm>
                <STitle> ALUNOS </STitle>
                <BootstrapTable
                    striped
                    bordered={true}
                    hover
                    keyField="id_aluno"
                    data={ data }
                    columns={ colums }
                    rowStyle={{fontSize: 13, textAlign: 'center', borderRadius: '25px'}}
                    headerClasses="table table-dark text-center"
                    classes="thead-light"
                    pagination={ paginationFactory(paginationFactoryOptions) }
                />
            
                <IconButton color='default' aria-label='add an alarm'>
                    <Link to={'/StudentEdit/new/'}>
                        <AddCircleOutlineIcon color='action'/>
                    </Link>
                </IconButton>
            </SForm>
            <GlobalStyle />
        </>
    }
}

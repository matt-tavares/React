import React, { useState, useEffect } from 'react';

import Spinner from 'react-bootstrap/Spinner';
import BottstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

const axios = require('axios');

// npm install react-bootstrap-table-next --save --legacy-peer-deps
// npm i --save-dev @types/react-bootstrap-table-next

// npm install react-bootstrap-table2-filter --save --legacy-peer-deps
// npm i --save-dev @types/react-bootstrap-table2-filter

// npm install react-bootstrap-table2-paginator --save --legacy-peer-deps
// npm i --save-dev @types/react-bootstrap-table2-paginator

// npm install react-bootstrap@next bootstrap@5.0.2

// npm install axios

type defSource = { url: string}
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
        pageStartIndex: 0,
        paginationSize: 5,
        showTotal: false,
        sizePerPageList: [
            {
                text: '5', value: 5
            },
            {
                text: '10', value: 10
            },
            /* {
                text: 'All', value: products.length
            } */
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
            sort: true
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
            dataField: 'dt-nascimento',
            text: 'Data de Nascimento',
            sort: true
        }
    ]

    useEffect(() => {
        async function getLines() {
            let lines: JSX.Element [] = []

            await axios.get(props.url)
            .then((res: GetStudentResponse) => {
                setData(res.data)
                setIsLoading(false)
            })
            .catch((error: any) => {
                return <h1> ERRO!! {error.mensage}</h1>
            })
        }
        getLines()
    }, [])

    if (isLoading)
    return <div> </div>
}
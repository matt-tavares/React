import React, { useState, useEffect } from "react";
import './Grid.css';

const axios = require('axios');

type defSource = { url: string}
type Student = {
    id_aluno: string,
    tx_nome: string,
    tx_sexo: string,
    dt_nascimento: string,
}
type GetStudentResponse = { data: Student[] }

export function Grid( props: defSource ){
    const { url } = props
    const [loading, setLoading] = useState(true)
    const [lines, setLines] = useState<JSX.Element[] | null>(null)
    const [initialShowLines, setInitialShowLines] = useState(0)
    const [finalShowLines, setFinalShowLines] = useState(4)

    async function getLines() {
        let lines: JSX.Element[] = []

        await axios.get( url )
        .then( (res: GetStudentResponse) => {
            console.log(res.data)
            
            function getYear( student: string ) {
                const year: string = student.substr(0, 4)
                const month: string = student.substr(5, 2)
                const day: string = student.substr(8, 2)

                return `${day} / ${month} / ${year}`
            }

            lines = res.data.map( ( student ) => 
                <tr key={student.id_aluno}>
                    <td className='line'>
                        {student.id_aluno}
                    </td>
                    <td className='line'>
                        {student.tx_nome}
                    </td>
                    <td className='line'>
                        {student.tx_sexo === 'm' ? 'Masculino' : 'Feminino'}
                    </td>
                    <td className='line'>
                        {
                            getYear(student.dt_nascimento)
                        }
                    </td>
                </tr>
            )
            setLines(lines)
            setLoading(false)
        })
    } //async function getLines() {

    useEffect( () => {
        getLines()
    }, [loading])

    //======================================================
    function getTable(table: JSX.Element[] | null) {
        if (table === null) {
            return
        } else {
            let _lines: JSX.Element[] = []
            for (let i: number = initialShowLines; i <= finalShowLines; i++) {
                /* if (table.indexOf(table[i]) === table.length) {
                    //continue
                } else { */
                    _lines.push(table[i])
                //}
            }
            return _lines
        }
    }

    function handleAdvance() {
        if (lines) {
            if( finalShowLines <= lines?.length) {
                setInitialShowLines(initialShowLines+5)
                setFinalShowLines(finalShowLines+5)
            }
        }
    }

    function handleBackOff() {
        if (lines) {
            if (initialShowLines > 0) {
                setInitialShowLines(initialShowLines-5)
                setFinalShowLines(finalShowLines-5)
            }
        }
    }
    //======================================================

    if (loading) {
        return <p>Carregando...</p>
    } else {
        return <div>
            <table className='table'>
                <caption className='title'>Tabela 'aluno' acessada no DB do localhost</caption>
                    <tr>
                        <td className='line'>
                            Id
                        </td>
                        <td className='line'
                        style={{width:100}}
                        >
                            Nome
                        </td>
                        <td className='line'>
                            Sexo
                        </td>
                        <td className='line'>
                            Data Nascimento
                        </td>
                    </tr>
                    {
                        getTable(lines)
                    }
                </table>
                <br/>
                <button onClick={handleBackOff}> {'<<'} </button>
                {' '}
                <button onClick={handleAdvance}> {'>>'} </button>
                </div>
    }
}
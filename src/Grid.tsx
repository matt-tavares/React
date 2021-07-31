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

    async function getLines() {
        let lines: JSX.Element[] = []

        await axios.get( url )
        .then( (res: GetStudentResponse) => {
            console.log(res.data)
            
            function getAno( student: string ) {
                const ano: string = student.substr(0, 4)
                const mes: string = student.substr(5, 2)
                const dia: string = student.substr(8, 2)

                return `${dia} / ${mes} / ${ano}`
            }

            lines = res.data.map( ( student ) => 
                <tr key={student.id_aluno}>
                    <td className='linha'>
                        {student.id_aluno}
                    </td>
                    <td className='linha'>
                        {student.tx_nome}
                    </td>
                    <td className='linha'>
                        {student.tx_sexo == 'm' ? 'Masculino' : 'Feminino'}
                    </td>
                    <td className='linha'>
                        {
                            getAno(student.dt_nascimento)
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
    
    if (loading) {
        return <p>Carregando...</p>
    } else {
        return <table className='tabela'>
                    <tr>
                        <td className='linha'>
                            Id
                        </td>
                        <td className='linha'>
                            Nome
                        </td>
                        <td className='linha'>
                            Sexo
                        </td>
                        <td className='linha'>
                            Data Nascimento
                        </td>
                    </tr>
                    { lines }
                </table>
    }
}
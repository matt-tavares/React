import React, { useState, useEffect } from "react";
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
            lines = res.data.map( ( student ) => 
                <tr key={student.id_aluno}>
                    <td>
                        {student.id_aluno}
                    </td>
                    <td>
                        {student.tx_nome}
                    </td>
                    <td>
                        {student.tx_sexo}
                    </td>
                    <td>
                        {student.dt_nascimento}
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
        return <table>
                    <tr>
                        <td>
                            Id
                        </td>
                        <td>
                            Nome
                        </td>
                        <td>
                            Sexo
                        </td>
                        <td>
                            Data Nascimento
                        </td>
                    </tr>
                    { lines }
                </table>
    }
}
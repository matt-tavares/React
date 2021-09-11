import React, { useState, useEffect } from 'react'
import { INPUT_FONT_SIZE, GlobalStyle, SCenter, SForm, STitle, SError, SInput, SButton, SFieldSet, SInputRadio, STextArea } from './StyledComponents'

//npm install @reach/router
//npm i --save-dev @types/reach__router
import { RouteComponentProps, Link, navigate } from '@reach/router'
const axios = require('axios')

type Student = {
    id_aluno: string,
    tx_nome: string,
    tx_sexo: string,
    dt_nascimento: string,
}
type GetStudentResponse = { data: Student[] }
type UpdateResponse = {data: { updated: boolean}}
type InsertResponse = {data: { inserted: boolean}}

interface TProps extends RouteComponentProps {
    action?: string,
    id?: string|undefined
}

export function StudentEdit(props: TProps) {

    const url = 'http://localhost:8080/aluno/'
    const { id, action } = props
    const [ txNome, setTxNome ] = useState('')
    const [ txSexo, setTxSexo ] = useState('')
    const [ dtNascimento, setDtNascimento ] = useState('')
    const [ error, setError ] = useState('')
    const [ isLoading, setIsLoading ] = useState(action === 'new' ? false : true)

    useEffect(() => {
        async function getStudent() {
            await axios.get(url + id)
            .then((res: GetStudentResponse) => {
                setTxNome(res.data[0].tx_nome)
                setTxSexo(res.data[0].tx_sexo)
                var year = res.data[0].dt_nascimento.slice(0, 4)
                var month = res.data[0].dt_nascimento.slice(5, 7)
                var day = res.data[0].dt_nascimento.slice(8, 10)
                var completeData = `${year}-${month}-${day}`
                res.data[0].dt_nascimento = completeData
                setDtNascimento(res.data[0].dt_nascimento)
                setIsLoading(false)
            })
            .catch((error: any) => {
                return <h1> ERRO!! {error.mensage}</h1>
            })
        }
        if (action === 'edit') {
            getStudent()
        }
    }, [])


    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        
        var year = dtNascimento.slice(0, 4)
        var month = dtNascimento.slice(5, 7)
        var day = dtNascimento.slice(8, 10)
        var completeData = `${year}-${month}-${day}`

        type TStudent = {
            id_aluno: string | undefined,
            tx_nome: string,
            tx_sexo: string,
            dt_nascimento: string,
        }

        let aluno: TStudent = {
            id_aluno: id,
            tx_nome: txNome,
            tx_sexo: txSexo,
            dt_nascimento: completeData,
        }

        if (action === 'new') {
            await axios.post(url, aluno)
            .then((res: InsertResponse) => {
                if (res.data.inserted){
                    alert('Aluno cadastrado!!')
                    navigate('/')
                } else
                    alert('Aluno não cadastrado!!')
            })
            .catch((error: any) => {
                setError(error.mensage)
            })
        } else if (action === 'edit') {
            await axios.put(url+id, aluno)
            .then((res: UpdateResponse) => {
                if (res.data.updated){
                    alert('Aluno atualizado!!');
                    navigate('/')
                }else
                    alert('Aluno não atualizado!!')
            })
            .catch((error: any) => {
                setError(error.mensage)
            })
        }
    }

    if ( isLoading )
        return <div>
                <p> === C A R R E G A N D O ===</p>
               </div>
    else
        return <>  
        <GlobalStyle/>

        <SForm onSubmit={ e => handleSubmit(e) }>
            <STitle> { action === 'new' ? 'Inserindo' : 'Alterando' } Aluno </STitle>
            <SError><p> {error} </p></SError>

          <label htmlFor="nome">Nome</label>
          <SInput type='text' name='nome' value={txNome} onChange={ e => setTxNome(e.target.value) }/>

          <SFieldSet>
            <legend>Sexo</legend>

            <label>
              <SInputRadio type="radio" value="f" name="gender" checked={txSexo === 'f'} onChange={ e => setTxSexo(e.target.value) } />
              Feminino
            </label>

            <label>
              <SInputRadio type="radio" value="m" name="gender" checked={txSexo === 'm'} onChange={ e => setTxSexo(e.target.value) } />
              Masculino
            </label>                 
          </SFieldSet>

          <label htmlFor="dtNascimento">Data de Nascimento</label>
          <SInput type='date' name='dtNascimento' value={dtNascimento} onChange={ e => setDtNascimento(e.target.value) }/>                     
                        
          <SButton fontColor='#9A76B3' backgroundColor='#CCF' center={true} type='submit' > {action === 'new' ? 'Cadastrar' : 'Altetar'} </SButton>                           
          
        </SForm>                       
      </>

}
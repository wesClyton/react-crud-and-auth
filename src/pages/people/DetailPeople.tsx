import { LinearProgress } from '@mui/material';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ToolsbarDetails } from '../../shared/components';
import { BasePageLayout } from '../../shared/layouts';
import { PessoasService } from '../../shared/services/api/pessoas/PessoasService';
import { VTextField } from './../../shared/forms';

export interface IFormData {
  id: number;
  name: string;
  fullName: string;
  email: string;
  cidadeId: number;
}

export const DetailPeople = () => {

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState('Cadastrar Pessoa');
  const formRef = useRef<FormHandles>(null);

  const  { id = 'nova' } = useParams<'id'>();

  useEffect(() => {
    if(id !== 'nova') {
      setIsLoading(true);
      PessoasService.getById(Number(id))
        .then((result) => {
          setIsLoading(false);
          if(result instanceof Error) {
            alert(result.message);
            navigate('/pessoas');
          } else {
            setTitle(result.name);
          }
        });
    } else {
      setTitle('Cadastrar Pessoa');
    }
  },[id]);
  
  const handleSave = (data: IFormData) => {
    
    setIsLoading(true);

    if(id === 'nova') {
      PessoasService
        .create(data)
        .then(result => {
          setIsLoading(false);
          if(result instanceof Error) {
            alert(result.message);
          } else {
            navigate(`/pessoas/${result}`);
          }
        });
    } else {
      PessoasService
        .updateById(data)
        .then(result => {
          setIsLoading(false);
          if(result instanceof Error) {
            alert(result.message);
          }
        });
    }
  };

  const handleDelete = () => {
    if(confirm('Realmente deseja apagar?')) {
      PessoasService.deleteById(Number(id))
        .then(result => {
          if(result instanceof Error) {
            alert(result.message);
          } else {
            alert('Registro apagado com sucesso');
            navigate('/pessoas');
          }
        });
    }
  };

  return (
    <BasePageLayout
      titulo={title}
      toolsBar={
        <ToolsbarDetails 
          newButtontext='Nova'
          ShowSaveAndBackButton
          showDeleteButton={ id !== 'nova' }
          showNewButton={ id !== 'nova' }

          onClickSaveButton={() => formRef.current?.submitForm()}
          onClickBackButton={() => { navigate('/pessoas'); }}
          onClickSaveAndBackButton={() => { console.log('Save and Back'); }}
          onClickNewButton={() => { navigate('/pessoas/detalhe/nova'); }}
          onClickDeleteButton={handleDelete}
        />
      }
    >

      <Form ref={formRef} onSubmit={(data) => handleSave(data)}>
        <VTextField name='id' type="hidden" />
        <VTextField name='name' label="Nome" placeholder='Primeiro nome' />
        <VTextField name='fullname' label="Nome completo" placeholder='Nome completo' />
        <VTextField name='email' label="Email" placeholder='Email' />
        <VTextField name='cidadeId' label="Cidade ID" placeholder='Cidade ID' />
      </Form>

      {isLoading && (
        <LinearProgress variant='indeterminate' />
      )}
    </BasePageLayout>
  );
};
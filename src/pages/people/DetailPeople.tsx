import { Box, Grid, LinearProgress, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ToolsbarDetails } from '../../shared/components';
import { BasePageLayout } from '../../shared/layouts';
import { PessoasService } from '../../shared/services/api/pessoas/PessoasService';
import { IVFormErrors, useVForm, VForm, VTextField } from './../../shared/forms';
import * as yup from 'yup';

export interface IFormData {
  id: number;
  name: string;
  fullname: string;
  email: string;
  cidadeId: number;
}

const formValidationSchema: yup.ObjectSchema<IFormData> = yup.object().shape({
  id: yup.number().required(),
  name: yup.string().required().min(3),
  fullname: yup.string().required().min(10),
  email: yup.string().required().email(),
  cidadeId: yup.number().required()
});

export const DetailPeople = () => {

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState('Cadastrar Pessoa');
  const { formRef, save, saveAndBack, isSaveAndBack } = useVForm();

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
            formRef.current?.setData(result);
          }
        });
    } else {
      formRef.current?.setData({
        name: '',
        fullname: '',
        email: '',
        cidadeId: ''
      });
      setTitle('Cadastrar Pessoa');
    }
  },[id]);
  
  const handleSave = (data: IFormData) => {

    formValidationSchema.validate(data, { abortEarly: false })
      .then((dataValidate) => {
        setIsLoading(true);
        if(id === 'nova') {
          PessoasService
            .create(dataValidate)
            .then(result => {
              setIsLoading(false);
              if(result instanceof Error) {
                alert(result.message);
              } else {
                if(isSaveAndBack()) {  
                  navigate('/pessoas');
                } else {
                  navigate(`/pessoas/detalhe/${result}`);
                }
              }
            });
        } else {
          PessoasService
            .updateById(dataValidate)
            .then(result => {
              setIsLoading(false);
              if(result instanceof Error) {
                alert(result.message);
              } else{
                if(isSaveAndBack()) {
                  navigate('/pessoas');
                } else {
                  navigate(`/pessoas/detalhe/${data.id}`);
                }
              }
            });
        }
      })
      .catch((errors: yup.ValidationError) => {
        const validationErrors: IVFormErrors = {};

        errors.inner.forEach(error => {
          if(!error.path) return;

          validationErrors[error.path] = error.message;
        });
      });
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

          onClickSaveButton={save}
          onClickBackButton={() => { navigate('/pessoas'); }}
          onClickSaveAndBackButton={saveAndBack}
          onClickNewButton={() => { navigate('/pessoas/detalhe/nova'); }}
          onClickDeleteButton={handleDelete}
        />
      }
    >

      <VForm ref={formRef} onSubmit={(data) => handleSave(data)}>
        <Box 
          margin={1} 
          display="flex" 
          flexDirection="column" 
          component={Paper} 
          variant="outlined"
        >
          <Grid container spacing={2} padding={2}> 

            {isLoading && (
              <Grid item xs={12}> 
                <LinearProgress variant='indeterminate' />
              </Grid>
            )}

            <Grid item xs={12} >
              <Typography variant="h6">Dados Gerais</Typography>
            </Grid>

            <VTextField name='id' type="hidden" sx={{display: 'none'}} />

            <Grid item sm={6}>
              <VTextField name='name' label="Nome"  disabled={isLoading} />
            </Grid>
           
            <Grid item sm={6}> 
              <VTextField name='fullname' label="Nome completo"  disabled={isLoading} />
            </Grid>

            <Grid item sm={6}> 
              <VTextField name='email' label="Email" disabled={isLoading} />
            </Grid>

            <Grid item sm={6}>
              <VTextField name='cidadeId' label="Cidade ID"  disabled={isLoading} />
            </Grid>
          </Grid>
        </Box>
      </VForm>

    </BasePageLayout>
  );
};
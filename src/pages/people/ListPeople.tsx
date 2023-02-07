import { LinearProgress, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ToolsbarList } from '../../shared/components';
import { useDebounce } from '../../shared/hooks';
import { BasePageLayout } from '../../shared/layouts';
import { PessoasService, TPessoasComTotalCount } from '../../shared/services/api/pessoas/PessoasService';


export const ListPeople = () => {

  const limitRows = 5;

  const [seachParams, setSearchParams] = useSearchParams();
  const [listPeople, setListPeople] = useState<TPessoasComTotalCount>();
  const [isLoading, setIsLoading] = useState(true);

  const { debounce } = useDebounce(1000);

  const search = useMemo(() => {
    return seachParams.get('busca') || '';
  }, [seachParams]);

  const page = useMemo(() => {
    return Number(seachParams.get('page') || '1');
  }, [seachParams]);

  useEffect(() => {
    setIsLoading(true);

    debounce(() => {
      PessoasService.getAll(page, limitRows, search)
        .then((result) => {
          setIsLoading(false);
          result instanceof Error ? alert(result.message) : setListPeople(result);
        });
    });

  }, [search, page, limitRows]);

  return (
    <BasePageLayout
      titulo="Listagem de pessoas"
    >
      <ToolsbarList
        showInputSearch
        newButtonText='Nova'
        searchText={search}
        changeSearchText={search => setSearchParams(
          { busca: search, pagina: '1'}, 
          { replace: true }
        )}
      />

      <TableContainer component={Paper} variant="outlined" sx={{ m: 1, width: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ações</TableCell>
              <TableCell>Nome Completo</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listPeople?.data.map(row => (
              <TableRow key={row.id}>
                <TableCell>Ações</TableCell>
                <TableCell>{row.fullname}</TableCell>
                <TableCell>{row.email}</TableCell>
              </TableRow>
            ) )}
          </TableBody>

          { listPeople?.totalCount === 0 && !isLoading && (<caption>Nenhum registro encontrado</caption>)}

          <TableFooter>
            { isLoading && (
              <TableRow>
                <TableCell colSpan={3}>
                  <LinearProgress variant='indeterminate' />
                </TableCell>
              </TableRow>
            )}

            { listPeople?.totalCount && (listPeople?.totalCount > 0 && listPeople?.totalCount > limitRows) && (
              <TableRow>
                <TableCell colSpan={3}>
                  <Pagination
                    page={page}
                    count={ Math.ceil(listPeople?.totalCount / limitRows) }
                    onChange={ 
                      (_, newPage) => setSearchParams(
                        { busca: search, page: newPage.toString() }, 
                        { replace: true }
                      )
                    }
                  />
                </TableCell>
              </TableRow>
            )}

          </TableFooter>
        </Table>
      </TableContainer>
      
    </BasePageLayout>
  );
};
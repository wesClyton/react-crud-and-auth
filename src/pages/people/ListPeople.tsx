import { Icon, IconButton, LinearProgress, MenuItem, Pagination, Paper, Select, SelectChangeEvent, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ToolsbarList } from '../../shared/components';
import { useDebounce } from '../../shared/hooks';
import { BasePageLayout } from '../../shared/layouts';
import { PessoasService, TPessoasComTotalCount } from '../../shared/services/api/pessoas/PessoasService';


export const ListPeople = () => {

  const navigate = useNavigate();

  const [seachParams, setSearchParams] = useSearchParams();
  const [listPeople, setListPeople] = useState<TPessoasComTotalCount>();
  const [isLoading, setIsLoading] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { debounce } = useDebounce(1000);

  const search = useMemo(() => {
    return seachParams.get('busca') || '';
  }, [seachParams]);

  const page = useMemo(() => {
    return Number(seachParams.get('page') || '1');
  }, [seachParams]);

  const handleChangeRowsPerPage = (event: SelectChangeEvent) => {
    setRowsPerPage(Number(event.target.value));
  };

  const handleDelete = (id: number) => {

    console.log('id:', id);

    if(confirm('Realmente deseja apagar?')) {
      PessoasService.deleteById(id).then(result => {
        if(result instanceof Error) {
          alert(result.message);
        } else {
          setListPeople(oldList => {
            if(oldList) {
              const newData = oldList?.data.filter((item) => item.id !== id);
              return {
                data: newData,
                totalCount: Number(oldList?.totalCount) - 1
              };
            }
          });
        }
      });
    }
  };

  useEffect(() => {
    setIsLoading(true);

    debounce(() => {
      PessoasService.getAll(page, rowsPerPage, search)
        .then((result) => {
          setIsLoading(false);
          result instanceof Error ? alert(result.message) : setListPeople(result);
        });
    });

  }, [search, page, rowsPerPage]);

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
              <TableCell align="right">
                <Select
                  size="small"
                  value={rowsPerPage.toString()}
                  label="Por Página"
                  onChange={handleChangeRowsPerPage}
                >
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={25}>25</MenuItem>
                  <MenuItem value={50}>50</MenuItem>
                </Select>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listPeople?.data.map(row => (
              <TableRow key={row.id}>
                <TableCell>
                  <IconButton size="small" onClick={() => handleDelete(row.id)}>
                    <Icon>delete</Icon>
                  </IconButton>

                  <IconButton size="small" onClick={ ()=> navigate(`/pessoas/detalhes/${row.id}`)}>
                    <Icon>edit</Icon>
                  </IconButton>
                </TableCell>
                <TableCell>{row.fullname}</TableCell>
                <TableCell colSpan={2}>{row.email}</TableCell>
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

            { listPeople?.totalCount && (listPeople?.totalCount > 0 && listPeople?.totalCount > rowsPerPage) && (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  <Pagination
                    page={page}
                    count={ Math.ceil(listPeople?.totalCount / rowsPerPage) }
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
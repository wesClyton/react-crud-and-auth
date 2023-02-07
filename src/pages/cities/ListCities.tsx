import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ToolsbarList } from '../../shared/components';
import { BasePageLayout } from '../../shared/layouts';


export const ListCities = () => {

  const [seachParams, setSearchParams] = useSearchParams();

  const search = useMemo(() => {
    return seachParams.get('busca') || '';
  }, [seachParams]);

  console.log(search);

  return (
    <BasePageLayout
      titulo="Listagem de cidades"
    >
      <ToolsbarList 
        showInputSearch 
        newButtonText='Nova' 
        searchText={search} 
        changeSearchText={ search => setSearchParams({ busca: search }, { replace: true }) } 
      />
    </BasePageLayout>
  );

};
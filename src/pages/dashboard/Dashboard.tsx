import { ToolsbarList } from '../../shared/components';
import { BasePageLayout } from '../../shared/layouts';


export const Dashboard = () => {

  return (
    <BasePageLayout 
      titulo="Página inicial" 
      toolsBar={(
        <ToolsbarList showInputSearch />
      )}
    >
      Dashboard
    </BasePageLayout>
  );

};
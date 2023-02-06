import { ToolsbarDetails } from '../../shared/components';
import { BasePageLayout } from '../../shared/layouts';


export const Dashboard = () => {

  return (
    <BasePageLayout 
      titulo="Página inicial" 
      toolsBar={(
        <ToolsbarDetails ShowSaveAndBackButton />
      )}
    >
      Dashboard
    </BasePageLayout>
  );

};
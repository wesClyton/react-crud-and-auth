import { Button, Divider, Icon, Paper, Skeleton, Theme, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Box } from '@mui/system';

interface IToolsbarDetailsProps {
  newButtontext?: string;

  showNewButton?: boolean;
  showBackButton?: boolean;
  showDeleteButton?: boolean;
  showSaveButton?: boolean;
  ShowSaveAndBackButton?: boolean;

  showNewSkeleton?: boolean;
  showBackSkeleton?: boolean;
  showDeleteSkeleton?: boolean;
  showSaveSkeleton?: boolean;
  ShowSaveAndBackSkeleton?: boolean;

  onClickNew?: () => void;
  onClickNewButton?: () => void;
  onClickBackButton?: () => void;
  onClickDeleteButton?: () => void;
  onClickSaveButton?: () => void;
  onClickSaveAndBackButton?: () => void;
}

export const ToolsbarDetails: React.FC<IToolsbarDetailsProps> = ({
  newButtontext = 'Novo',

  showNewButton = true,
  showBackButton = true,
  showDeleteButton = true,
  showSaveButton = true,
  ShowSaveAndBackButton = false,

  showNewSkeleton = false,
  showBackSkeleton = false,
  showDeleteSkeleton = false,
  showSaveSkeleton = false,
  ShowSaveAndBackSkeleton = false,

  onClickNewButton,
  onClickBackButton,
  onClickDeleteButton,
  onClickSaveButton,
  onClickSaveAndBackButton
}) => {

  const theme = useTheme();
  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  return (
    <Box
      display="flex"
      alignItems="center"
      marginX={1}
      padding={1}
      paddingX={2} 
      gap={1}
      height={theme.spacing(5)} 
      component={Paper}
    >
      {(showSaveButton && !showSaveSkeleton) && (
        <Button
          color="primary"
          variant="contained"
          disableElevation
          startIcon={<Icon>save</Icon>}
          onClick={onClickSaveButton}
        >
          <Typography variant="button" noWrap>
              Salvar
          </Typography>
        </Button>
      )}

      {showSaveSkeleton && (<Skeleton width={109} height={60} />)}

      {(ShowSaveAndBackButton && !ShowSaveAndBackSkeleton && !mdDown) && (
        <Button
          color="primary"
          variant="outlined"
          disableElevation
          startIcon={<Icon>save</Icon>}
          onClick={onClickSaveAndBackButton}
        >
          <Typography variant="button" noWrap>
              Salvar e voltar
          </Typography>
        </Button>
      )}

      {(ShowSaveAndBackSkeleton && !mdDown) && (<Skeleton width={180} height={60} />)}
        
      {(showDeleteButton && !showDeleteSkeleton) && (
        <Button
          color="primary"
          variant="outlined"
          disableElevation
          startIcon={<Icon>delete</Icon>}
          onClick={onClickDeleteButton}
        >
          <Typography variant="button" noWrap>
              Apagar
          </Typography>
        </Button>
      )}

      {showDeleteSkeleton && (<Skeleton width={109} height={60} />)}
       
      {(showNewButton && !showNewSkeleton && !smDown) && (
        <Button
          color="primary"
          variant="outlined"
          disableElevation
          startIcon={<Icon>add</Icon>}
          onClick={onClickNewButton}
        >
          <Typography variant="button" noWrap>
            {newButtontext}
          </Typography>
        </Button>
      )}
      
      {(showNewSkeleton && !smDown) && (<Skeleton width={109} height={60} />)}

      {(
        showBackButton && 
        (showDeleteButton || showNewButton || showSaveButton || ShowSaveAndBackButton)
      ) && (
        <Divider  variant='middle' orientation='vertical' />
      )}

      {(showBackButton && !showBackSkeleton) && (
        <Button
          color="primary"
          variant="outlined"
          disableElevation
          startIcon={<Icon>arrow_back</Icon>}
          onClick={onClickBackButton}
        >
          <Typography variant="button" noWrap>
            Voltar
          </Typography>
        </Button>
      )}

      {showBackSkeleton && (<Skeleton width={109} height={60} />)}
    </Box>
  );

};
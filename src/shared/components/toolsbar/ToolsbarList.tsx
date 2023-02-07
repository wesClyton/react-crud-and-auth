import { Box, Button, Icon, Paper, TextField, useTheme } from '@mui/material';

interface IToolsbarListProps {
  searchText?: string;
  showInputSearch?: boolean;
  changeSearchText?: (newText: string) => void;
  newButtonText?: string;
  showNewButton?: boolean;
  onClickNewButton?: () => void;
}

export const ToolsbarList = ({
  searchText = '',
  showInputSearch = false,
  changeSearchText,
  newButtonText = 'Novo',
  showNewButton = true,
  onClickNewButton,
}: IToolsbarListProps) => {

  const theme = useTheme();

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
      
      {showInputSearch && (
        <TextField 
          size="small" 
          placeholder="Pesquisar..."
          value={searchText}
          onChange={(e) => changeSearchText?.(e.target.value)}
        />
      )}

      <Box flex={1} display="flex" justifyContent="end">
        {showNewButton && (
          <Button
            color="primary"
            variant="contained"
            disableElevation
            endIcon={<Icon>add</Icon>}
            onClick={onClickNewButton}
          >
            {newButtonText}
          </Button>
        )}
      </Box>
    </Box>
  );

};
import { FormHandles } from '@unform/core';
import { useCallback, useRef } from 'react';


export const useVForm = () => {
  const formRef = useRef<FormHandles>(null);

  const isSavingAndNew = useRef(false);
  const isSavingAndBack = useRef(false);

  const handleSave = useCallback(() => {
    isSavingAndNew.current = false;
    isSavingAndBack.current = false;

    formRef.current?.submitForm();
  }, []);

  const handleSaveAndBack = useCallback(() => {
    console.log('Save and back');
    isSavingAndNew.current = false;
    isSavingAndBack.current = true;
    
    formRef.current?.submitForm();
  }, []);

  const handleSaveAndNew = useCallback(() => {
    isSavingAndNew.current = true;
    isSavingAndBack.current = false;
    
    formRef.current?.submitForm();
  }, []);

  const handleIsSaveAndNew = useCallback(() => {
    return isSavingAndNew.current;
  }, []);

  const handleIsSaveAndBack = useCallback(() => {
    return isSavingAndBack.current;
  }, []);


  return { 
    formRef,

    save: handleSave,
    saveAndBack: handleSaveAndBack,
    saveAndNew: handleSaveAndNew,
    isSaveAndNew: handleIsSaveAndNew,
    isSaveAndBack: handleIsSaveAndBack
  };
};
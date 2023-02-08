import { Api } from '../axios-config';

export interface IPessoaDetails {
  id: number;
  name: string;
  fullName: string;
  email: string;
  cidadeId: number;
}

export interface IPessoaList {
  id: number;
  name: string;
  fullname: string;
  email: string;
  cidadeId: number;
}

export type TPessoasComTotalCount = {
  data: IPessoaList[];
  totalCount: number;
}

const getAll = async (page = 1, limit = 10, filter = ''): Promise<TPessoasComTotalCount | Error> => {
  try {
    const urlRelative = `/pessoas?_page=${page}&_limit=${limit}&fullname_like=${filter}`;
    const { data, headers } = await Api.get(urlRelative);

    if(data) {
      return {
        data,
        totalCount: Number(headers['x-total-count'] || limit)
      };
    }

    return new Error('Erro ao listar os registros.');

  } catch (error) {
    console.log(error);
    return new Error((error as {message: string}).message || 'Erro ao listar os registros.');
  }
};

const getById = async (id: number):Promise<IPessoaDetails | Error> => {
  try {
    const urlRelative = `/pessoas/${id}`;
    const { data } = await Api.get(urlRelative);

    return data ?  data : new Error('Erro ao consultar o registro.');

  } catch (error) {
    console.log(error);
    return new Error((error as {message: string}).message || 'Erro ao consultar o registro.');
  }
};

const create = async (requestData: Omit<IPessoaDetails, 'id'>):Promise<number | Error> => {
  try {
    const { data } = await Api.post<IPessoaDetails>('/pessoas', requestData);

    return data ?  data.id : new Error('Erro ao cadastrar o registro.');

  } catch (error) {
    console.log(error);
    return new Error((error as {message: string}).message || 'Erro ao cadastrar o registro.');
  }
};

const updateById = async (requestData: IPessoaDetails):Promise<void | Error> => {
  try {
    await Api.put<IPessoaDetails>(`/pessoas/${requestData.id}`, requestData);
  } catch (error) {
    console.log(error);
    return new Error((error as {message: string}).message || 'Erro ao editar o registro.');
  }
};

const deleteById = async (id: number):Promise<void | Error> => {
  try {
    await Api.delete(`/pessoas/${id}`);
  } catch (error) {
    console.log(error);
    return new Error((error as {message: string}).message || 'Erro ao deletar o registro.');
  }
};

export const PessoasService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById
};
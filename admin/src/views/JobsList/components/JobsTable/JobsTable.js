import React, { useEffect, useState } from 'react';
import MaterialTable, { MTableBodyRow } from 'material-table';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';

import api from '../../../../Services/api';

import MoneyResource from '../../../../helpers/MoneyResource'

export default function JobsTable() {
  const [jobs, setJobs] = useState([]);

  const empId = localStorage.getItem('empId');

  useEffect(() => {
    api
      .get('/jobs', {
        headers: {
          Authorization: empId
        }
      })
      .then(response => {
        setJobs(response.data);
      });
  }, [empId]);

  const handleRowAdd = (newData, resolve) => {

    let errorList = []

    if(newData.title === undefined){
      errorList.push("Insira um Titulo")
    }
    if(newData.description === undefined){
      errorList.push("Insira uma descrição")
    }
    if(newData.value === undefined){
      errorList.push("Insira o valor do salário")
    }

    if(errorList.length < 1){
    api.post('/jobs', newData, {
        headers: {
          Authorization: empId
        }
      })
      .then(res => {
        let dataToAdd = [...jobs];
        dataToAdd.push(newData);
        setJobs(dataToAdd);
        window.location.reload(); 
        resolve();
      });
    }else{
      alert(errorList)
      resolve()
    }
  };

  const handleRowUpdate = (newData, oldData, resolve) => {
    api.put('/jobs', newData, {
      headers: {
        Authorization: empId
      }
    }).then(res => {
      const dataUpdate = [...jobs];
      const index = oldData.tableData.id;
      dataUpdate[index] = newData;
      setJobs([...dataUpdate]);
      resolve();
    });
  };

  const handleRowDelete = (oldData, resolve) => {
    api
      .delete('/jobs/' + oldData.id, {
        headers: {
          Authorization: empId
        }
      })
      .then(res => {
        const dataDelete = [...jobs];
        const index = oldData.tableData.id;
        dataDelete.splice(index, 1);
        setJobs([...dataDelete]);
        resolve();
      });
  };

  return (
    <MaterialTable
      title="Vagas Cadastradas"
      columns={[
        { title: 'ID', field: 'id', hidden: true },
        { title: 'Titulo', field: 'title' },
        { title: 'Descrição', field: 'description' },
        {
          title: 'Remuneração em R$',
          field: 'value',
          render: props => {
            return MoneyResource.convertIntegerToMoney(props.value)
              ? MoneyResource.convertIntegerToMoney(props.value)
              : MoneyResource.convertStringToMoney(props.value);
          },
          editComponent: props => (
            <TextField
              type="text"
              value={MoneyResource.convertStringToMoney(props.value)}
              onChange={e => props.onChange(MoneyResource.getRawValue(e.target.value))}
            />
          )
        },
      ]}
      options={{
        actionsColumnIndex: -1
      }}
      components={{
        Row: props =>
          props.data.active === 'n' ? null : <MTableBodyRow {...props} />
      }}
      icons={{
        Add: () => {
          return (
            <Button variant="outlined" color="primary">
              Nova Vaga
            </Button>
          );
        }
      }}
      localization={{
        body: {
          editRow: {
            saveTooltip: 'Salvar',
            cancelTooltip: 'Cancelar',
            deleteText: 'Tem certeza que deseja excluir esta Vaga?'
          },
          addTooltip: 'Cadastrar',
          deleteTooltip: 'Deletar',
          editTooltip: 'Editar',
          emptyDataSourceMessage: 'Nao foram encontrados registros'
        },
        header: {
          actions: 'Ações'
        },
        toolbar: {
          searchTooltip: 'Busca',
          searchPlaceholder: 'Buscar'
        },
        pagination: {
          labelRowsSelect: 'Vagas',
          firstAriaLabel: 'Primeira Página',
          firstTooltip: 'Primeira Página',
          previousAriaLabel: 'Página Anterior',
          previousTooltip: 'Página Anterior',
          nextAriaLabel: 'Próxima Página',
          nextTooltip: 'Próxima Página',
          lastAriaLabel: 'Última Página',
          lastTooltip: 'Última Página',
          labelDisplayedRows: '{from}-{to} de {count}'
        }
      }}
      data={jobs}
      editable={{
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
            handleRowUpdate(newData, oldData, resolve);
          }, 600);
          }),
        onRowAdd: newData =>
          new Promise(resolve => {
            handleRowAdd(newData, resolve);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            handleRowDelete(oldData, resolve);
          })
      }}
    />
  );
}

import React, { useState, useEffect, useRef } from 'react'
import { Calendar } from 'primereact/calendar';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Dialog } from 'primereact/dialog';
import 'primeflex/primeflex.css'
import '../index.css';
import './css/Main.css'
import * as format from '../Helpers/format-helpers'
import TransactionsDataService from '../Services/TransactionsService';
import Resume from './Resume';
import DataViewTransacion from './DataViewTransaction';
import OptionsHeader from './OptionsHeader';
import ModalTransaction from './ModalTransaction';
import { Growl } from 'primereact/growl';
import { Console, FileTransportOptions } from 'winston/lib/winston/transports';



export default function Main() {
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [visible, setVisible] = useState(false);
    const [YearMonthValue, setDate] = useState(new Date());
    const [TransactionsData, setTransactionsData] = useState([]);
    const [selectedSearch, setSelectedSearch] = useState(null);
    const [filterData, setFilterData] = useState(null);
    const [visibleModal, setvisibleModal] = useState(false);
    const [headerTitleModal, setHeaderTitleModal] = useState(null);
    const [operationModal, setOperationModal] = useState(null);

    let growl = useRef(null);

    let br = {
        firstDayOfWeek: 1,
        monthNames: ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"],
        monthNamesShort: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
        today: 'Hoje',
        clear: 'Limpar',
        dateFormat: 'yy-mm',
        weekHeader: 'Sm'
    };

    const handleVisibleModal = (visible, operation) => {
        setvisibleModal(visible);
        setOperationModal(operation);
    };

    const handleOpenModalAddTransaction = (transaction) => {
        setvisibleModal(false);
        var data = transaction.currentDate;
        var dayVar = data.getUTCDate().toString().padStart(2, "0").toString();
        var month = (data.getUTCMonth() + 1).toString().padStart(2, "0").toString();
        var yearVar = data.getUTCFullYear().toString();
        var yearMonth = `${yearVar}-${month}`;
        var yearMonthDay = `${yearVar}-${month}-${dayVar}`;

        var newTransaction = {
            description: transaction.description,
            value: transaction.value,
            category: transaction.category,
            type: transaction.type,
            year: parseInt(yearVar),
            day: parseInt(dayVar),
            month: parseInt(month),
            yearMonth: yearMonth,
            yearMonthDay: yearMonthDay
        };

        TransactionsDataService.create(newTransaction).then((response) => {
            getTransactions(filterData);
            setVisible(false);
            showSuccess();
        }).catch((e) => {
            console.log("Erro ao inserir transação")
        })
    };

    const handleRemoveTransaction = (transaction) => {
        setvisibleModal(false);
        TransactionsDataService.remove(transaction._id).then((response) => {
            getTransactions(filterData);
            setVisible(false);
            showSuccess();
        }).catch((e) => {
            console.log("Erro ao remover transação")
        })
    };


    const handleEditTransaction = (transaction) => {
        setvisibleModal(false);
        var data = transaction.currentDate;
        var dayVar = data.getUTCDate().toString().padStart(2, "0").toString();
        var month = (data.getUTCMonth() + 1).toString().padStart(2, "0").toString();
        var yearVar = data.getUTCFullYear().toString();
        var yearMonth = `${yearVar}-${month}`;
        var yearMonthDay = `${yearVar}-${month}-${dayVar}`;

        var newTransaction = {
            _id: transaction._id,
            description: transaction.description,
            value: transaction.value,
            category: transaction.category,
            type: transaction.type,
            year: parseInt(yearVar),
            day: parseInt(dayVar),
            month: parseInt(month),
            yearMonth: yearMonth,
            yearMonthDay: yearMonthDay
        };

        TransactionsDataService.update(transaction._id, newTransaction).then((response) => {
            setVisible(false);
            getTransactions(filterData);
            showSuccess();
        }).catch((e) => {
            console.log("Erro ao atualizar transação")
        })
    };

    const handleClearFilterData = () => {
        setVisible(false);

        const filter = {
            description: null,
            typeOfSearch: null
        };
        setFilterData(filter);
    };

    const handleChangeFilterData = (event, value) => {

        if (value.description == undefined || value.description == null) {
            showError("Necessário informar uma descrição para o filtro.")
            event.preventDefault();
            return;
        };

        setVisible(false);
        setFilterData(value);
    };

    const handleFilter = (filter, transactionsData) => {
        const description = filter.description;
        const typeOfSearch = filter.typeOfSearch;

        var arrayFilter;
        if (typeOfSearch == "category")
            arrayFilter = Array.from(transactionsData).filter(trans => trans.category.toLowerCase() == description.toLowerCase());
        else if (typeOfSearch == "description")
            arrayFilter = Array.from(transactionsData).filter(trans => trans.description.toLowerCase().includes(description.toLowerCase()));

        return arrayFilter;
    };

    const handleYearMonthValue = (event) => {
        setVisible(false);
        setFilterData(null);
        setDate(event.target.value);
    };

    const getTransactions = (filter) => {

        if (filter != null && filter.description != null && filter.typeOfSearch != null) {

            var formatData = format.formatYearMonth(YearMonthValue);
            TransactionsDataService.getAll(formatData).then((response) => {
                setTransactionsData(handleFilter(filter, response.data));
                setVisible(true);
            })
                .catch((e) => {
                    console.log(e);
                });
        }
        else {
            var formatData = format.formatYearMonth(YearMonthValue);
            TransactionsDataService.getAll(formatData).then((response) => {
                setTransactionsData(response.data);
                setVisible(true);
            })
                .catch((e) => {
                    console.log(e);
                });
        };
    };

    useEffect(() => {
        getTransactions(filterData);
    }, [filterData, YearMonthValue]); // Monitora alterações em allCountries e filter

    const showSuccess = () => {
        growl.current.show({ severity: 'success', summary: 'Menssagem', detail: 'Operação realizada com sucesso' });
    }

    const showError = (message) => {
        growl.current.show({ severity: 'error', summary: 'Erro', detail: message ? message : 'Erro em operação' });
    }

    const clear = () => {
        growl.current.clear();
    };

    return (
        <>
            <Growl ref={growl} />
            <h1 style={{ textAlign: 'center' }}>Controle Financeiro Pessoal</h1>
            <div style={{ margin: "20px", padding: "20px" }} >
                <div className="p-grid p-justify-center Main">
                    <Calendar locale={br} view={'month'} dateFormat="M/yy" yearNavigator={true} yearRange="2019:2021" readOnlyInput={true} value={YearMonthValue} onChange={handleYearMonthValue} showIcon={true} />
                </div>
                {!visible &&
                    <div className="Main">
                        <Dialog closable={false} showHeader={false} visible={!visible}  >
                            <div style={{ textAlign: "center", margin: "1px", padding: "1px" }}>
                                <h2>Carregando..</h2>
                                <ProgressSpinner />
                            </div>
                        </Dialog>
                    </div>
                }
                {visible &&
                    <>
                        <Resume transactions={TransactionsData} />
                        <OptionsHeader filterData={filterData} setVisibleModal={handleVisibleModal} setHeaderTitle={setHeaderTitleModal} onclickClear={handleClearFilterData} onclickFilter={handleChangeFilterData} />
                        <DataViewTransacion transactions={TransactionsData} setVisibleModal={handleVisibleModal} setHeaderTitle={setHeaderTitleModal} setSelectedTransaction={setSelectedTransaction} handleRemoveTransaction={handleRemoveTransaction} handleEditTransaction={handleEditTransaction} />
                        <ModalTransaction currentData={YearMonthValue} headerTitle={headerTitleModal} visible={visibleModal} operation={operationModal} setModalVisible={setvisibleModal} handleEditTransaction={handleEditTransaction} handleRemoveTransaction={handleRemoveTransaction} handleAddTransaction={handleOpenModalAddTransaction} selectedTransaction={selectedTransaction} />
                    </>
                }
            </div>
        </>
    )
}

const styles = {

    TransacionsDetails: {
        boxShadow: "0 6px 8px 0 rgba(0,0,0,0.2)",
        transition: "0.3s",
        marginBottom: "2px",
        marginTop: "0px",
        paddingTop: "0px",
        paddingBottom: "0px"
    },
    negative: {
        backgroundColor: '#ee6c4d'
    },
    positive: {
        backgroundColor: '#2ECC40',
    },
    saldo: {
        backgroundColor: '#00b4d8',
    },

    valueGrid: {
        justifyContent: "center",
        alignSelf: "center",
        textAlign: "right",
        fontSize: "2.3em",
        fontWeight: "bold",
        fontFamily: "monaco,Consolas,Lucida Console,monospace",

    }
};
import React from 'react'
import * as format from '../Helpers/format-helpers';
import { Button } from 'primereact/button';
import { Panel } from 'primereact/panel';
import { DataScroller } from 'primereact/datascroller'

export default function DataViewTransacion(props) {

    const transtacionsSort = () => {

        return Array.from(props.transactions).sort(function (a, b) {

            var ad = new Date(a.yearMonthDay);
            var bd = new Date(b.yearMonthDay);

            if (ad > bd) {
                return 1;
            }
            if (ad < bd) {
                return -1;
            }
            if (a.category > b.category) {
                return 1;
            }
            if (a.category < b.category) {
                return -1;
            }
            return 0;
        });
    };

    const itemTemplate = (transaction) => {
        if (!transaction) {
            return;
        }

        return renderListItem(transaction);
    };

    const handleEditTransaction = (transaction) => {
        props.setSelectedTransaction(transaction);
        props.setHeaderTitle("Edição de Transação")
        props.setVisibleModal(true, "A");
    }

    const handleRemoveTransaction = (transaction) => {
        props.setSelectedTransaction(transaction);
        props.setHeaderTitle("Remoção de Transação")
        props.setVisibleModal(true, "E");
    }

    const renderListItem = (transaction) => {
        return (
            <div className="p-col-12" style={{ ...styles.TransacionsDetails, ...isNegative(transaction.type) }}>
                <div className="p-grid" style={{ color: 'black' }} >
                    <div className="p-col-1 p-md-1 p-lg-1" style={{ fontSize: "2.3em", fontWeight: "bold", textAlign: "center",...styles.dayGrid }}>
                        <b>{transaction.day.toString().padStart(2, "0")}</b>
                    </div>
                    <div className="p-col-12 p-md-6 p-lg-5" style={{ textAlign: "left" }}>
                        <div style={{ fontSize: "1.5em", fontWeight: "bold" }}>{transaction.category}</div>
                        <div style={{ fontSize: "1em", fontWeight: "bold", color: '#293241', fontStyle: "italic" }}>{transaction.description}</div>
                    </div>
                    <div className="p-col-12 p-md-3 p-lg-4" style={{ ...styles.valueGrid }}>
                        <b>{format.formatNumberRS(transaction.value)}</b>
                    </div>
                    <div className="p-col-12 p-md-6 p-lg-2" style={{ textAlign: "center", justifyContent: "center", alignSelf: "center", }}>
                        <Button className="p-button-sucess" icon="pi pi-pencil" style={{ marginRight: "5px" }} onClick={(e) => { handleEditTransaction(transaction);  }}></Button>
                        <Button className="p-button-danger" icon="pi pi-trash" onClick={(e) => { handleRemoveTransaction(transaction); }}></Button>
                    </div>
                </div>
            </div>
        );
    };

    const renderGridItem = (transaction) => {
        return (
            <div style={{ padding: '.5em' }} className="p-col-12 p-md-3">
                <Panel header={transaction.category} style={{ textAlign: 'center' }}>
                    <div className="transaction-detail">{transaction.category} - {transaction.description}</div>
                    <Button icon="pi pi-search" onClick={(e) => {  }}></Button>
                </Panel>
            </div>
        );
    };

    const isNegative = (value) => {
        return value == "-" ? styles.negative : styles.positive;
    }

    return (
        <>
            {
                Array.from(props.transactions).length > 0
                    ? <DataScroller value={transtacionsSort()} itemTemplate={itemTemplate} rows={10} inline={true} scrollHeight={"450px"} />
                    : <div><h2>Dados não encontrados</h2></div>
            }
        </>
    )
}

const styles = {

    TransacionsDetails: {
        boxShadow: "0 6px 8px 0 rgba(0,0,0,0.2)",
        transition: "0.3s",
        marginBottom: "13px",
        marginTop: "0px",
        paddingTop: "0px",
        paddingBottom: "0px",
        borderRadius: "5px"
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

    },

    dayGrid: {
        fontFamily: "monaco,Consolas,Lucida Console,monospace",
    }
};

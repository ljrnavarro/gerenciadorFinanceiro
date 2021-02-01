import React, { useState, useEffect } from 'react';
import * as format from '../Helpers/format-helpers';
import '../index.css';
import { Card } from 'primereact/card';
import { ProgressBar } from 'primereact/progressbar';

export default function Resume(props) {

    const [receitas, setReceitas] = useState(null);
    const [despesas, setDespesas] = useState(null);
    const [saldo, setSaldo] = useState(null);
    const [lancamentos, setLancamentos] = useState(null)
    const [visible, setVisible] = useState(false)
    const [transactionsData, setTransactionData] = useState(props.transactions)

    const getTotalDespesas = () => {
        var arrayDespesaFilter = Array.from(transactionsData).filter(trans => trans.type.toString() == "-").map(item => {
            return item.value;
        });

        var total;
        if (arrayDespesaFilter.length > 0) {
            total = arrayDespesaFilter.reduce(function (prev, curr) {
                return prev + curr;
            });
        } else
            total = 0;

        setDespesas(total);
    };

    const getTotalReceitas = () => {

        var arrayReceitasFilter = Array.from(transactionsData).filter(trans => trans.type.toString() == "+").map(item => {
            return item.value;
        });

        var total;
        if (arrayReceitasFilter.length > 0) {
            var total = arrayReceitasFilter.reduce(function (prev, curr) {
                return prev + curr;
            });
        }
        else {
            total = 0;
        }
        setReceitas(total);
    };


    const getSaldo = () => {
        setSaldo(receitas - despesas);
    };

    const getTotalLancamentos = () => {
        var total = Array.from(transactionsData).length;
        setLancamentos(total);
    };

    useEffect(() => {
        getTotalDespesas();
        getSaldo();
        getTotalLancamentos();
        getTotalReceitas();
        setVisible(true);
    }, [receitas, despesas, lancamentos, saldo, visible, getTotalLancamentos, getSaldo, getTotalReceitas, getTotalDespesas]); // Monitora alterações em allCountries e filter

    return (
        (() => {
            if (!visible) {
                return (<ProgressBar mode="indeterminate" style={{ height: '6px' }}></ProgressBar>)
            }
            else {
                return (<div className="p-grid p-justify-center" style={{ textAlign: "center" }}>
                    <div className="p-col-12 p-md-6 p-sm-4 p-lg-3">
                        <Card subTitle="Lançamentos:" style={{ ...styles.CardStyle, ...styles.lancamentos }} >
                            {lancamentos}
                        </Card>
                    </div>
                    <div className="p-col-12 p-md-6 p-sm-4 p-lg-3">
                        <Card subTitle="Receitas:" style={{ ...styles.CardStyle, ...styles.positive }} >
                            {format.formatNumberRS(receitas)}
                        </Card>
                    </div>
                    <div className="p-col-12 p-md-6 p-sm-4 p-lg-3">
                        <Card subTitle="Despesas:" style={{ ...styles.CardStyle, ...styles.negative }} >
                            {format.formatNumberRS(despesas)}
                        </Card>
                    </div>
                    <div className="p-col-12 p-md-6 p-sm-4 p-lg-3">
                        <Card subTitle="Saldo:" style={{ ...styles.CardStyle, ...styles.saldo }} >
                            {format.formatNumberRS(saldo)}
                        </Card>
                    </div>
                </div>)
            }
        })()
    )
}

const styles = {
    CardStyle:
    {
        margin: "1px"
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
    lancamentos: {
        backgroundColor: '#efea5a',
    },
    divItem: {
    }
};

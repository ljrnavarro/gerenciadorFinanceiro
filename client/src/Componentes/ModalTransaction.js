import React, { useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { RadioButton } from 'primereact/radiobutton';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber'
import { Calendar } from 'primereact/calendar'
import './css/ModalTransaction.css'

export default function ModalTransaction(props) {
    const [tipoLancamento, setTipoLancamento] = useState(null);
    const [categoria, setCategoria] = useState("");
    const [descricao, setDescricao] = useState("");
    const [valor, setValor] = useState(0.0);
    const [currentDate, setCurrentDate] = useState(null);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [operation, setOperation] = useState(props.operation);
    const [identificador, setIdentificador] = useState(null);
    const [maxDate, setMaxDate] = useState(null);
    const [minDate, setMinDate] = useState(null)

    let br = {
        firstDayOfWeek: 1,
        dayNames: ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"],
        dayNamesShort: ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"],
        dayNamesMin: ["D", "S", "T", "Q", "I", "E", "A"],
        monthNames: ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"],
        monthNamesShort: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
        today: 'Hoje',
        clear: 'Limpar',
        dateFormat: 'yy-mm',
        weekHeader: 'Sm'
    };

    const dateTemplate = (date) => {
        return (
            <div style={{ fontSize: '0.9em', fontWeight: 'bold', padding: 0, margin: 0 }}>{date.day}</div>
        )
    };

    const updateDate = (props) => {

        if (props.selectedTransaction && props.operation != "I") {
            setOperation(props.operation);
            setSelectedTransaction(props.selectedTransaction);
            setCategoria(props.selectedTransaction.category);
            setDescricao(props.selectedTransaction.description);
            setValor(props.selectedTransaction.value);
            setTipoLancamento(props.selectedTransaction.type == "+" ? "Receita" : "Despesa");
            setIdentificador(props.selectedTransaction._id);

            var dateStr = props.selectedTransaction.yearMonthDay.toString();
            var date = dateStr.split("-");
            setCurrentDate(new Date(`${date[1]}/${date[2]}/${date[0]}`));
        }
        else if (props.currentData) {
            let currentDateVar = new Date();
            currentDateVar.setMonth( props.currentData.getUTCMonth());
            currentDateVar.setFullYear( props.currentData.getUTCFullYear());
            currentDateVar.setDate(1);
            setCurrentDate(currentDateVar);
            setMinDate(currentDateVar);
            setMaxDate(currentDateVar);
        }
    }

    useEffect(() => {
        setSelectedTransaction(props.selectedTransaction);
    }, [selectedTransaction, setSelectedTransaction]); // Monitora alterações em allCountries e filter

    const renderCarDialogContent = () => {

        return (
            <div>
                <div className="p-formgroup-inline p-fluid" style={{ justifyContent: "center" }}>
                    <div className="p-field-checkbox">
                        <RadioButton inputId="rdbReceita" disabled={props.operation != "I" ? true : false} name="rdbReceita" value="Receita" onChange={(e) => setTipoLancamento(e.value)} checked={tipoLancamento === 'Receita'} />
                        <label htmlFor="rdbReceita" style={{ color: "green", fontWeight: "bold" }}>Receita</label>
                    </div>
                    <div className="p-field-checkbox">
                        <RadioButton inputId="rdbDespesa" disabled={props.operation != "I" ? true : false} name="rdbDespesa" value="Despesa" onChange={(e) => setTipoLancamento(e.value)} checked={tipoLancamento === 'Despesa'} />
                        <label htmlFor="rdbDespesa" style={{ color: "red", fontWeight: "bold" }}>Despesa</label>
                    </div>
                </div>
                <div className="p-field p-grid" style={{ marginBottom: "20px" }}>
                    <span className="p-float-label">
                        <InputText className={"p-filled"} disabled={props.operation == "E" ? true : false} id="categoriaInput" type="text" size={40} value={categoria} onChange={(e) => setCategoria(e.target.value)} />
                        <label htmlFor="categoriaInput" style={{ fontSize: "1em" }}>Categoria:</label>
                    </span>
                </div>
                <div className="p-field p-grid" style={{ marginBottom: "20px" }}>
                    <span className="p-float-label">
                        <InputText className={"p-filled"} disabled={props.operation == "E" ? true : false} id="descricaoInput" type="text" size={40} value={descricao} onChange={(e) => setDescricao(e.target.value)} />
                        <label htmlFor="descricaoInput" style={{ fontSize: "1em" }}>Descrição:</label>
                    </span>
                </div>
                <div className="p-field p-grid" style={{ marginBottom: "20px" }}>
                    <span className="p-float-label">
                        <InputNumber value={valor} id="valorInput" disabled={props.operation == "E" ? true : false} onChange={(e) => setValor(e.value)} showButtons mode="currency" currency="BRL" />
                        <label htmlFor="valorInput" style={{ fontSize: "1em" }}>Valor:</label>
                    </span>
                </div>
                <div className="p-field p-grid ModalTransaction" style={{ marginBottom: "20px" }}>
                    <span className="p-float-label">
                        <Calendar locale={br} view={'date'} dateFormat="dd/mm/yy" yearNavigator={false} disabled={props.operation == "E" ? true : false} dateTemplate={dateTemplate} monthNavigator={false}  viewDate={currentDate} readOnlyInput={true} value={currentDate} showIcon={true} />
                        <label htmlFor="currentDateInput" style={{ fontSize: "1em" }}>Data:</label>
                    </span>
                </div>
            </div>
        );
    };


    const onClick = (stateMethod, position = '') => {
        stateMethod(true);
    }

    const onHide = (stateMethod) => {
        stateMethod(false);
    }

    const onShow = (event) => {
        if (props.selectedTransaction && props.operation != "I") {
            setOperation(props.operation);
            setSelectedTransaction(props.selectedTransaction);
            setCategoria(props.selectedTransaction.category);
            setDescricao(props.selectedTransaction.description);
            setValor(props.selectedTransaction.value);
            setTipoLancamento(props.selectedTransaction.type == "+" ? "Receita" : "Despesa");
            setIdentificador(props.selectedTransaction._id);

            var dateStr = props.selectedTransaction.yearMonthDay.toString();
            var date = dateStr.split("-");
            setCurrentDate(new Date(`${date[1]}/${date[2]}/${date[0]}`));
        }
        else if (props.currentData) {
            let currentDateVar = new Date();
            currentDateVar.setMonth( props.currentData.getUTCMonth());
            currentDateVar.setFullYear( props.currentData.getUTCFullYear());
            currentDateVar.setDate(1);
            setCurrentDate(currentDateVar);
            setMinDate(currentDateVar);
            setMaxDate(currentDateVar);
        }
    }

    const transactionObject = () => {
        return {
            _id: identificador,
            description: descricao,
            category: categoria,
            type: tipoLancamento == "Receita" ? "+" : "-",
            value: valor,
            currentDate: currentDate
        }
    }

    const handleSalvar = () => {
        var object = transactionObject();
        if (props.operation == "I")
            props.handleAddTransaction(object);
        else if (props.operation == "A")
            props.handleEditTransaction(object);
        else if (props.operation == "E")
            props.handleRemoveTransaction(object);
    };

    const footer = (
        <div>
            <Button label={"Confirmar"} icon="pi pi-check" onClick={handleSalvar} />
        </div>
    );

    return (
        <div>
            <Dialog header={props.headerTitle} onShow={onShow} visible={props.visible} modal={true} closable={true} onHide={() => props.setModalVisible(false)} footer={footer}>
                {renderCarDialogContent()}
            </Dialog>
        </div>
    )
}

import React, { useState } from 'react'
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { RadioButton } from 'primereact/radiobutton';
import '../index.css';

export default function OptionsHeader(props) {
    const [selectedSearchOption, setSelectedSearchOption] = useState(props.filterData != null ? props.filterData.typeOfSearch : null);
    const [descriptionOptionSearch, setDescriptionOption] = useState(props.filterData != null ? props.filterData.description : "");

    const handleClearSearch = () => {
        props.onclickClear();
    };

    const handleSetFilter = (event) => {
        const filter = {
            description: descriptionOptionSearch == "" ? null : descriptionOptionSearch,
            typeOfSearch: selectedSearchOption
        };
        props.onclickFilter(event, filter);
    };

    const handleAddClick = () => {
        props.setHeaderTitle("Nova Transação")
        props.setVisibleModal(true, "I")
    }



    return (
        <div className="p-grid" style={{ marginTop: "20px", marginBottom: "8px" }}>
            <div className="p-col-12 p-md-1 p-lg-6" >
                <Button icon="pi pi-plus" iconPos="left" label="Adicionar Transação" onClick={() => handleAddClick()} />
            </div>
            <div className="p-col-12 p-md-1 p-lg-6" style={{ textAlign: "right" }}>
                <div className="p-grid" style={{ textAlign: "right" }}>
                    <div className="p-col-6 p-md-12 p-lg-6" style={{ fontSize: "0.8em" }} >
                        <div>
                            <RadioButton inputId="catInputSearch" name="category" value="category" onChange={(e) => setSelectedSearchOption(e.value)} checked={selectedSearchOption === 'category'} />
                            <label htmlFor="catInputSearch" className="p-radiobutton-label">Categoria</label>
                        </div>
                        <div>
                            <RadioButton inputId="descInputSearch" name="description" value="description" onChange={(e) => setSelectedSearchOption(e.value)} checked={selectedSearchOption === 'description'} />
                            <label htmlFor="descInputSearch" className="p-radiobutton-label">Descrição</label>
                        </div>
                    </div>
                    <div className="p-col-12 p-md-12 p-lg-6" style={{ textAlign: "left", alignItems: "center", justifyContent: "center", alignSelf: "center" }}>
                        <div style={{whiteSpace: "nowrap" , overflow:"hidden"}}>
                            <InputText style={{width:'157px'}} placeholder="dado para pesquisa..." value={descriptionOptionSearch} size={20} onChange={(e) => setDescriptionOption(e.target.value)} />
                            <Button icon="pi pi-search" className="p-button-warning" onClick={handleSetFilter} />
                            <Button icon="pi pi-refresh" className="p-button-danger" onClick={handleClearSearch} />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}



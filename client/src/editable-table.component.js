
import React from "react";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";
import SelectField from "material-ui/SelectField";
import DatePicker from "material-ui/DatePicker";
import Toggle from "material-ui/Toggle";
import MenuItem from "material-ui/MenuItem";
import AddIcon from 'material-ui/svg-icons/content/add';
import DeleteIcon from 'material-ui/svg-icons/content/clear';
import PromoteIcon from 'material-ui/svg-icons/navigation/arrow-drop-up';
import DemoteIcon from 'material-ui/svg-icons/navigation/arrow-drop-down';
import $ from "jquery";


class MuiEditableTable extends React.Component {

    constructor(props) {
        super(props);

// add more
        this.state = {
            rowData: [],
            colSpec: [],
            reorderable: false,
            editable: false,
            mode: "landscape",
            onChange: function () {
            }
        };

        this.onFieldChange = this.onFieldChange.bind(this);
        this.onAddRow = this.onAddRow.bind(this);
        this.onDeleteRow = this.onDeleteRow.bind(this);
        this.onReorderRow = this.onReorderRow.bind(this);
    }

    componentDidMount() {
        this.setState(
            {
                rowData: $.extend(true, [], this.props.rowData),
                colSpec: this.props.colSpec,
                reorderable: this.props.reorderable || false,
                editable: this.props.editable || false,
                mode: this.props.mode || "landscape",
                onChange: this.props.onChange
            }
        );
    }

    render() {
        return (
            <div className="wrapper" style={{width: "1203%"}}>
                <div className="mui-editable-table"
                style={{width: "100%"}}
                //style={editableTableStyle}
                >
                    {this.renderHeader()}

                    {this.state.rowData.map((dataRow, i) => (
                        this.renderRow(dataRow, i)
                    ))}
                    <input
                        type="hidden"
                        id="mui-editable-table-count"
                        ref="mui-editable-table-count"
                        value={this.state.rowData.length}
                        readOnly="readOnly"
                    />
                </div>
            </div>
        )
    }

    renderHeader() {
        const headerRowStyle = {
            width: "100%",
            minWidth: 320,
            justifyContent: "flex-start",
            display: "flex",
            flexFlow: "row nowrap",
            flexShrink: 2,
            border: "0",
            height: "100%",
            color: "rgb(158, 158, 158)",
            fontSize: "12px",
            borderBottom: "1px solid #ccc",
            paddingTop: "10px",
            paddingLeft: "24px",
            textAlign: "left"
        };

        return (
            <div className="mui-editable-table-row header-row"
            style={headerRowStyle}
            >
                {this.state.colSpec.map((col) => (
                    <div
                        className={"row-cell header-cell " + col.fieldName}
                        key={col.fieldName}
                        style={{width: col.width}}
                    >
                        {col.title}
                    </div>
                ))}
                { this.props.editable ?
                <div className={"row-cell header-cell action"} >
                    {this.iconButton('', 'add', this.onAddRow(), <AddIcon />)}
                </div>
                :
                false }
            </div>
        )
    }

    renderRow(dataRow, index) {
        const dataRowStyle = {
            display: "flex",
            flexFlow: "row nowrap",
            alignItems: "center",
            justifyContent: "flex-start",
            flexShrink: 2,
            border: "0",
            width: "100%",
            minWidth: 320,
            height: "100%",
            color: "rgb(158, 158, 158)",
            fontSize: "12px",
            paddingTop: "10px",
            paddingLeft: "24px",
            textAlign: "left",
            borderBottom: "1px solid rgb(224, 224, 224)"
        };

        return (
            <div className="mui-editable-table-row" key={index} style={dataRowStyle}>
                {this.state.colSpec.map((col) => (
                    <div
                        className={"cell " + col.fieldName}
                        key={col.fieldName + index}
                        style={{width: col.width}}
                    >
                        {this.renderInputField(col, index, dataRow)}
                    </div>
                ))}
                {this.renderRowButtons(index)}
            </div>
        )
    }

    renderInputField(column, index, rowData) {
        if (column.isReadOnly && column.isReadOnly(rowData)){
            return (<div style={{width: column.width}}></div>)
        }

        if (column.inputType === "TextField") {
            return (
                <TextField
                    ref={column.fieldName + index}
                    id={column.fieldName + index}
                    style={{width: "100%"}}
                    value={column.fieldName in rowData ? rowData[column.fieldName] : ''}
                    multiLine={true}
                    disabled={!this.props.editable}
                    underlineDisabledStyle={{display: "none"}}
                    onChange={this.onFieldChange(index, column.fieldName)}
                />
            )
        } else if (column.inputType === "DatePicker") {
            return (
                <DatePicker
                    ref={column.fieldName + index}
                    id={column.fieldName + index}
                    style={{width: "100%"}}
                    value={column.fieldName in rowData ? rowData[column.fieldName] : new Date() }
                    formatDate={ column.formatDate }
                    firstDayOfWeek={this.props.firstDayOfWeek || 0}
                    mode={this.state.mode}
                    autoOk={this.props.autoOk || true}
                    disabled={!this.props.editable}
                    underlineDisabledStyle={{display: "none"}}
                    onChange={this.onFieldChange(index, column.fieldName)}
                />
            )
        } else if (column.inputType === "SelectField") {
            return (
                <SelectField
                    ref={column.fieldName + index}
                    id={column.fieldName + index}
                    style={{width: "100%"}}
                    value={column.fieldName in rowData ? rowData[column.fieldName] : ''}
                    disabled={!this.props.editable}
                    onChange={this.onFieldChange(index, column.fieldName)}
                >
                    {column.selectOptions.map((option) => (
                        this.createSelectOption(option)
                    ))}
                </SelectField>
            )
        } else if (column.inputType === "Toggle") {
            return (
                <Toggle
                    ref={column.fieldName + index}
                    id={column.fieldName + index}
                    style={{width: "100%"}}
                    defaultToggled={column.fieldName in rowData ? rowData[column.fieldName] : false}
                    disabled={!this.props.editable}
                    onToggle={this.onFieldChange(index, column.fieldName)}
                />
            )
        }
        throw new Error("Input field type " + column.inputType + " not supported");
    }

    createSelectOption(option) {
        const key = option.key ? option.key : option;
        const value = option.value ? option.value : option;

        return (<MenuItem value={value} primaryText={value} key={key}/>);
    }

    renderRowButtons(index) {
        if (this.props.editable) {
        let buttons = [
            this.iconButton(index, 'delete', this.onDeleteRow(index), <DeleteIcon />)
        ];

        if (this.state.reorderable) {
            if (index < (this.state.rowData.length - 1) && this.state.rowData.length > 1) {
                buttons.push(
                    this.iconButton(index, 'demote', this.onReorderRow(index, +1), <DemoteIcon  />)
                )
            }
            if (index > 0) {
                buttons.push(
                    this.iconButton(index, 'promote', this.onReorderRow(index, -1), <PromoteIcon/>)
                )
            }
        }

        return (
            <div>
                {buttons}
            </div>
        )
    } else {
        return;
    }
    }

    iconButton(rowKey, action, clickEvent, muiIcon) {
        return (
            <div className="cell action" key={"action" + action + rowKey} style={{width: "100%", display: "inline"}}>

                <FlatButton
                    className={"action-button " + action + "-row-button" + rowKey}
                    primary={true}
                    onClick={clickEvent}
                    style={{width: "100%"}}
                    icon={muiIcon}
                />
            </div>
        )
    }

    onAddRow() {
        const self = this;
        return function () {
            let tempDataRow = $.extend(true, [], self.state.rowData);

            let newRow = {};
            self.state.colSpec.map((column) => (
                newRow[column.fieldName] = column.defaultValue || ''
            ));

            tempDataRow.push(newRow);

            self.setState({rowData: tempDataRow});
            self.state.onChange(tempDataRow)
        }
    }

    onDeleteRow(rowId) {
        const self = this;
        return function () {
            let tempDataRow = $.extend(true, [], self.state.rowData);

            tempDataRow.splice(rowId, 1);

            self.setState({rowData: tempDataRow});
            self.state.onChange(tempDataRow)
        }
    }

    onReorderRow(rowId, direction) {
        const self = this;
        return function () {
            let tempDataRow = $.extend(true, [], self.state.rowData);

            let oldIndex = rowId;
            let newIndex = rowId + direction;

            tempDataRow.splice(newIndex, 0, tempDataRow.splice(oldIndex, 1)[0]);

            self.setState({rowData: tempDataRow});
            self.state.onChange(tempDataRow)
        }
    }

    onFieldChange(rowId, fieldName) {
        const self = this;
        return function (event, textFieldValue, selectFieldValue) {
            let newValue = selectFieldValue ? selectFieldValue : textFieldValue;
            let tempDataRow = $.extend(true, [], self.state.rowData);

            tempDataRow[rowId][fieldName] = newValue;

            self.setState({rowData: tempDataRow});
            self.state.onChange(tempDataRow)
        }
    }
}

export default MuiEditableTable;
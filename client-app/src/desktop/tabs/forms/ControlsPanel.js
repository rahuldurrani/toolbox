/*
 * This file belongs to Hoist, an application development toolkit
 * developed by Extremely Heavy Industries (www.xh.io | info@xh.io)
 *
 * Copyright © 2018 Extremely Heavy Industries Inc.
 */
import {Component} from 'react';
import {HoistComponent, XH} from '@xh/hoist/core';
import {Icon} from '@xh/hoist/icon';
import {hframe, hbox, div, box} from '@xh/hoist/cmp/layout';
import {panel} from '@xh/hoist/desktop/cmp/panel';
import {button} from '@xh/hoist/desktop/cmp/button';
import moment from 'moment';
import {fmtDateTime, fmtThousands} from '@xh/hoist/format';
import {
    formField,
    checkbox,
    dateInput,
    textInput,
    textArea,
    numberInput,
    radioInput,
    slider,
    select,
    switchInput,
    jsonInput,
    buttonGroupInput
} from '@xh/hoist/desktop/cmp/form';

import {usStates, restaurants} from '../../../core/data';
import {wrapper} from '../../common';
import {ControlsPanelModel} from './ControlsPanelModel';
import './ControlsPanel.scss';

@HoistComponent
export class ControlsPanel extends Component {

    model = new ControlsPanelModel();

    render() {
        const {row} = this;

        return wrapper({
            item: panel({
                title: 'Controls',
                className: 'toolbox-controls-panel',
                icon: Icon.edit(),
                width: '90%',
                height: '90%',
                item: hframe({
                    items: [
                        panel({
                            className: 'toolbox-controls-panel__column',
                            items: [
                                row({
                                    label: 'TextInput',
                                    field: 'text1',
                                    info: 'autoFocus',
                                    item: textInput({
                                        autoFocus: true
                                    })
                                }),
                                row({
                                    label: 'TextInput',
                                    field: 'text2',
                                    info: 'placeholder, leftIcon, enableClear',
                                    item: textInput({
                                        placeholder: 'user@company.com',
                                        round: true,
                                        leftIcon: Icon.mail(),
                                        enableClear: true

                                    })
                                }),
                                row({
                                    label: 'TextInput',
                                    field: 'text3',
                                    info: 'type:password, commitOnChange, selectOnFocus',
                                    item: textInput({
                                        type: 'password',
                                        commitOnChange: true,
                                        selectOnFocus: true
                                    })
                                }),
                                row({
                                    label: 'TextArea',
                                    field: 'text4',
                                    info: 'fill, placeholder, selectOnFocus',
                                    item: textArea({
                                        fill: true,
                                        placeholder: 'Tell us your thoughts...',
                                        selectOnFocus: true
                                    })
                                }),
                                row({
                                    label: 'JSONInput',
                                    field: 'text5',
                                    item: jsonInput({
                                        width: 300,
                                        height: 100
                                    })
                                })
                            ]
                        }),
                        panel({
                            className: 'toolbox-controls-panel__column',
                            items: [
                                row({
                                    label: 'NumberInput',
                                    field: 'number1',
                                    info: 'stepSizes',
                                    item: numberInput({
                                        fill: true,
                                        stepSize: 1000,
                                        majorStepSize: 100000,
                                        minorStepSize: 100
                                    })
                                }),
                                row({
                                    label: 'NumberInput',
                                    field: 'number2',
                                    info: 'enableShorthandUnits, displayWithCommas, selectOnFocus',
                                    item: numberInput({
                                        fill: true,
                                        enableShorthandUnits: true,
                                        displayWithCommas: true,
                                        selectOnFocus: true
                                    })
                                }),
                                row({
                                    label: 'Slider',
                                    field: 'number3',
                                    info: 'max, min, stepSizes',
                                    item: slider({
                                        max: 100,
                                        min: 0,
                                        labelStepSize: 25,
                                        stepSize: 1
                                    })
                                }),
                                row({
                                    label: 'Slider',
                                    field: 'range1',
                                    info: 'multi-value, labelRenderer',
                                    item: slider({
                                        min: 50000,
                                        max: 150000,
                                        labelStepSize: 25000,
                                        stepSize: 1000,
                                        labelRenderer: v => `$${fmtThousands(v, {
                                            label: true,
                                            precision: 0,
                                            labelCls: null
                                        })}`
                                    })
                                }),
                                row({
                                    label: 'DateInput',
                                    field: 'date1',
                                    info: 'leftIcon, minDate, maxDate, textAlign',
                                    fmtVal: v => fmtDateTime(v),
                                    item: dateInput({
                                        commitOnChange: true,
                                        leftIcon: Icon.calendar(),
                                        placeholder: 'YYYY-MM-DD',
                                        minDate: moment().subtract(5, 'weeks').toDate(),
                                        maxDate: moment().add(2, 'weeks').toDate(),
                                        textAlign: 'right',
                                        width: 150
                                    })
                                }),
                                row({
                                    label: 'DateInput',
                                    field: 'date2',
                                    info: 'timePrecision',
                                    fmtVal: v => fmtDateTime(v),
                                    item: dateInput({
                                        commitOnChange: true,
                                        showActionsBar: true,
                                        timePrecision: 'minute',
                                        timePickerProps: {useAmPm: true}
                                    })
                                })
                            ]
                        }),
                        panel({
                            className: 'toolbox-controls-panel__column',
                            items: [
                                row({
                                    label: 'Select',
                                    field: 'option2',
                                    item: select({
                                        options: restaurants,
                                        placeholder: 'Search restaurants...'
                                    })
                                }),
                                row({
                                    label: 'Select',
                                    field: 'option1',
                                    info: 'enableFilter:false',
                                    item: select({
                                        options: usStates,
                                        width: 160,
                                        enableFilter: false,
                                        placeholder: 'Select a state...'
                                    })
                                }),
                                row({
                                    label: 'Select',
                                    field: 'option3',
                                    info: 'custom fields, renderer, async search',
                                    item: select({
                                        valueField: 'id',
                                        labelField: 'name',
                                        queryFn: this.queryCompaniesAsync,
                                        optionRenderer: this.renderCompanyOption,
                                        placeholder: 'Search companies...',
                                        width: '90%'
                                    })
                                }),
                                row({
                                    label: 'Select',
                                    field: 'option5',
                                    info: 'enableMulti',
                                    item: select({
                                        options: usStates,
                                        enableMulti: true,
                                        width: '90%',
                                        placeholder: 'Select state(s)...'
                                    })
                                }),
                                row({
                                    label: 'Checkbox',
                                    field: 'bool1',
                                    item: checkbox({
                                        label: 'enabled'
                                    })
                                }),
                                row({
                                    label: 'SwitchInput',
                                    field: 'bool2',
                                    item: switchInput({
                                        label: 'Enabled:',
                                        labelAlign: 'left'
                                    })
                                }),
                                row({
                                    label: 'ButtonGroupInput',
                                    field: 'buttonGroup1',
                                    item: buttonGroupInput(
                                        button({
                                            icon: Icon.chartLine(),
                                            text: 'Button 1',
                                            value: 'button1'
                                        }),
                                        button({
                                            icon: Icon.gear(),
                                            text: 'Button 2',
                                            value: 'button2'
                                        }),
                                        button({
                                            icon: Icon.skull(),
                                            text: 'Button 3',
                                            value: 'button3'
                                        })
                                    )
                                }),
                                row({
                                    label: 'RadioInput',
                                    field: 'option6',
                                    info: 'inline, disabled option',
                                    item: radioInput({
                                        inline: true,
                                        options: ['Steak', 'Chicken', {label: 'Fish', value: 'Fish', disabled: true}]
                                    })
                                })
                            ]
                        })
                    ]
                })
            })
        });
    }

    row = ({label, field, item, info, fmtVal}) => {
        const {model} = this;

        let displayVal = model[field];
        if (displayVal == null) {
            displayVal = 'null';
        } else {
            displayVal = fmtVal ? fmtVal(displayVal) : displayVal.toString();
            if (displayVal.trim() === '') {
                displayVal = displayVal.length ? '[Blank String]' : '[Empty String]';
            }
        }

        return formField({
            item,
            label,
            field,
            model,
            labelInfo: `${displayVal}`,
            helperText: info
        });
    };

    queryCompaniesAsync = (query) => {
        return XH.companyService.queryAsync(query)
            .wait(400)
            .then(hits => hits);
    };

    renderCompanyOption = (opt) => {
        return hbox({
            items: [
                box({
                    item: opt.isActive ?
                        Icon.checkCircle({className: 'xh-green'}) :
                        Icon.x({className: 'xh-red'}),
                    width: 32,
                    paddingLeft: 8
                }),
                div(
                    opt.name,
                    div({
                        className: 'xh-text-color-muted xh-font-size-small',
                        item: `${opt.city} · ID: ${opt.id}`
                    })
                )
            ],
            alignItems: 'center'
        });
    }
}

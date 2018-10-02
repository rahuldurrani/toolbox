/*
 * This file belongs to Hoist, an application development toolkit
 * developed by Extremely Heavy Industries (www.xh.io | info@xh.io)
 *
 * Copyright © 2018 Extremely Heavy Industries Inc.
 */

import {HoistModel} from '@xh/hoist/core';
import {computed, bindable} from '@xh/hoist/mobx';
import {toUpper, toLower} from 'lodash';
import { Position } from "@blueprintjs/core";
import {withDefault} from '@xh/hoist/utils/js';
import {field, FieldSupport, lengthIs, required} from '@xh/hoist/field';
import {PendingTaskModel} from '@xh/hoist/utils/async';
import {
    jsonInput,
    textArea
} from '@xh/hoist/desktop/cmp/form';



@FieldSupport
@HoistModel
export class ToastModel {

    validateButtonTask = new PendingTaskModel();

    INTENT_OPTIONS = [
        {value: null, label: 'None'},
        {value: 'primary', label: 'Primary'},
        {value: 'success', label: 'Success'},
        {value: 'warning', label: 'Warning'},
        {value: 'danger', label: 'Danger'}
    ];
    SIDE = [
        {value: null, label: 'Empty'},
        {value: 'LEFT', label: 'Left'},
        {value: 'RIGHT', label: 'Right'}
        ];
    ALIGNMENT = [
        {value: null, label: 'Empty'},
        {value: 'TOP', label: 'Top'},
        {value: 'BOTTOM', label: 'Bottom'}
        ];
    POSITION_MODE = [
        {value: null, label: 'Manual'},
        {value: 'auto', label: 'Auto'},
        {value: 'auto-start', label: 'Auto-start'},
        {value: 'auto-end', label: 'Auto-end'}
        ];


    @field(required, lengthIs({max: 100}))
    message;

    @field('Intent')
    intent;

    @field('Timeout')
    timeout;

    @field('Mode')
    position;

    @field('Side')
    side;

    @field('Alignment')
    alignment;

    constructor() {
        this.initFields({
            message: 'This is an XH toast.',
            position: null,
            timeout: null,
            intent: null
        });
    }

    @computed
    get fnString() {
        const {message, timeout, intent} = this;
        const position = this.bpPosition(this.position);
        const opts = {};
        Object.assign(
            opts,
            {message},
            timeout ? {timeout} : null,
            intent ? {intent} : null,
            position ? {position} : null
        );
        return `XH.toast(${JSON.stringify(opts)})`;
    }

    taCmp = textArea({
        value: this.fnString
    })

    bpPosition(position) {
        if (!position) {
            const side = withDefault(this.side);
            const alignment = withDefault(this.alignment);
            const positionKey = (side && alignment) ?`${side}_${alignment}` : side || alignment;
            return Position[positionKey];
        } else {
            return withDefault(position)
        }
    }

    onResetClick() {
        this.resetFields();
    }
}
/*
 * This file belongs to Hoist, an application development toolkit
 * developed by Extremely Heavy Industries (www.xh.io | info@xh.io)
 *
 * Copyright © 2018 Extremely Heavy Industries Inc.
 */
import {Component} from 'react';
import {HoistComponent} from '@xh/hoist/core';
import {tabContainer, TabContainerModel} from '@xh/hoist/desktop/cmp/tab';

import {NumberFormatsPanel} from './tabs/NumberFormatsPanel';
import {DateFormatsPanel} from './tabs/DateFormatsPanel';

@HoistComponent
export class FormatsTab extends Component {

    model = new TabContainerModel({
        route: 'default.formats',
        tabs: [
            {id: 'number', title: 'Number', content: NumberFormatsPanel},
            {id: 'date', title: 'Date', content: DateFormatsPanel}
        ]
    });

    async loadAsync() {
        this.model.requestRefresh();
    }

    render() {
        return tabContainer({
            model: this.model,
            switcherPosition: 'left',
            className: 'toolbox-tab'
        });
    }
}

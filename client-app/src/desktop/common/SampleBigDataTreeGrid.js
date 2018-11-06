/*
 * This file belongs to Hoist, an application development toolkit
 * developed by Extremely Heavy Industries (www.xh.io | info@xh.io)
 *
 * Copyright © 2018 Extremely Heavy Industries Inc.
 */
import {Component} from 'react';
import {elemFactory, HoistComponent, LayoutSupport} from '@xh/hoist/core';
import {wait} from '@xh/hoist/promise';
import {filler} from '@xh/hoist/cmp/layout';
import {grid, GridModel, colChooserButton} from '@xh/hoist/cmp/grid';
import {storeFilterField, storeCountLabel} from '@xh/hoist/desktop/cmp/store';
import {panel} from '@xh/hoist/desktop/cmp/panel';
import {exportButton, refreshButton} from '@xh/hoist/desktop/cmp/button';
import {switchInput} from '@xh/hoist/desktop/cmp/form';
import {toolbarSep} from '@xh/hoist/desktop/cmp/toolbar';
import {toolbar} from '@xh/hoist/desktop/cmp/toolbar';
import {emptyFlexCol} from '@xh/hoist/cmp/grid/columns';
import {LocalStore} from '@xh/hoist/data';
import {numberRenderer} from '@xh/hoist/format';
import {PendingTaskModel} from '@xh/hoist/utils/async';

import {sampleTreeData} from '../../core/data';

@HoistComponent
@LayoutSupport
class SampleBigDataTreeGrid extends Component {

    loadModel = new PendingTaskModel();

    localModel = new GridModel({
        treeMode: true,
        store: new LocalStore({
            fields: ['id', 'name', 'pnl']
        }),
        sortBy: 'pnl|desc|abs',
        emptyText: 'No records found...',
        enableColChooser: true,
        enableExport: true,
        columns: [
            {
                headerName: 'Name',
                width: 200,
                field: 'name',
                isTreeColumn: true
            },
            {
                headerName: 'P&L',
                field: 'pnl',
                align: 'right',
                width: 130,
                absSort: true,
                agOptions: {
                    aggFunc: 'sum'
                },
                renderer: numberRenderer({
                    precision: 0,
                    ledger: true,
                    colorSpec: true,
                    tooltip: true
                })
            },
            {...emptyFlexCol}
        ]
    });

    constructor(props) {
        super(props);
        this.loadAsync();
    }

    render() {
        const {model} = this;

        return panel({
            item: grid({model}),
            mask: this.loadModel,
            bbar: toolbar(
                refreshButton({model: this}),
                toolbarSep(),
                switchInput({
                    model,
                    field: 'compact',
                    label: 'Compact mode:',
                    labelAlign: 'left'
                }),
                filler(),
                storeCountLabel({gridModel: model, units: 'companies'}),
                storeFilterField({gridModel: model}),
                colChooserButton({gridModel: model}),
                exportButton({model, exportType: 'excel'})
            ),
            className: this.getClassName(),
            ...this.getLayoutProps()
        });
    }

    //------------------------
    // Implementation
    //------------------------
    loadAsync() {
        wait(250)
            .then(() => this.model.loadData(sampleTreeData))
            .linkTo(this.loadModel);
    }
}
export const sampleBigDataTreeGrid = elemFactory(SampleBigDataTreeGrid);

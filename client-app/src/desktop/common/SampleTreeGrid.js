/*
 * This file belongs to Hoist, an application development toolkit
 * developed by Extremely Heavy Industries (www.xh.io | info@xh.io)
 *
 * Copyright © 2018 Extremely Heavy Industries Inc.
 */
import {Component} from 'react';
import {elemFactory, HoistComponent, LayoutSupport} from '@xh/hoist/core';
import {wait} from '@xh/hoist/promise';
import {box, filler} from '@xh/hoist/cmp/layout';
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
import {bindable} from '@xh/hoist/mobx';
import {dimensionChooser} from '@xh/hoist/desktop/cmp/dimensionchooser';
import {HoistModel} from '@xh/hoist/core';

import {sampleTreeData} from '../../core/data';

@HoistComponent
@LayoutSupport
class SampleTreeGrid extends Component {

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

    treeModel = new treeGridModel();

    constructor(props) {
        super(props);
        this.loadAsync();

        this.addReaction({
            track: () => [this.groupBy],
            run: () => {console.log(this.groupBy)}
        });
    }

    render() {
        const {model} = this;
        console.log(this.treeModel.groupBy);
        return panel({
            className: this.getClassName(),
            ...this.getLayoutProps(),
            item: grid({model}),
            mask: this.loadModel,
            tbar: this.renderTbar(),
            bbar: toolbar({
                omit: this.props.omitToolbar,
                items: [
                    storeFilterField({gridModel: model}),
                    storeCountLabel({
                        gridModel: model,
                        units: 'companies'
                    }),
                    filler(),
                    box('Compact mode:'),
                    switchInput({
                        field: 'compact',
                        model
                    }),
                    toolbarSep(),
                    colChooserButton({gridModel: model}),
                    exportButton({model, exportType: 'excel'}),
                    refreshButton({model: this})
                ]
            })
        });
    }

    renderTbar() {
        const {treeModel} = this;
        return toolbar(
            filler(),
            dimensionChooser({
                model: treeModel,
                field: 'groupBy',
                dimensions: ['fund', 'portfolio', 'trader', 'assetClass']
            })
        );
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

@HoistModel
class treeGridModel {
    @bindable groupBy = 'fund,assetClass';
}
export const sampleTreeGrid = elemFactory(SampleTreeGrid);

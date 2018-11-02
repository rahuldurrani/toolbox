/*
 * This file belongs to Hoist, an application development toolkit
 * developed by Extremely Heavy Industries (www.xh.io | info@xh.io)
 *
 * Copyright © 2018 Extremely Heavy Industries Inc.
 */
import {Component} from 'react';
import {elemFactory, HoistComponent} from '@xh/hoist/core/index';
import {panel} from '@xh/hoist/desktop/cmp/panel';
import {Icon} from '@xh/hoist/icon';
import {colChooserButton, grid} from '@xh/hoist/cmp/grid';
import {toolbar} from '@xh/hoist/desktop/cmp/toolbar';
import {storeCountLabel, storeFilterField} from '@xh/hoist/desktop/cmp/store';
import {filler} from '@xh/hoist/cmp/layout';

@HoistComponent
export class OrdersGrid extends Component {

    render() {
        return panel({
            flex: 1,
            title: 'Orders',
            icon: Icon.box(),
            item: grid({
                flex: 1,
                model: this.model.gridModel
            }),
            mask: this.model.loadModel,


            bbar: toolbar({
                omit: this.props.omitToolbar,
                items: [
                    colChooserButton({gridModel: this.model.gridModel}),
                    storeFilterField({gridModel: this.model.gridModel}),
                    filler(),
                    storeCountLabel({
                        gridModel: this.model.gridModel,
                        unit: 'orders'
                    })
                ]
            })

        });
    }
}
export const ordersGrid = elemFactory(OrdersGrid);
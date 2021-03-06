import React, {Component} from 'react';
import {HoistComponent, XH} from '@xh/hoist/core';
import {Icon} from '@xh/hoist/icon';
import {filler} from '@xh/hoist/cmp/layout';
import {panel} from '@xh/hoist/desktop/cmp/panel';
import {refreshButton} from '@xh/hoist/desktop/cmp/button';
import {toolbar} from '@xh/hoist/desktop/cmp/toolbar';
import {storeFilterField} from '@xh/hoist/desktop/cmp/store';
import {dataView, DataViewModel} from '@xh/hoist/desktop/cmp/dataview';
import {LocalStore} from '@xh/hoist/data';

import {wrapper} from '../../common/Wrapper';
import {dataViewItem} from './DataViewItem';
import './DataViewItem.scss';

@HoistComponent
export class DataViewPanel extends Component {

    model = new DataViewModel({
        store: new LocalStore({
            fields: ['id', 'name', 'city', 'value']
        }),
        itemRenderer: (v, {record}) => dataViewItem({record})
    });

    render() {
        const {model} = this;

        return wrapper({
            description: [
                <p>
                    The DataView component leverages an underlying Grid / GridModel instance to
                    display individual component "cards" for each rendered item.
                </p>
            ],
            item: panel({
                className: 'toolbox-dataview-panel',
                title: 'Grids > DataView',
                icon: Icon.addressCard(),
                width: 700,
                height: 400,
                item: dataView({
                    model,
                    rowCls: 'dataview-item',
                    itemHeight: 70
                }),
                bbar: toolbar(
                    refreshButton({onClick: this.loadData}),
                    filler(),
                    storeFilterField({store: model.store})
                )
            })
        });
    }

    componentDidMount() {
        this.loadData();
    }

    loadData = () => {
        const {store} = this.model,
            companies = XH.companyService.randomCompanies,
            min = -1000,
            max = 1000;

        store.loadData(companies.map(it => {
            const randVal = Math.random() * (max - min) + min;
            return {
                name: it.name,
                city: it.city,
                value: randVal
            };
        }));
    }
}
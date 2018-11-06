/*
 * This file belongs to Hoist, an application development toolkit
 * developed by Extremely Heavy Industries (www.xh.io | info@xh.io)
 *
 * Copyright © 2018 Extremely Heavy Industries Inc.
 */
import React, {Component} from 'react';
import {HoistComponent} from '@xh/hoist/core';
import {panel} from '@xh/hoist/desktop/cmp/panel';
import {Icon} from '@xh/hoist/icon';

import {wrapper} from '../../common';
import {sampleBigDataTreeGrid} from '../../common/SampleBigDataTreeGrid';

@HoistComponent
export class BigDataTreeGridPanel extends Component {

    render() {
        return wrapper({
            description: [
                <p>
                    Hoist's BIG DATA Grid supports the display of hierarchical tree data, leveraging the
                    underlying support for nested data rows provided by ag-Grid.
                </p>,
                <p>
                    Applications provide standard record data with <code>children</code> nodes containing
                    their sub-records. Data aggregations may be provided to the grid, or computed
                    within the grid via ag-Grid aggregation configs.
                </p>
            ],
            item: panel({
                title: 'Grids > Tree',
                icon: Icon.grid(),
                width: 700,
                height: 400,
                item: sampleBigDataTreeGrid()
            })
        });
    }
}
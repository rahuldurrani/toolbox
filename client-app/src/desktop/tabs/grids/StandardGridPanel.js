/*
 * This file belongs to Hoist, an application development toolkit
 * developed by Extremely Heavy Industries (www.xh.io | info@xh.io)
 *
 * Copyright © 2018 Extremely Heavy Industries Inc.
 */
import React, {Component} from 'react';
import {bindable} from '@xh/hoist/mobx';
import {dialog, dialogBody} from '@xh/hoist/kit/blueprint';
import {HoistComponent} from '@xh/hoist/core';
import {panel} from '@xh/hoist/desktop/cmp/panel';
import {toolbar} from '@xh/hoist/desktop/cmp/toolbar';
import {filler} from '@xh/hoist/cmp/layout';
import {Icon} from '@xh/hoist/icon';

import {dateInput} from '@xh/hoist/desktop/cmp/form';


import {wrapper, sampleGrid} from '../../common';

@HoistComponent
export class StandardGridPanel extends Component {

    @bindable date = new Date();

    render() {
        return wrapper({
            description: [
                <p>
                    Grids are at the heart of many Hoist React projects, and Grid, GridModel, and
                    related helper components are key elements of the framework.
                </p>,
                <p>
                    We rely on <a href="https://www.ag-grid.com/javascript-grid-reference-overview/" target="_blank">
                    ag-Grid</a> to provide the core component, with Hoist layering on a normalized API as well
                    as custom integrations for data stores, sorting, filtering, a custom column selection UI,
                    server-side exports, enhanced column definitions, and more.
                </p>
            ],
            items: [
                panel({
                    title: 'Grids > Standard',
                    icon: Icon.gridPanel(),
                    width: 900,
                    height: 400,
                    item: sampleGrid()
                }),
                dialog({
                    isOpen: true,
                    enforceFocus: false,
                    items: dialogBody(
                        dateInput({
                            commitOnChange: true,
                            model: this,
                            field: 'date'
                        })
                    )
                })
            ]
        });
    }

}
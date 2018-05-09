/*
 * This file belongs to Hoist, an application development toolkit
 * developed by Extremely Heavy Industries (www.xh.io | info@xh.io)
 *
 * Copyright © 2018 Extremely Heavy Industries Inc.
 */
import {Component} from 'react';
import {hoistComponent} from 'hoist/core';
import {vframe} from 'hoist/layout';
import {panel} from 'hoist/cmp';
import {restGrid, RestGridModel, RestStore} from 'hoist/rest';
import {boolCheckCol, baseCol} from 'hoist/columns/Core';
import {wrapperPanel} from '../impl/WrapperPanel';

@hoistComponent()
export class RestGridPanel extends Component {

    store = new RestStore({
        url: 'rest/companyRest',
        fields: [
            {
                name: 'name',
                required: true
            },
            {
                name: 'type',
                lookupName: 'types',
                lookupStrict: true,
                required: true
            },
            {
                name: 'employees',
                type: 'number',
                required: true
            },
            {
                name: 'isActive',
                type: 'bool',
                defaultValue: true
            },
            {
                name: 'cfg',
                label: 'JSON Config',
                type: 'json'
            },
            {
                name: 'note'
            },
            {
                name: 'lastUpdated',
                type: 'date',
                editable: false
            },
            {
                name: 'lastUpdatedBy',
                editable: false
            }
        ]
    });

    gridModel = new RestGridModel({
        store: this.store,
        unit: 'company',
        filterFields: ['name', 'type', 'note'],

        sortBy: 'name',
        columns: [
            baseCol({field: 'name'}),
            baseCol({field: 'type'}),
            baseCol({field: 'employees'}),
            boolCheckCol({field: 'isActive', fixedWidth: 100})
        ],
        editors: [
            {field: 'name'},
            {field: 'type'},
            {field: 'employees'},
            {field: 'cfg'},
            {field: 'note', type: 'textarea'},
            {field: 'isActive', type: 'boolCheck'},
            {field: 'lastUpdated'},
            {field: 'lastUpdatedBy'}
        ]
    });

    constructor() {
        super();
        this.store.loadAsync();
    }

    render() {
        return wrapperPanel(
            panel({
                cls: 'xh-toolbox-restgrid-panel',
                title: 'Rest Grid',
                width: 600,
                height: 400,
                item: this.renderExample()
            })
        );
    }

    renderExample() {
        const model = this.gridModel;
        return vframe({
            cls: 'xh-toolbox-example-container',
            item: restGrid({model})
        });
    }
}
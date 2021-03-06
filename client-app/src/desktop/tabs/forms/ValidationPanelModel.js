import {HoistModel} from '@xh/hoist/core';
import {dateIs, field, FieldSupport, lengthIs, numberIs, required} from '@xh/hoist/field';
import {wait} from '@xh/hoist/promise';
import {bindable} from '@xh/hoist/mobx';
import {SECONDS} from '@xh/hoist/utils/datetime';
import {isNil} from 'lodash';
import moment from 'moment';

@HoistModel
@FieldSupport
export class ValidationPanelModel {

    // TextField / TextArea
    @field(required, lengthIs({max: 20}))
    firstName;

    @field(required, lengthIs({max: 20}))
    lastName;

    @field(required,
        ({value}) => {
            if (isNil(value)) return;
            return wait(2 * SECONDS).then(() => {
                if ((!value.includes('@') || !value.includes('.'))) {
                    return 'Invalid email (validated async).';
                }
            });
        }
    )
    email;

    @field(required, lengthIs({max: 300, min: 10}))
    notes

    @field('Manager', required)
    isManager;

    @field(numberIs({min: 0, max: 99}))
    yearsExperience;

    @field('Hire Date', required, dateIs({max: 'today'}))
    startDate;

    @field(required, dateIs({min: 'today'}))
    endDate;

    @field(required)
    region;

    @field(required)
    tags;

    @bindable
    minimalValidation = false;

    @bindable
    commitOnChange = true;

    constructor() {
        this.initFields({
            startDate: moment().toDate()
        });

        this.getField('endDate').addRules({
            when: ({value}, {startDate}) => startDate && value,
            check: ({value, displayName}, {startDate}) => value < startDate ? `${displayName} must be after start date.` : null
        });

        this.getField('yearsExperience').addRules({
            when: (f, {isManager}) => isManager,
            check: [
                required,
                ({value}) => isNil(value) || value < 10 ?  'Managerial positions require at least 10 years of experience.' : null
            ]
        });
    }
}

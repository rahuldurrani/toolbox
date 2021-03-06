import {HoistModel} from '@xh/hoist/core';
import {FieldSupport, field, required, lengthIs} from '@xh/hoist/field';
import {movies} from '../../core/data';

@HoistModel
@FieldSupport
export class FormPageModel {

    @field(required, lengthIs({min: 8}))
    name = null;

    @field(required)
    movie = null;

    @field()
    salary = null;

    @field()
    included;

    @field()
    enabled;

    @field()
    buttonGroup;

    @field()
    notes = null;

    @field('Search')
    searchQuery = null;

    movies = movies;

    constructor() {
        this.initFields({buttonGroup: 'button1'});
    }
}
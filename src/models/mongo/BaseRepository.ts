import * as Mongoose from "mongoose";
import { PagedResult } from "../../types";
import { isNumber } from "lodash";
import { Provide } from "../../context/IocProvider";

@Provide(BaseRepository)
export abstract class BaseRepository<T extends Mongoose.Document> {

    protected model: Mongoose.Model<T>;

    protected registerModel(model: Mongoose.Model<T>) {
        this.model = model;
    }

    /**
     *
     */
    public insert(document: Mongoose.DocumentDefinition<T>): Promise<T> {
        return this.model.create(document);
    }

    /**
     * Find a page of documents by conditions.
     *
     * @param {Object} [conditions] A set of conditions
     * @param {Object | String} [sortBy] If an object is passed, values allowed are asc, desc, ascending, descending, 1, and -1.
     * If a string is passed, it must be a space delimited list of path names. The
     * sort order of each path is ascending unless the path name is prefixed with -
     * which will be treated as descending.
     * @param {Number} [page=1] The page number
     * @param {Number} [pageSize=10] The number of elements per page
     * @returns {Promise<Array<T>>}
     *
     * @memberOf BaseRepository
     */
    public findPage(conditions?: Mongoose.FilterQuery<T>, sortBy?: Object | string, page?: number, pageSize?: number): Promise<PagedResult<T>> {
        let query = this.model.find(conditions || {});

        if (sortBy)
            query = query.sort(sortBy);

        if (isNumber(page) && page > 0 && isNumber(pageSize) && pageSize > 0)
            query = query.skip((page - 1) * pageSize).limit(pageSize);

        return Mongoose.Promise
            .all([
                query.exec(),
                this.model.countDocuments(conditions).exec()
            ])
            .then(([items, totalCount]: [T[], number]) => {
                return { items, totalCount };
            });
    }

}

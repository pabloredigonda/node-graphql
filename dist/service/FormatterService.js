"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
require("reflect-metadata");
let FormatterService = class FormatterService {
    constructor() {
        this.resultsPerPage = 10;
        this.result = {
            prevPage: 0,
            nextPage: 0,
            totalPages: 0,
            movies: []
        };
    }
    /**
     *
     * @param response
     * @param page
     */
    format(response, page) {
        if (response.result.Response === "False") {
            //error?
            return this.result;
        }
        const rows = response.result.Search.length;
        const totalResults = parseInt(response.result.totalResults);
        let result = this.formatPagination(page, totalResults);
        for (var i = 0, len = rows; i < len; i++) {
            result.movies.push(this.formatMovie(response.result.Search[i]));
        }
        return result;
    }
    /**
     *
     * @param page number
     * @param totalResults number
     */
    formatPagination(page, totalResults) {
        const totalPages = Math.ceil(totalResults / this.resultsPerPage);
        return {
            prevPage: page > 1 ? page - 1 : page,
            nextPage: page < totalPages ? page + 1 : page,
            totalPages: totalPages,
            movies: []
        };
    }
    /**
     *
     * @param result
     */
    formatMovie(result) {
        return {
            id: result.imdbID,
            title: result.Title,
            year: result.Year,
            type: result.Type,
            poster: result.Poster
        };
    }
};
FormatterService = __decorate([
    inversify_1.injectable()
], FormatterService);
exports.default = FormatterService;
//# sourceMappingURL=FormatterService.js.map
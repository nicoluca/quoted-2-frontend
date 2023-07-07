import { Source } from "./source";

export class Quote {
    constructor(
        public id: number,
        public text: string,
        public source: Source
    ) {}
}

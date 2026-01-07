import { Expose } from "class-transformer";

export class SearchBookResponseDto {
    @Expose()
    ids: string[];
}
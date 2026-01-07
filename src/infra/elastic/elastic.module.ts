import { Module } from "@nestjs/common";
import { ElasticsearchModule } from "@nestjs/elasticsearch"
import { env } from "src/config/env";

@Module({
    imports: [
        ElasticsearchModule.register({
            node: env.ELASTICSEARCH_NODE
        })
    ],
    exports: [ElasticsearchModule]
})

export class ElasticModule {

}
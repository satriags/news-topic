import http from 'http'
import express, {Express} from 'express'
import * as articelController from './controllers/articel-controller'
import * as topicController from './controllers/topic-controller'
import * as newsController from './controllers/news-controller'

const router: Express = express();
router.use(express.json());
router.use('',
    articelController.default,
    topicController.default,
    newsController.default,
)

const httpServer = http.createServer(router)

httpServer.listen(6060, ()=>{
    console.log(`Server is running at port 6060`);
})
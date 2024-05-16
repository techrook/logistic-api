import {Sequelize} from "sequelize"
import {CONFIG} from './index.config'

const DB = new Sequelize(CONFIG.database, CONFIG.user, CONFIG.password, {
    host: CONFIG.host,
    dialect: "postgres",
    port:  5432
    ,
    logging: false
  });


export default DB;